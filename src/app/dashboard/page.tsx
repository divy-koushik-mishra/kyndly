import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { DashboardLayout } from "@/components/dashboard-layout";
import { StatsCard } from "./_components/stats-card";
import { ChartCard } from "./_components/chart-card";
import { SimpleBarChart } from "./_components/simple-bar-chart";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Star, MessageSquare } from "lucide-react";
import { api } from "@/trpc/server";
import { NoProjectsState } from "./_components/no-projects-state";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-up");
  }

  // Fetch projects server-side
  const projects = await api.user.getUserProject();
  
  // Get selected project from cookie or use first project
  const { getSelectedProjectId } = await import("@/lib/selected-project");
  const selectedProjectId = await getSelectedProjectId(projects);

  // Show no projects state if user has no projects
  if (projects.length === 0) {
    return (
      <>
        <Navbar projects={projects} selectedProjectId={selectedProjectId} />
        <DashboardLayout>
          <NoProjectsState />
        </DashboardLayout>
      </>
    );
  }

  // Fetch real reviews data
  let reviews: Array<{
    id: string;
    authorName: string;
    rating: number;
    text: string;
    avatarUrl: string;
    createdAt: Date;
  }> = [];

  if (selectedProjectId) {
    reviews = await api.review.getByProject({ projectId: selectedProjectId });
  }

  // Calculate real statistics
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : "0.0";
  const fiveStarCount = reviews.filter(r => r.rating === 5).length;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    label: `${rating} Star${rating !== 1 ? 's' : ''}`,
    value: reviews.filter(r => r.rating === rating).length,
    color: rating === 5 ? "linear-gradient(to right, #f59e0b, #f97316)" :
           rating === 4 ? "linear-gradient(to right, #10b981, #14b8a6)" :
           rating === 3 ? "linear-gradient(to right, #3b82f6, #06b6d4)" :
           rating === 2 ? "linear-gradient(to right, #a855f7, #ec4899)" :
           "linear-gradient(to right, #64748b, #475569)"
  }));

  // Get recent reviews (last 3)
  const recentReviews = reviews.slice(0, 3);

  // Helper function for time ago
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  // Stats data
  const stats = [
    {
      title: "Total Reviews",
      value: totalReviews.toString(),
      change: totalReviews > 0 ? `${fiveStarCount} five-star` : "No reviews yet",
      changeType: "positive" as const,
      icon: <MessageSquare className="h-5 w-5 text-white" />,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Average Rating",
      value: avgRating,
      change: totalReviews > 0 ? "Out of 5.0" : "Add reviews",
      changeType: "positive" as const,
      icon: <Star className="h-5 w-5 text-white" />,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Projects",
      value: projects.length.toString(),
      change: "Active projects",
      changeType: "positive" as const,
      icon: <TrendingUp className="h-5 w-5 text-white" />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "5-Star Reviews",
      value: fiveStarCount.toString(),
      change: totalReviews > 0 ? `${((fiveStarCount / totalReviews) * 100).toFixed(0)}% of total` : "No reviews",
      changeType: "positive" as const,
      icon: <span className="text-xl">⭐</span>,
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <>
      <Navbar projects={projects} selectedProjectId={selectedProjectId} />
      <DashboardLayout>
        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Overview
              </h1>
              <p className="text-sm md:text-base text-slate-400">
                Welcome back, {session.user.name}! Here&apos;s your project summary.
              </p>
            </div>
            <Link href="/dashboard/reviews">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Review
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Charts Row */}
          {totalReviews > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChartCard
                title="Reviews Distribution"
                subtitle="Breakdown by star rating"
              >
                <SimpleBarChart data={ratingDistribution} />
              </ChartCard>

              <ChartCard
                title="Rating Breakdown"
                subtitle="Distribution across all reviews"
              >
                <div className="space-y-3">
                  {ratingDistribution.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <span className="text-sm text-slate-400 w-16">{item.label}</span>
                      <div className="flex-1 h-8 bg-slate-800 rounded-lg overflow-hidden">
                        <div
                          className="h-full flex items-center justify-end px-2 text-xs font-semibold text-white"
                          style={{
                            background: item.color,
                            width: totalReviews > 0 ? `${(item.value / totalReviews) * 100}%` : '0%',
                            minWidth: item.value > 0 ? '30px' : '0px'
                          }}
                        >
                          {item.value > 0 && item.value}
                        </div>
                      </div>
                      <span className="text-sm text-slate-400 w-12 text-right">
                        {totalReviews > 0 ? `${((item.value / totalReviews) * 100).toFixed(0)}%` : '0%'}
                      </span>
                    </div>
                  ))}
                </div>
              </ChartCard>
            </div>
          )}

          {/* Recent Reviews */}
          {recentReviews.length > 0 ? (
            <div className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl rounded-lg p-4 md:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base md:text-lg font-semibold text-white">Recent Reviews</h3>
                <Link href="/dashboard/reviews">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={review.avatarUrl}
                          alt={review.authorName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-white">{review.authorName}</p>
                          <p className="text-xs text-slate-400">{getTimeAgo(review.createdAt)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }, (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 ml-13">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl rounded-lg p-8 md:p-12 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                <MessageSquare className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No reviews yet</h3>
              <p className="text-slate-400 mb-6">Start collecting testimonials to see them here</p>
              <Link href="/dashboard/reviews">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Review
                </Button>
              </Link>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}

