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
import { Loader2, Trash2, AlertTriangle } from "lucide-react";

interface DeleteReviewDialogProps {
  reviewId: string;
  authorName: string;
  children?: React.ReactNode;
}

export function DeleteReviewDialog({ reviewId, authorName, children }: DeleteReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const deleteReview = api.review.delete.useMutation({
    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });

  const handleDelete = () => {
    deleteReview.mutate({ reviewId });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="outline" size="sm">
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] bg-slate-900 border-slate-700">
        <DialogHeader>
          <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <DialogTitle className="text-2xl text-center text-white">
            Delete Review
          </DialogTitle>
          <DialogDescription className="text-center text-slate-400">
            Are you sure you want to delete this review from{" "}
            <span className="font-semibold text-white">{authorName}</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {deleteReview.error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-sm text-red-400">
              {deleteReview.error.message}
            </p>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleteReview.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteReview.isPending}
          >
            {deleteReview.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Review
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

