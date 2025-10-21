"use client";

import { CreateProjectDialog } from "@/components/create-project-dialog";
import { Rocket } from "lucide-react";

export function NoProjectsState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/50">
        <Rocket className="h-10 w-10 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-3">
        Welcome to Kyndly!
      </h2>
      <p className="text-slate-400 mb-8 max-w-md">
        Get started by creating your first project. You&apos;ll be able to add apps, 
        collect testimonials, and manage reviews all in one place.
      </p>
      <CreateProjectDialog />
    </div>
  );
}

