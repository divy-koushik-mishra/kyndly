"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserNav } from "./user-nav";

export function Navbar() {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center px-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-semibold">Kyndly</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <UserNav />
        </div>
      </div>
    </header>
  );
}

