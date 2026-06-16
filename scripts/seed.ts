/**
 * Seed script: creates a demo user with an active Advisor engagement
 * so the upgrade flow can be demonstrated immediately.
 *
 * Usage: npm run seed
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "fs";

// Load .env.local manually
const envPath = ".env.local";
try {
  const env = dotenv.readFileSync(envPath, "utf8");
  for (const line of env.split("\n")) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      process.env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, "");
    }
  }
} catch {
  console.log("No .env.local found, using existing env vars");
}

const DEMO_EMAIL = "demo@carsoup.com";
const DEMO_PASSWORD = "demo1234!";

async function seed() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
    process.exit(1);
  }

  const db = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  console.log("Creating demo user:", DEMO_EMAIL);

  // Create or get existing user
  const { data: existingUsers } = await db.auth.admin.listUsers();
  let userId: string | undefined = existingUsers?.users.find(
    (u) => u.email === DEMO_EMAIL
  )?.id;

  if (!userId) {
    const { data: created, error } = await db.auth.admin.createUser({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      email_confirm: true,
    });

    if (error || !created.user) {
      console.error("Failed to create user:", error?.message);
      process.exit(1);
    }
    userId = created.user.id;
    console.log("Created user:", userId);
  } else {
    console.log("User already exists:", userId);
  }

  // Delete any existing engagements for this user (clean slate for demo)
  await db.from("engagements").delete().eq("user_id", userId);

  // Insert active Advisor engagement (60 days from now)
  const now = new Date();
  const expiresAt = new Date(now);
  expiresAt.setDate(expiresAt.getDate() + 60);

  const { data: eng, error: engError } = await db
    .from("engagements")
    .insert({
      user_id: userId,
      tier: "advisor",
      stripe_payment_id: null,
      purchased_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
      vehicle_note: "Demo: 2022 Honda CR-V",
    })
    .select()
    .single();

  if (engError) {
    console.error("Failed to create engagement:", engError.message);
    process.exit(1);
  }

  console.log("\n✓ Seed complete\n");
  console.log("Demo credentials:");
  console.log("  Email:    ", DEMO_EMAIL);
  console.log("  Password: ", DEMO_PASSWORD);
  console.log("  Engagement ID:", eng.id);
  console.log("  Tier:     advisor");
  console.log("  Expires:  ", expiresAt.toISOString());
  console.log("\nUse these to log in and demonstrate the upgrade flow.");
}

seed();
