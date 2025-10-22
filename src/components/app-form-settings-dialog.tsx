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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, FormInput, Copy, CheckCircle2, ExternalLink } from "lucide-react";

interface AppFormSettingsDialogProps {
  app: {
    id: string;
    name: string;
    slug: string | null;
    isFormPublic: boolean;
  };
  children?: React.ReactNode;
}

export function AppFormSettingsDialog({
  app,
  children,
}: AppFormSettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [isFormPublic, setIsFormPublic] = useState(app.isFormPublic);
  const [slug, setSlug] = useState(app.slug ?? "");
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // Reset form when dialog opens or app changes
  useEffect(() => {
    if (open) {
      setIsFormPublic(app.isFormPublic);
      setSlug(app.slug ?? "");
    }
  }, [open, app]);

  const updateFormConfig = api.app.updateFormConfig.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const updateSlug = api.app.updateSlug.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleSave = () => {
    // Update form public status
    if (isFormPublic !== app.isFormPublic) {
      updateFormConfig.mutate({
        appId: app.id,
        isFormPublic,
      });
    }

    // Update slug if changed
    if (slug.trim() && slug !== app.slug) {
      updateSlug.mutate({
        appId: app.id,
        slug: slug.trim(),
      });
    }

    if (isFormPublic === app.isFormPublic && slug === app.slug) {
      setOpen(false);
    }
  };

  const formUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/${app.slug || slug || "app-slug"}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isPending = updateFormConfig.isPending || updateSlug.isPending;
  const error = updateFormConfig.error || updateSlug.error;

  // Auto-close on success
  useEffect(() => {
    if (
      !isPending &&
      !error &&
      (updateFormConfig.isSuccess || updateSlug.isSuccess)
    ) {
      const timer = setTimeout(() => setOpen(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isPending, error, updateFormConfig.isSuccess, updateSlug.isSuccess]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="outline" size="sm" className="flex-1">
            <FormInput className="mr-1 h-3 w-3" />
            Review Form
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-slate-700 bg-slate-900 sm:max-w-[550px]">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500">
            <FormInput className="h-6 w-6 text-white" />
          </div>
          <DialogTitle className="text-center text-2xl text-white">
            Review Form Settings
          </DialogTitle>
          <DialogDescription className="text-center text-slate-400">
            Configure your public review collection form
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-6">
          {/* Form URL Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug" className="text-slate-300">
              Form URL Slug <span className="text-red-400">*</span>
            </Label>
            <Input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="my-awesome-app"
              className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500 focus:border-green-500"
              disabled={isPending}
              maxLength={100}
            />
            <p className="text-xs text-slate-500">
              URL-friendly identifier for your review form
            </p>
          </div>

          {/* Public Form URL Display */}
          {(app.slug || slug) && (
            <div className="space-y-2">
              <Label className="text-slate-300">Public Form URL</Label>
              <div className="flex gap-2">
                <Input
                  value={formUrl}
                  readOnly
                  className="border-slate-700 bg-slate-800/50 text-slate-300"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="shrink-0"
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                {app.slug && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(formUrl, "_blank")}
                    className="shrink-0"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {copied && (
                <p className="text-xs text-green-400">Copied to clipboard!</p>
              )}
            </div>
          )}

          {/* Form Public Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <div className="space-y-0.5">
              <Label htmlFor="public-toggle" className="text-slate-300">
                Accept Public Reviews
              </Label>
              <p className="text-sm text-slate-500">
                Allow customers to submit reviews through the public form
              </p>
            </div>
            <Switch
              id="public-toggle"
              checked={isFormPublic}
              onCheckedChange={setIsFormPublic}
              disabled={isPending}
            />
          </div>

          {/* Info Box */}
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/10 p-4">
            <p className="text-sm text-blue-300">
              <strong>Note:</strong> Reviews submitted through the public form
              will require approval before being published.
            </p>
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3">
              <p className="text-sm text-red-400">{error.message}</p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isPending || !slug.trim()}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Save Settings
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

