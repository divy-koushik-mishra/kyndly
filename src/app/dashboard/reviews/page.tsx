import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { DashboardLayout } from "@/components/dashboard-layout";
import { api } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Plus, Search, Filter, Star, MoreVertical, Eye, Edit, Trash2, CheckCircle } from "lucide-react";

export default async function ReviewsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-up");
  }

  // Fetch projects server-side
  const projects = await api.user.getUserProject();
  const selectedProjectId = projects[0]?.id;

  // Mock reviews data
  const reviews = [
    {
      id: "1",
      author: "Sarah Johnson",
      email: "sarah.j@example.com",
      rating: 5,
      text: "Excellent service! The product exceeded my expectations. Very satisfied with the quality and customer support.",
      app: "Main Website",
      status: "published",
      date: "2024-01-15",
      verified: true,
    },
    {
      id: "2",
      author: "Michael Chen",
      email: "m.chen@example.com",
      rating: 5,
      text: "Very satisfied with the quality and customer support. Highly recommend to anyone looking for a reliable solution.",
      app: "Main Website",
      status: "published",
      date: "2024-01-14",
      verified: true,
    },
    {
      id: "3",
      author: "Emma Davis",
      email: "emma.d@example.com",
      rating: 4,
      text: "Great overall experience! The interface is intuitive and the features are exactly what I needed.",
      app: "iOS App",
      status: "published",
      date: "2024-01-13",
      verified: false,
    },
    {
      id: "4",
      author: "James Wilson",
      email: "j.wilson@example.com",
      rating: 5,
      text: "Outstanding product! Worth every penny. The attention to detail is impressive.",
      app: "Main Website",
      status: "pending",
      date: "2024-01-12",
      verified: true,
    },
    {
      id: "5",
      author: "Olivia Martinez",
      email: "olivia.m@example.com",
      rating: 4,
      text: "Good experience overall. A few minor issues but customer support was very helpful.",
      app: "Android App",
      status: "published",
      date: "2024-01-11",
      verified: false,
    },
  ];

  const stats = [
    { label: "Total Reviews", value: "324", color: "from-purple-500 to-pink-500" },
    { label: "Avg Rating", value: "4.9", color: "from-amber-500 to-orange-500" },
    { label: "Published", value: "298", color: "from-emerald-500 to-teal-500" },
    { label: "Pending", value: "26", color: "from-blue-500 to-cyan-500" },
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
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Review
            </Button>
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

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search reviews..."
                className="pl-10 bg-slate-900/90 border-slate-700/50 text-white"
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card
                key={review.id}
                className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6 hover:border-slate-600/50 transition-colors"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-lg">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-white">{review.author}</h3>
                          {review.verified && (
                            <CheckCircle className="h-4 w-4 text-blue-400" />
                          )}
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              review.status === "published"
                                ? "bg-emerald-500/20 text-emerald-400"
                                : "bg-amber-500/20 text-amber-400"
                            }`}
                          >
                            {review.status}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400">{review.email}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-slate-600"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-slate-500">•</span>
                          <span className="text-xs text-slate-500">{review.app}</span>
                          <span className="text-xs text-slate-500">•</span>
                          <span className="text-xs text-slate-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
                      <MoreVertical className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-300 leading-relaxed">{review.text}</p>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/50">
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    {review.status === "pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-emerald-600 text-emerald-400 hover:bg-emerald-500/10"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-600 text-red-400 hover:bg-red-500/10 ml-auto"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">Showing 1-5 of 324 reviews</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

