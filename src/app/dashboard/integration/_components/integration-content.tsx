"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Copy, Check, Code, Palette, Layout } from "lucide-react";

export function IntegrationContent() {
  const [copied, setCopied] = useState(false);

  const embedCode = `<!-- Kyndly Reviews Widget -->
<script src="https://cdn.kyndly.com/widget.js"></script>
<div id="kyndly-reviews" data-project-id="proj_abc123"></div>
<script>
  Kyndly.init({
    projectId: 'proj_abc123',
    theme: 'light',
    maxReviews: 6,
    showRating: true,
    layout: 'grid'
  });
</script>`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const widgetStyles = [
    { name: "Grid", layout: "grid" },
    { name: "Carousel", layout: "carousel" },
    { name: "List", layout: "list" },
    { name: "Masonry", layout: "masonry" },
  ];

  const themes = [
    { name: "Light", value: "light", bg: "bg-white", text: "text-slate-900" },
    { name: "Dark", value: "dark", bg: "bg-slate-900", text: "text-white" },
    { name: "Auto", value: "auto", bg: "bg-gradient-to-br from-slate-100 to-slate-900", text: "text-slate-900" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Integration</h1>
        <p className="text-sm md:text-base text-slate-400">
          Embed testimonials on your website or app
        </p>
      </div>

      {/* Quick Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Embed Code */}
        <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Code className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Embed Code</h3>
                <p className="text-sm text-slate-400">Copy and paste into your website</p>
              </div>
            </div>

            <div className="relative">
              <pre className="bg-slate-950/50 border border-slate-800 rounded-lg p-4 overflow-x-auto text-sm text-slate-300 font-mono">
                {embedCode}
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2 border-slate-600 hover:bg-slate-800"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm text-blue-300">
                <span className="font-semibold">💡 Tip:</span> Place this code where you want the reviews to appear on your page.
              </p>
            </div>
          </div>
        </Card>

        {/* Installation Steps */}
        <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Installation Steps</h3>
            <div className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Copy the embed code",
                  desc: "Use the code snippet on the left",
                },
                {
                  step: "2",
                  title: "Paste in your website",
                  desc: "Add it to your HTML where you want reviews to appear",
                },
                {
                  step: "3",
                  title: "Customize the appearance",
                  desc: "Configure theme, layout, and display options below",
                },
                {
                  step: "4",
                  title: "Publish and test",
                  desc: "Preview your website to see the widget in action",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Widget Customization */}
      <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Palette className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Widget Customization</h3>
              <p className="text-sm text-slate-400">Personalize the look and feel</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Theme Selection */}
            <div className="space-y-3">
              <Label className="text-white">Theme</Label>
              <div className="grid grid-cols-3 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.value}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      theme.value === "light"
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-slate-700 hover:border-slate-600"
                    }`}
                  >
                    <div className={`w-full h-12 rounded ${theme.bg} mb-2`}></div>
                    <p className="text-sm text-white font-medium">{theme.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Selection */}
            <div className="space-y-3">
              <Label className="text-white">Layout Style</Label>
              <div className="grid grid-cols-2 gap-3">
                {widgetStyles.map((style) => (
                  <button
                    key={style.layout}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      style.layout === "grid"
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-slate-700 hover:border-slate-600"
                    }`}
                  >
                    <Layout className="h-8 w-8 text-slate-400 mb-2" />
                    <p className="text-sm text-white font-medium">{style.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Platform Integrations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: "WordPress",
            icon: "🔌",
            desc: "Install our WordPress plugin",
            available: true,
          },
          {
            name: "Shopify",
            icon: "🛍️",
            desc: "Add to your Shopify store",
            available: true,
          },
          {
            name: "React",
            icon: "⚛️",
            desc: "NPM package for React apps",
            available: true,
          },
          {
            name: "Webflow",
            icon: "🌊",
            desc: "Embed in Webflow sites",
            available: true,
          },
          {
            name: "Wix",
            icon: "🎨",
            desc: "Add to Wix websites",
            available: false,
          },
          {
            name: "Squarespace",
            icon: "◼️",
            desc: "Integrate with Squarespace",
            available: false,
          },
        ].map((platform) => (
          <Card
            key={platform.name}
            className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6 hover:border-slate-600/50 transition-all cursor-pointer group"
          >
            <div className="space-y-3">
              <div className="text-4xl">{platform.icon}</div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                    {platform.name}
                  </h4>
                  {!platform.available && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-700 text-slate-300">
                      Soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-400 mt-1">{platform.desc}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* API Documentation */}
      <Card className="border border-slate-700/50 bg-slate-900/90 backdrop-blur-xl p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-2xl">
              📚
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">API Documentation</h3>
              <p className="text-sm text-slate-400">For developers who want full control</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <h4 className="font-semibold text-white mb-2">REST API</h4>
              <p className="text-sm text-slate-400 mb-3">
                Full programmatic access to reviews and analytics
              </p>
              <Button size="sm" variant="outline">
                View Docs
              </Button>
            </div>
            <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
              <h4 className="font-semibold text-white mb-2">JavaScript SDK</h4>
              <p className="text-sm text-slate-400 mb-3">
                Client-side library for custom integrations
              </p>
              <Button size="sm" variant="outline">
                View Docs
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

