"use client";

import { Switch } from "@/components/ui/switch";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

interface TogglePublishedSwitchProps {
  reviewId: string;
  isPublished: boolean;
}

export function TogglePublishedSwitch({ reviewId, isPublished }: TogglePublishedSwitchProps) {
  const router = useRouter();
  const togglePublished = api.review.togglePublished.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.error("Failed to update review:", error);
      router.refresh();
    },
  });

  const handleToggle = (checked: boolean) => {
    togglePublished.mutate({
      reviewId,
      isPublished: checked,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isPublished}
        onCheckedChange={handleToggle}
        disabled={togglePublished.isPending}
      />
      <span className="text-sm text-slate-400">
        {isPublished ? "Published" : "Unpublished"}
      </span>
    </div>
  );
}

