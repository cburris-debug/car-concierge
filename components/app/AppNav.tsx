"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface AppNavProps {
  userEmail: string;
}

export default function AppNav({ userEmail }: AppNavProps) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/carsoup-logo.png"
            alt="CarSoup logo"
            width={120}
            height={36}
            className="h-8 w-auto"
            priority
          />
          <span className="text-sm text-gray-400 font-medium hidden sm:inline border-l border-gray-200 pl-3">
            Car Concierge
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:inline">{userEmail}</span>
          <button
            onClick={handleSignOut}
            className="text-sm font-medium text-gray-600 hover:text-brand-navy transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
