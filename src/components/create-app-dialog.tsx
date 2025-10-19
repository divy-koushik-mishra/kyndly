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
import { Plus, Loader2, Globe, Smartphone, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateAppDialogProps {
  projectId: string;
  children?: React.ReactNode;
}

export function CreateAppDialog({ projectId, children }: CreateAppDialogProps) {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<"web" | "mobile">("web");
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const createApp = api.app.create.useMutation({
    onSuccess: () => {
      setOpen(false);
      setName("");
      setDomain("");
      setDescription("");
      setPlatform("web");
      router.refresh();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !domain.trim()) return;

    createApp.mutate({
      projectId,
      name: name.trim(),
      platform,
      domain: domain.trim(),
      description: description.trim() || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New App
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] bg-slate-900 border-slate-700 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-2xl text-center text-white">
              Add New App
            </DialogTitle>
            <DialogDescription className="text-center text-slate-400">
              Configure a new app to start collecting testimonials
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-6">
            {/* Platform Selection */}
            <div className="space-y-2">
              <Label className="text-slate-300">
                Platform <span className="text-red-400">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPlatform("web")}
                  disabled={createApp.isPending}
                  className={cn(
                    "relative p-4 rounded-lg border-2 transition-all duration-200",
                    platform === "web"
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                  )}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Globe className={cn(
                      "h-8 w-8",
                      platform === "web" ? "text-purple-400" : "text-slate-400"
                    )} />
                    <span className={cn(
                      "font-medium",
                      platform === "web" ? "text-white" : "text-slate-400"
                    )}>
                      Web App
                    </span>
                  </div>
                  {platform === "web" && (
                    <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-purple-400" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setPlatform("mobile")}
                  disabled={createApp.isPending}
                  className={cn(
                    "relative p-4 rounded-lg border-2 transition-all duration-200",
                    platform === "mobile"
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                  )}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Smartphone className={cn(
                      "h-8 w-8",
                      platform === "mobile" ? "text-purple-400" : "text-slate-400"
                    )} />
                    <span className={cn(
                      "font-medium",
                      platform === "mobile" ? "text-white" : "text-slate-400"
                    )}>
                      Mobile App
                    </span>
                  </div>
                  {platform === "mobile" && (
                    <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-purple-400" />
                  )}
                </button>
              </div>
            </div>

            {/* App Name */}
            <div className="space-y-2">
              <Label htmlFor="appName" className="text-slate-300">
                App Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="appName"
                placeholder="My Awesome App"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
                disabled={createApp.isPending}
                maxLength={100}
                required
              />
            </div>

            {/* Domain */}
            <div className="space-y-2">
              <Label htmlFor="domain" className="text-slate-300">
                Domain / URL <span className="text-red-400">*</span>
              </Label>
              <Input
                id="domain"
                type="text"
                placeholder={platform === "web" ? "example.com" : "app.example.com"}
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
                disabled={createApp.isPending}
                required
              />
              <p className="text-xs text-slate-500">
                {platform === "web" 
                  ? "Your website domain (without https://)"
                  : "Your app's URL or identifier"}
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="appDescription" className="text-slate-300">
                Description (Optional)
              </Label>
              <textarea
                id="appDescription"
                placeholder="Brief description of your app..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full min-h-[80px] px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                disabled={createApp.isPending}
                maxLength={500}
              />
            </div>

            {createApp.error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">
                  {createApp.error.message}
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createApp.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || !domain.trim() || createApp.isPending}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              {createApp.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create App
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

