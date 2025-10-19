import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { DashboardLayout } from "@/components/dashboard-layout";
import { StatsCard } from "./_components/stats-card";
import { ChartCard } from "./_components/chart-card";
import { SimpleBarChart } from "./_components/simple-bar-chart";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, Star, MessageSquare } from "lucide-react";
import { api } from "@/trpc/server";
import { Suspense } from "react";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-up");
  }

  // Fetch projects server-side
  const projects = await api.user.getUserProject();
  
  // Get selected project from cookie or use first project
  const selectedProjectId = projects[0]?.id;

  // Mock data for UI demonstration
  const stats = [
    {
      title: "Total Reviews",
      value: "324",
      change: "+23 this month",
      changeType: "positive" as const,
      icon: <MessageSquare className="h-5 w-5 text-white" />,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Average Rating",
      value: "4.9",
      change: "+0.2 from last month",
      changeType: "positive" as const,
      icon: <Star className="h-5 w-5 text-white" />,
      gradient: "from-amber-500 to-orange-500",
    },
    {
      title: "Total Impressions",
      value: "12.4K",
      change: "+18% this month",
      changeType: "positive" as const,
      icon: <TrendingUp className="h-5 w-5 text-white" />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Conversion Rate",
      value: "8.2%",
      change: "+2.1% increase",
      changeType: "positive" as const,
      icon: <span className="text-xl">📈</span>,
      gradient: "from-emerald-500 to-teal-500",
    },
  ];

  const reviewsData = [
    { label: "5 Stars", value: 256, color: "linear-gradient(to right, #f59e0b, #f97316)" },
    { label: "4 Stars", value: 48, color: "linear-gradient(to right, #10b981, #14b8a6)" },
    { label: "3 Stars", value: 14, color: "linear-gradient(to right, #3b82f6, #06b6d4)" },
    { label: "2 Stars", value: 4, color: "linear-gradient(to right, #a855f7, #ec4899)" },
    { label: "1 Star", value: 2, color: "linear-gradient(to right, #64748b, #475569)" },
  ];

  const trafficData = [
    { label: "Direct", value: 142, color: "linear-gradient(to right, #8b5cf6, #ec4899)" },
    { label: "Organic", value: 98, color: "linear-gradient(to right, #06b6d4, #3b82f6)" },
    { label: "Social", value: 54, color: "linear-gradient(to right, #10b981, #14b8a6)" },
    { label: "Referral", value: 30, color: "linear-gradient(to right, #f59e0b, #f97316)" },
  ];

  const recentReviews = [
    {
      id: "1",
      author: "Sarah Johnson",
      rating: 5,
      text: "Excellent service! The product exceeded my expectations.",
      time: "2 hours ago",
      app: "MyApp Pro",
    },
    {
      id: "2",
      author: "Michael Chen",
      rating: 5,
      text: "Very satisfied with the quality and customer support.",
      time: "5 hours ago",
      app: "MyApp Pro",
    },
    {
      id: "3",
      author: "Emma Davis",
      rating: 4,
      text: "Great overall experience, highly recommend!",
      time: "1 day ago",
      app: "MyApp Pro",
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
                Welcome back, {session.user.name}! Here's your project summary.
              </p>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Review
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Reviews Distribution"
              subtitle="Breakdown by star rating"
            >
              <SimpleBarChart data={reviewsData} />
            </ChartCard>

            <ChartCard
              title="Traffic Sources"
              subtitle="Where your reviews come from"
            >
              <SimpleBarChart data={trafficData} />
            </ChartCard>
          </div>

          {/* Recent Reviews */}
          <div className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl rounded-lg p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base md:text-lg font-semibold text-white">Recent Reviews</h3>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{review.author}</p>
                        <p className="text-xs text-slate-400">{review.time} • {review.app}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
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
        </div>
      </DashboardLayout>
    </>
  );
}

