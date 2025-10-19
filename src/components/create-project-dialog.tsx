"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Loader2, Rocket } from "lucide-react";

interface CreateProjectDialogProps {
  children?: React.ReactNode;
}

export function CreateProjectDialog({ children }: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const router = useRouter();

  const createProject = api.project.create.useMutation({
    onSuccess: () => {
      setOpen(false);
      setProjectName("");
      router.refresh();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    createProject.mutate({
      projectName: projectName.trim(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button
            variant="outline"
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-slate-900 border-slate-700">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-2xl text-center text-white">
              Create New Project
            </DialogTitle>
            <DialogDescription className="text-center text-slate-400">
              Start a new project to manage your apps and collect testimonials
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-6">
            <div className="space-y-2">
              <Label htmlFor="projectName" className="text-slate-300">
                Project Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="projectName"
                placeholder="My Awesome Project"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
                disabled={createProject.isPending}
                maxLength={100}
                required
                autoFocus
              />
              <p className="text-xs text-slate-500">
                Choose a descriptive name for your project
              </p>
            </div>

            {createProject.error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">
                  {createProject.error.message}
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createProject.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!projectName.trim() || createProject.isPending}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              {createProject.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Rocket className="mr-2 h-4 w-4" />
                  Create Project
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

