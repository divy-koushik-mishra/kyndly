"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserNav } from "./user-nav";
import { ProjectSelector } from "./project-selector";

interface NavbarProps {
  projects?: Array<{ id: string; projectName: string }>;
  selectedProjectId?: string;
}

export function Navbar({ projects, selectedProjectId }: NavbarProps) {
  const { data: session } = useSession();

  if (!session?.user) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/90 backdrop-blur-xl">
      <div className="flex h-16 items-center px-4 gap-2 md:gap-4">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Kyndly
          </span>
        </Link>
        <div className="hidden sm:flex items-center gap-4 ml-4">
          <ProjectSelector 
            initialProjects={projects} 
            initialSelectedId={selectedProjectId}
          />
        </div>
        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <UserNav />
        </div>
      </div>
    </header>
  );
}

