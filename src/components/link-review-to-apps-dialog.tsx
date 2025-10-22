"use client";

import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { Loader2, Link as LinkIcon, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkReviewToAppsDialogProps {
  review: {
    id: string;
    authorName: string;
  };
  projectId: string;
  children?: React.ReactNode;
}

export function LinkReviewToAppsDialog({
  review,
  projectId,
  children,
}: LinkReviewToAppsDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>([]);
  const router = useRouter();

  // Fetch apps for this project
  const { data: apps = [] } = api.user.getProjectApps.useQuery({
    projectId,
  });

  // Fetch currently linked apps
  const { data: linkedApps = [] } = api.review.getLinkedApps.useQuery(
    { reviewId: review.id },
    { enabled: open }
  );

  // Set initial selected apps when dialog opens
  useEffect(() => {
    if (open && linkedApps) {
      setSelectedAppIds(linkedApps.map((app) => app.id));
    }
    if (!open) {
      setSelectedAppIds([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const linkToApps = api.review.linkToApps.useMutation({
    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    linkToApps.mutate({
      reviewId: review.id,
      appIds: selectedAppIds,
    });
  };

  const toggleApp = (appId: string) => {
    setSelectedAppIds((prev) =>
      prev.includes(appId)
        ? prev.filter((id) => id !== appId)
        : [...prev, appId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="outline" size="sm">
            <LinkIcon className="mr-1 h-3 w-3" />
            Link Apps
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-slate-700 bg-slate-900 sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
              <LinkIcon className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-center text-2xl text-white">
              Link Review to Apps
            </DialogTitle>
            <DialogDescription className="text-center text-slate-400">
              Select which apps this review should appear in
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-6">
            {/* Review Info */}
            <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
              <p className="text-sm text-slate-400">Review by</p>
              <p className="font-medium text-white">{review.authorName}</p>
            </div>

            {/* Apps Selection */}
            <div className="space-y-2">
              <Label className="text-slate-300">
                Select Apps (optional - leave empty for project-wide)
              </Label>
              
              {apps.length === 0 ? (
                <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-8 text-center">
                  <p className="text-sm text-slate-400">
                    No apps available. Create an app first.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {apps.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => toggleApp(app.id)}
                      className={cn(
                        "relative w-full rounded-lg border-2 p-4 text-left transition-all duration-200",
                        selectedAppIds.includes(app.id)
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">{app.name}</p>
                          <p className="text-xs text-slate-400">{app.domain}</p>
                        </div>
                        {selectedAppIds.includes(app.id) && (
                          <CheckCircle2 className="h-5 w-5 text-blue-400" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-3">
              <p className="text-xs text-blue-300">
                {selectedAppIds.length === 0
                  ? "This review will be available project-wide (not linked to specific apps)."
                  : `This review will appear in ${selectedAppIds.length} app${selectedAppIds.length > 1 ? "s" : ""}.`}
              </p>
            </div>

            {linkToApps.error && (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                <p className="text-sm text-red-400">
                  {linkToApps.error.message}
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={linkToApps.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={linkToApps.isPending}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600"
            >
              {linkToApps.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Save Links
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

