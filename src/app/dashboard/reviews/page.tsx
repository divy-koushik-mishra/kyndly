import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { DashboardLayout } from "@/components/dashboard-layout";
import { api } from "@/trpc/server";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { CreateReviewDialog } from "@/components/create-review-dialog";
import { EditReviewDialog } from "@/components/edit-review-dialog";
import { DeleteReviewDialog } from "@/components/delete-review-dialog";
import { TogglePublishedSwitch } from "@/components/toggle-published-switch";
import { LinkReviewToAppsDialog } from "@/components/link-review-to-apps-dialog";

export default async function ReviewsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-up");
  }

  // Fetch projects server-side
  const projects = await api.user.getUserProject();
  const { getSelectedProjectId } = await import("@/lib/selected-project");
  const selectedProjectId = await getSelectedProjectId(projects);

  // If no projects exist, redirect to dashboard
  if (projects.length === 0) {
    redirect("/dashboard");
  }

  // Fetch reviews for selected project
  let reviews: Array<{
    id: string;
    authorName: string;
    rating: number;
    text: string;
    avatarUrl: string;
    isPublished: boolean;
    createdAt: Date;
  }> = [];

  if (selectedProjectId) {
    reviews = await api.review.getByProject({ projectId: selectedProjectId });
  }

  // Calculate stats
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : "0.0";
  const fiveStarCount = reviews.filter(r => r.rating === 5).length;
  const publishedCount = reviews.filter(r => r.isPublished).length;

  // Helper function to format date
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const stats = [
    { label: "Total Reviews", value: totalReviews.toString(), color: "from-purple-500 to-pink-500" },
    { label: "Avg Rating", value: avgRating, color: "from-amber-500 to-orange-500" },
    { label: "5 Stars", value: fiveStarCount.toString(), color: "from-emerald-500 to-teal-500" },
    { label: "Published", value: publishedCount.toString(), color: "from-blue-500 to-cyan-500" },
  ];

  return (
    <>
      <Navbar projects={projects} selectedProjectId={selectedProjectId} />
      <DashboardLayout>
        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Reviews</h1>
              <p className="text-sm md:text-base text-slate-400">
                Manage and moderate customer testimonials
              </p>
            </div>
            {selectedProjectId && (
              <CreateReviewDialog projectId={selectedProjectId} />
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white font-bold text-lg`}>
                    {stat.value}
                  </div>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {reviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                <Star className="h-10 w-10 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No reviews yet</h3>
              <p className="text-slate-400 mb-6">Start collecting testimonials from your customers</p>
              {selectedProjectId && (
                <CreateReviewDialog projectId={selectedProjectId} />
              )}
            </div>
          ) : (
            <>
              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card
                    key={review.id}
                    className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6 hover:border-slate-600/50 transition-all duration-200"
                  >
                    <div className="flex gap-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={review.avatarUrl}
                          alt={review.authorName}
                          className="w-12 h-12 rounded-full"
                        />
                      </div>

                      <div className="flex-1 space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-white">{review.authorName}</h3>
                            <p className="text-sm text-slate-400">{getTimeAgo(review.createdAt)}</p>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-600"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-slate-400">
                            {review.rating}.0
                          </span>
                        </div>

                        {/* Review Text */}
                        <p className="text-slate-300 leading-relaxed">
                          {review.text}
                        </p>

                        {/* Footer */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800">
                          <TogglePublishedSwitch 
                            reviewId={review.id}
                            isPublished={review.isPublished}
                          />
                          <div className="flex items-center gap-2">
                            {selectedProjectId && (
                              <LinkReviewToAppsDialog
                                review={{
                                  id: review.id,
                                  authorName: review.authorName,
                                }}
                                projectId={selectedProjectId}
                              />
                            )}
                            <EditReviewDialog
                              review={{
                                id: review.id,
                                authorName: review.authorName,
                                rating: review.rating,
                                text: review.text,
                              }}
                            />
                            <DeleteReviewDialog
                              reviewId={review.id}
                              authorName={review.authorName}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}

