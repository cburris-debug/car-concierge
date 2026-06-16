import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendToVoiceflow, launchVoiceflow } from "@/lib/voiceflow";

export async function POST(request: Request) {
  // Auth check
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { action, message } = body as { action: string; message?: string };

  try {
    let traces;
    if (action === "launch") {
      traces = await launchVoiceflow(user.id);
    } else if (action === "message" && message) {
      traces = await sendToVoiceflow(user.id, message);
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ traces });
  } catch (err) {
    console.error("Chat route error:", err);
    return NextResponse.json(
      { error: "Failed to reach assistant. Please try again." },
      { status: 500 }
    );
  }
}
