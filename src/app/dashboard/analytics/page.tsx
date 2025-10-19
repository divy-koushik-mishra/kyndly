import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { DashboardLayout } from "@/components/dashboard-layout";
import { api } from "@/trpc/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartCard } from "../_components/chart-card";
import { SimpleBarChart } from "../_components/simple-bar-chart";
import { TrendingUp, TrendingDown, Download, Calendar } from "lucide-react";

export default async function AnalyticsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-up");
  }

  // Fetch projects server-side
  const projects = await api.user.getUserProject();
  const selectedProjectId = projects[0]?.id;

  // Mock analytics data
  const kpis = [
    {
      label: "Review Views",
      value: "12,438",
      change: "+18.2%",
      trend: "up",
    },
    {
      label: "Click-through Rate",
      value: "8.4%",
      change: "+2.1%",
      trend: "up",
    },
    {
      label: "Conversion Impact",
      value: "23.6%",
      change: "+5.3%",
      trend: "up",
    },
    {
      label: "Engagement Rate",
      value: "64.2%",
      change: "-1.8%",
      trend: "down",
    },
  ];

  const reviewsOverTimeData = [
    { label: "Jan", value: 42, color: "linear-gradient(to right, #8b5cf6, #ec4899)" },
    { label: "Feb", value: 58, color: "linear-gradient(to right, #8b5cf6, #ec4899)" },
    { label: "Mar", value: 67, color: "linear-gradient(to right, #8b5cf6, #ec4899)" },
    { label: "Apr", value: 89, color: "linear-gradient(to right, #8b5cf6, #ec4899)" },
    { label: "May", value: 68, color: "linear-gradient(to right, #8b5cf6, #ec4899)" },
  ];

  const ratingDistributionData = [
    { label: "5 Stars", value: 256, color: "linear-gradient(to right, #f59e0b, #f97316)" },
    { label: "4 Stars", value: 48, color: "linear-gradient(to right, #10b981, #14b8a6)" },
    { label: "3 Stars", value: 14, color: "linear-gradient(to right, #3b82f6, #06b6d4)" },
    { label: "2 Stars", value: 4, color: "linear-gradient(to right, #a855f7, #ec4899)" },
    { label: "1 Star", value: 2, color: "linear-gradient(to right, #64748b, #475569)" },
  ];

  const trafficSourcesData = [
    { label: "Direct", value: 142, color: "linear-gradient(to right, #8b5cf6, #ec4899)" },
    { label: "Organic Search", value: 98, color: "linear-gradient(to right, #06b6d4, #3b82f6)" },
    { label: "Social Media", value: 54, color: "linear-gradient(to right, #10b981, #14b8a6)" },
    { label: "Referral", value: 30, color: "linear-gradient(to right, #f59e0b, #f97316)" },
  ];

  const topPerformingReviews = [
    { author: "Sarah Johnson", views: 1284, clicks: 142, rating: 5 },
    { author: "Michael Chen", views: 956, clicks: 98, rating: 5 },
    { author: "Emma Davis", views: 834, clicks: 76, rating: 4 },
    { author: "James Wilson", views: 723, clicks: 64, rating: 5 },
    { author: "Olivia Martinez", views: 689, clicks: 58, rating: 4 },
  ];

  return (
    <>
      <Navbar projects={projects} selectedProjectId={selectedProjectId} />
      <DashboardLayout>
        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Analytics</h1>
              <p className="text-sm md:text-base text-slate-400">
                Track performance and engagement metrics
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Last 30 Days
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => (
              <Card
                key={index}
                className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6"
              >
                <div className="space-y-2">
                  <p className="text-sm text-slate-400">{kpi.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-white">{kpi.value}</p>
                    <div
                      className={`flex items-center gap-1 text-sm font-medium ${
                        kpi.trend === "up" ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {kpi.trend === "up" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {kpi.change}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Reviews Over Time"
              subtitle="Monthly review collection trend"
            >
              <SimpleBarChart data={reviewsOverTimeData} />
            </ChartCard>

            <ChartCard
              title="Rating Distribution"
              subtitle="Breakdown by star rating"
            >
              <SimpleBarChart data={ratingDistributionData} />
            </ChartCard>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard
              title="Traffic Sources"
              subtitle="Where visitors come from"
            >
              <SimpleBarChart data={trafficSourcesData} />
            </ChartCard>

            {/* Top Performing Reviews */}
            <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Top Performing Reviews</h3>
                  <p className="text-sm text-slate-400 font-light mt-1">
                    Reviews with highest engagement
                  </p>
                </div>
                <div className="space-y-3">
                  {topPerformingReviews.map((review, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-semibold">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{review.author}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span>{review.views} views</span>
                            <span>•</span>
                            <span>{review.clicks} clicks</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <span key={i} className="text-amber-400">⭐</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Best Day</h4>
                  <p className="text-sm text-slate-400">
                    Monday receives 32% more engagement than average
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                  ⏰
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Peak Hours</h4>
                  <p className="text-sm text-slate-400">
                    Most activity between 2 PM - 5 PM EST
                  </p>
                </div>
              </div>
            </Card>

            <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                  🎯
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Top Platform</h4>
                  <p className="text-sm text-slate-400">
                    Web generates 68% of all review impressions
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

