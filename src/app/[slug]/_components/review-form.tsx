"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Star, CheckCircle2, Loader2 } from "lucide-react";

interface ReviewFormProps {
  appId: string;
  formConfig: any;
}

export function ReviewForm({ appId, formConfig }: ReviewFormProps) {
  const [authorName, setAuthorName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitReview = api.review.submitPublic.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authorName.trim() || !text.trim() || rating === 0) {
      return;
    }

    submitReview.mutate({
      appId,
      authorName: authorName.trim(),
      rating,
      text: text.trim(),
    });
  };

  // Success state
  if (submitted) {
    return (
      <Card className="border-green-500/20 bg-black/40 p-8 backdrop-blur-sm">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-white">
            Thank You for Your Review!
          </h2>
          <p className="mb-6 text-gray-400">
            Your feedback has been submitted and is pending approval. We
            appreciate you taking the time to share your experience.
          </p>
          <Button
            onClick={() => {
              setSubmitted(false);
              setAuthorName("");
              setRating(0);
              setText("");
            }}
            variant="outline"
            className="border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            Submit Another Review
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-white/10 bg-black/40 p-8 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div>
          <Label htmlFor="name" className="text-white">
            Your Name <span className="text-red-400">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="John Doe"
            maxLength={100}
            required
            className="mt-2 border-white/10 bg-white/5 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Rating */}
        <div>
          <Label className="text-white">
            Rating <span className="text-red-400">*</span>
          </Label>
          <div className="mt-2 flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  className={`h-10 w-10 transition-colors ${
                    star <= (hoveredRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-transparent text-gray-600"
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="ml-2 text-sm text-gray-400">
                {rating} {rating === 1 ? "star" : "stars"}
              </span>
            )}
          </div>
        </div>

        {/* Review Text */}
        <div>
          <Label htmlFor="review" className="text-white">
            Your Review <span className="text-red-400">*</span>
          </Label>
          <textarea
            id="review"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tell us about your experience..."
            maxLength={1000}
            required
            rows={6}
            className="mt-2 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="mt-1 text-right text-xs text-gray-500">
            {text.length}/1000
          </div>
        </div>

        {/* Error Message */}
        {submitReview.error && (
          <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            {submitReview.error.message}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={
            submitReview.isPending ||
            !authorName.trim() ||
            !text.trim() ||
            rating === 0
          }
          className="w-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitReview.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Review"
          )}
        </Button>

        <p className="text-center text-xs text-gray-500">
          Your review will be published after approval by the team.
        </p>
      </form>
    </Card>
  );
}

