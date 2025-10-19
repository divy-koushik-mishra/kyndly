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
import { Plus, Loader2, Star, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateReviewDialogProps {
  projectId: string;
  children?: React.ReactNode;
}

export function CreateReviewDialog({ projectId, children }: CreateReviewDialogProps) {
  const [open, setOpen] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const router = useRouter();

  const createReview = api.review.create.useMutation({
    onSuccess: () => {
      setOpen(false);
      setAuthorName("");
      setRating(5);
      setText("");
      router.refresh();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !text.trim()) return;

    createReview.mutate({
      projectId,
      authorName: authorName.trim(),
      rating,
      text: text.trim(),
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
            Add Review
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] bg-slate-900 border-slate-700 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <DialogTitle className="text-2xl text-center text-white">
              Add New Review
            </DialogTitle>
            <DialogDescription className="text-center text-slate-400">
              Create a testimonial to showcase on your platform
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-6">
            {/* Author Name */}
            <div className="space-y-2">
              <Label htmlFor="authorName" className="text-slate-300">
                Author Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="authorName"
                placeholder="John Doe"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-purple-500"
                disabled={createReview.isPending}
                maxLength={100}
                required
                autoFocus
              />
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label className="text-slate-300">
                Rating <span className="text-red-400">*</span>
              </Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    disabled={createReview.isPending}
                    className="transition-transform hover:scale-110 disabled:opacity-50"
                  >
                    <Star
                      className={cn(
                        "h-8 w-8 transition-colors",
                        (hoveredRating || rating) >= star
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-600"
                      )}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-slate-400">
                  {rating} {rating === 1 ? "star" : "stars"}
                </span>
              </div>
            </div>

            {/* Review Text */}
            <div className="space-y-2">
              <Label htmlFor="reviewText" className="text-slate-300">
                Review <span className="text-red-400">*</span>
              </Label>
              <textarea
                id="reviewText"
                placeholder="Share your experience..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full min-h-[120px] px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                disabled={createReview.isPending}
                maxLength={1000}
                required
              />
              <p className="text-xs text-slate-500">
                {text.length}/1000 characters
              </p>
            </div>

            {createReview.error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-red-400">
                  {createReview.error.message}
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createReview.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!authorName.trim() || !text.trim() || createReview.isPending}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              {createReview.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Review
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

