import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, MoreVertical, ExternalLink, Settings, Trash2 } from "lucide-react";
import { api } from "@/trpc/server";

export default async function AppsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-up");
  }

  // Fetch projects and apps server-side
  const projects = await api.user.getUserProject();
  const selectedProjectId = projects[0]?.id;

  let apps: Array<{
    id: string;
    name: string;
    platform: string;
    domain: string;
    createdAt: Date;
    updatedAt: Date;
    logoUrl: string | null;
    description: string | null;
  }> = [];

  if (selectedProjectId) {
    apps = await api.user.getProjectApps({ projectId: selectedProjectId });
  }

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

  return (
    <>
      <Navbar projects={projects} selectedProjectId={selectedProjectId} />
      <DashboardLayout>
        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Apps</h1>
              <p className="text-sm md:text-base text-slate-400">
                Manage your apps and configure testimonial widgets
              </p>
            </div>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add New App
            </Button>
          </div>

          {/* Empty State */}
          {apps.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                <span className="text-4xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No apps yet</h3>
              <p className="text-slate-400 mb-6">Get started by creating your first app</p>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First App
              </Button>
            </div>
          ) : (
            <>
              {/* Apps Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {apps.map((app) => (
                  <Card
                    key={app.id}
                    className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6 hover:border-slate-600/50 transition-all duration-200 group"
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-2xl">
                            {app.platform === "web" ? "🌐" : "📱"}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                              {app.name}
                            </h3>
                            <p className="text-xs text-slate-400">{app.domain}</p>
                          </div>
                        </div>
                        <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
                          <MoreVertical className="h-4 w-4 text-slate-400" />
                        </button>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-800/50">
                        <div>
                          <p className="text-2xl font-bold text-white">0</p>
                          <p className="text-xs text-slate-400">Reviews</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white">-</p>
                          <p className="text-xs text-slate-400">Avg Rating</p>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                          <span className="text-sm text-slate-300 capitalize">Active</span>
                        </div>
                        <p className="text-xs text-slate-500">Updated {getTimeAgo(app.updatedAt)}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <Settings className="h-3 w-3 mr-1" />
                          Configure
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Add New Card */}
                <Card className="border-2 border-dashed border-slate-700/50 bg-slate-900/50 backdrop-blur-xl p-6 hover:border-purple-500/50 transition-all duration-200 cursor-pointer group">
                  <div className="h-full flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                      <Plus className="h-8 w-8 text-slate-400 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                        Add New App
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        Configure a new testimonial widget
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </>
          )}

          {/* Configuration Guide */}
          <div className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Setup Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mb-3">
                  1
                </div>
                <h4 className="font-semibold text-white mb-2">Create App</h4>
                <p className="text-sm text-slate-400">
                  Add your app details and configure the widget appearance
                </p>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold mb-3">
                  2
                </div>
                <h4 className="font-semibold text-white mb-2">Add Reviews</h4>
                <p className="text-sm text-slate-400">
                  Import existing reviews or collect new ones from customers
                </p>
              </div>
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold mb-3">
                  3
                </div>
                <h4 className="font-semibold text-white mb-2">Embed Code</h4>
                <p className="text-sm text-slate-400">
                  Copy the embed code and paste it into your website
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

