import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { DashboardLayout } from "@/components/dashboard-layout";
import { api } from "@/trpc/server";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, User, Bell, Shield, CreditCard, Trash2 } from "lucide-react";

export default async function SettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/sign-up");
  }

  // Fetch projects server-side
  const projects = await api.user.getUserProject();
  const selectedProjectId = projects[0]?.id;

  return (
    <>
      <Navbar projects={projects} selectedProjectId={selectedProjectId} />
      <DashboardLayout>
        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
            <p className="text-sm md:text-base text-slate-400">
              Manage your account and project preferences
            </p>
          </div>

          {/* Profile Settings */}
          <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Profile</h3>
                  <p className="text-sm text-slate-400">Update your personal information</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Name</Label>
                  <Input
                    id="name"
                    defaultValue={session.user.name ?? ""}
                    className="bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={session.user.email ?? ""}
                    className="bg-slate-800/50 border-slate-700 text-white"
                    disabled
                  />
                </div>
              </div>

              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </Card>

          {/* Project Settings */}
          <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                  ⚙️
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Project Settings</h3>
                  <p className="text-sm text-slate-400">Configure project-specific options</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="project-name" className="text-white">Project Name</Label>
                  <Input
                    id="project-name"
                    defaultValue="MyApp Pro"
                    className="bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="domain" className="text-white">Domain</Label>
                  <Input
                    id="domain"
                    defaultValue="myapp.com"
                    className="bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <div>
                    <p className="font-medium text-white">Auto-approve reviews</p>
                    <p className="text-sm text-slate-400">Automatically publish new reviews without moderation</p>
                  </div>
                  <button className="relative w-14 h-7 bg-slate-700 rounded-full transition-colors hover:bg-slate-600">
                    <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform"></div>
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <div>
                    <p className="font-medium text-white">Email notifications</p>
                    <p className="text-sm text-slate-400">Receive notifications for new reviews</p>
                  </div>
                  <button className="relative w-14 h-7 bg-purple-600 rounded-full transition-colors hover:bg-purple-700">
                    <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full transition-transform"></div>
                  </button>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  <Bell className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Notifications</h3>
                  <p className="text-sm text-slate-400">Manage your notification preferences</p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "New review submitted", desc: "Get notified when someone leaves a review" },
                  { label: "Weekly summary", desc: "Receive weekly analytics report" },
                  { label: "Monthly insights", desc: "Get monthly performance insights" },
                  { label: "Product updates", desc: "Stay informed about new features" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                  >
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </div>
                    <button className="relative w-14 h-7 bg-purple-600 rounded-full transition-colors hover:bg-purple-700">
                      <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full transition-transform"></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Security</h3>
                  <p className="text-sm text-slate-400">Manage your account security</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">API Key</p>
                      <p className="text-sm text-slate-400 mt-1">Your secret API key for programmatic access</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Regenerate
                    </Button>
                  </div>
                  <div className="mt-3">
                    <code className="text-xs text-slate-300 bg-slate-950/50 px-3 py-2 rounded border border-slate-800 block">
                      knd_abc123def456...
                    </code>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-400 mt-1">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Billing */}
          <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Billing & Plan</h3>
                  <p className="text-sm text-slate-400">Manage your subscription and billing</p>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Current Plan</p>
                    <p className="text-2xl font-bold text-white mt-1">Free Plan</p>
                    <p className="text-sm text-slate-300 mt-2">324 / 500 reviews used</p>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                    Upgrade to Pro
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Reviews", value: "324 / 500" },
                  { label: "Apps", value: "3 / 5" },
                  { label: "API Requests", value: "1.2K / 10K" },
                ].map((item, index) => (
                  <div key={index} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <p className="text-sm text-slate-400">{item.label}</p>
                    <p className="text-xl font-semibold text-white mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="border border-red-500/30 bg-red-950/20 backdrop-blur-xl p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Trash2 className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Danger Zone</h3>
                  <p className="text-sm text-slate-400">Irreversible actions</p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-900/50 border border-red-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">Delete Project</p>
                    <p className="text-sm text-slate-400 mt-1">
                      Permanently delete this project and all associated data
                    </p>
                  </div>
                  <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-500/10">
                    Delete Project
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    </>
  );
}

