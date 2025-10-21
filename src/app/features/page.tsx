import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEOHead } from "@/components/seo-head";
import { 
  MessageSquare, 
  BarChart3, 
  Globe, 
  Star, 
  Users, 
  Zap, 
  Shield, 
  Settings,
  Download,
  Filter,
  Bell,
  Heart,
  ArrowRight,
  CheckCircle,
  Play
} from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Features - Kyndly Review Management Software",
    "description": "Comprehensive review management features including collection, analytics, widgets, and moderation tools",
    "url": "https://kyndly.online/features",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Kyndly",
      "featureList": [
        "Review Collection & Management",
        "Analytics Dashboard",
        "Widget Embedding",
        "Review Moderation",
        "Multi-platform Support",
        "API Integration"
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Features - Review Management Software | Kyndly"
        description="Discover Kyndly's comprehensive review management features. Collect, analyze, and display customer reviews with advanced tools for review collection, analytics, widgets, and moderation."
        keywords="review management features, testimonial software features, review collection tools, review analytics, review widgets, customer feedback management"
        canonicalUrl="/features"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Navigation */}
        <nav className="relative z-10 px-4 py-6 md:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Kyndly</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-slate-300 hover:text-white transition-colors">Home</Link>
              <Link href="/support" className="text-slate-300 hover:text-white transition-colors">Support</Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-4 py-20 md:px-8 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8">
              <Star className="h-4 w-4 mr-2" />
              Comprehensive Features
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Everything you need to manage
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                customer reviews
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
              From collecting testimonials to displaying them beautifully on your website, our comprehensive feature set covers every aspect of review management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-xl text-lg px-8 py-4">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8 py-4">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="px-4 py-20 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Core Features
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Powerful tools designed to streamline your review management process
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Review Collection */}
              <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-blue-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Review Collection</h3>
                <p className="text-slate-300 mb-6">
                  Collect reviews through multiple channels with our intuitive dashboard and automated collection tools.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Manual review entry</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Bulk import from CSV</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />API integration</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Email collection campaigns</li>
                </ul>
              </Card>

              {/* Analytics Dashboard */}
              <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Analytics Dashboard</h3>
                <p className="text-slate-300 mb-6">
                  Track your review performance with detailed analytics, rating distributions, and key metrics.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Rating distribution charts</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Review trends over time</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Performance insights</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Export reports</li>
                </ul>
              </Card>

              {/* Widget Embedding */}
              <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-amber-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Widget Embedding</h3>
                <p className="text-slate-300 mb-6">
                  Display reviews beautifully on your website with customizable widgets and responsive designs.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Customizable themes</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Responsive design</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Easy embed codes</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Multiple display formats</li>
                </ul>
              </Card>

              {/* Review Moderation */}
              <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-pink-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-6">
                  <Filter className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Review Moderation</h3>
                <p className="text-slate-300 mb-6">
                  Control which reviews are displayed with our comprehensive moderation tools and approval workflows.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Publish/unpublish controls</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Content filtering</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Approval workflows</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Bulk moderation</li>
                </ul>
              </Card>

              {/* Multi-platform Support */}
              <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-violet-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Multi-platform Support</h3>
                <p className="text-slate-300 mb-6">
                  Support for both web and mobile applications with platform-specific configurations and widgets.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Web applications</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Mobile apps</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Cross-platform widgets</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Platform-specific settings</li>
                </ul>
              </Card>

              {/* API Integration */}
              <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-cyan-500/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">API Integration</h3>
                <p className="text-slate-300 mb-6">
                  Integrate with your existing systems using our comprehensive REST API and webhook support.
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />REST API access</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Webhook notifications</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />SDK libraries</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Documentation & examples</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="px-4 py-20 md:px-8 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Advanced Features
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Take your review management to the next level with our advanced tools and integrations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Custom Branding</h3>
                    <p className="text-slate-300 mb-4">
                      Customize the look and feel of your review widgets to match your brand perfectly.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Custom colors and fonts</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Logo integration</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Layout customization</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                    <Bell className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Automated Notifications</h3>
                    <p className="text-slate-300 mb-4">
                      Stay informed with automated notifications for new reviews, moderation alerts, and performance updates.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Email notifications</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Slack integration</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Custom alert rules</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Download className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Data Export</h3>
                    <p className="text-slate-300 mb-4">
                      Export your review data in multiple formats for analysis, reporting, and backup purposes.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />CSV and JSON export</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Scheduled exports</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />API data access</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Security & Compliance</h3>
                    <p className="text-slate-300 mb-4">
                      Enterprise-grade security with GDPR compliance, data encryption, and audit trails.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />GDPR compliance</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Data encryption</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Audit logs</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Experience all these features with our 14-day free trial. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-xl text-lg px-8 py-4">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/support">
                <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8 py-4">
                  Get Support
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 px-4 py-12 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Kyndly</span>
              </div>
            <div className="flex items-center space-x-6 text-slate-400">
              <Link href="/features" className="hover:text-white transition-colors">Features</Link>
              <Link href="/support" className="hover:text-white transition-colors">Support</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
              <p>&copy; 2024 Kyndly. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
