import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  Star, 
  MessageSquare, 
  BarChart3, 
  Zap, 
  Users, 
  Globe, 
  CheckCircle,
  Heart,
  Sparkles,
  Play,
  TrendingUp,
  Shield
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/server/auth";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Kyndly - Review Management Software | Collect & Showcase Customer Reviews",
  description: "Transform customer feedback into powerful social proof with Kyndly. Collect, manage, and display reviews with our plug-and-play system. Boost credibility and conversions - start free today.",
  keywords: "review management, customer reviews, testimonial software, review widget, customer feedback, review analytics, testimonial management, social proof, review collection",
  openGraph: {
    title: "Kyndly - Review Management Software | Collect & Showcase Customer Reviews",
    description: "Transform customer feedback into powerful social proof with Kyndly. Collect, manage, and display reviews with our plug-and-play system. Boost credibility and conversions - start free today.",
    url: "https://kyndly.online",
    siteName: "Kyndly",
    type: "website",
    images: [
      {
        url: "https://kyndly.online/images/kyndly-social.png",
        width: 1200,
        height: 630,
        alt: "Kyndly - Review Management Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyndly - Review Management Software | Collect & Showcase Customer Reviews",
    description: "Transform customer feedback into powerful social proof with Kyndly. Collect, manage, and display reviews with our plug-and-play system. Boost credibility and conversions - start free today.",
    images: ["https://kyndly.online/images/kyndly-social.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://kyndly.online",
  },
};

export default async function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Kyndly",
    "description": "Review management software for collecting and displaying customer testimonials",
    "url": "https://kyndly.online",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free trial available"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    },
    "featureList": [
      "Review Collection",
      "Analytics Dashboard", 
      "Widget Embedding",
      "Review Moderation",
      "Multi-platform Support"
    ]
  };

  const userSession = await auth();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-10 px-4 py-6 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Kyndly</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-slate-300 hover:text-white transition-colors">Features</Link>
            <Link href="/support" className="text-slate-300 hover:text-white transition-colors">Support</Link>
          </div>
          {userSession?.user ? (
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg">
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Link href="/sign-up">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 py-20 md:px-8 md:py-32">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4 mr-2" />
            Turn kind words into growth
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Collect & Showcase
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Customer Reviews
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            The plug-and-play review system that helps you collect, manage, and display customer testimonials to boost your credibility and conversions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
          
          <p className="text-slate-400 mt-6 text-sm">
            No credit card required • Free to get started • Setup in 5 minutes
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-20 md:px-8 md:py-32">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Everything you need to manage reviews
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
                From collecting testimonials to displaying them beautifully on your website, we&apos;ve got you covered.
              </p>
              <Link href="/features">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                  View All Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-blue-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Review Management</h3>
              <p className="text-slate-300 mb-6">
                Create, edit, and moderate customer reviews with our intuitive dashboard. Publish or unpublish reviews with a single click.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Add reviews manually</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Edit review content</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Moderate testimonials</li>
              </ul>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-blue-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Analytics Dashboard</h3>
              <p className="text-slate-300 mb-6">
                Track your review performance with detailed analytics. See rating distributions, review trends, and key metrics.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Rating distribution charts</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Review statistics</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Performance insights</li>
              </ul>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Multi-Platform Support</h3>
              <p className="text-slate-300 mb-6">
                Support for both web and mobile applications. Configure different apps for different platforms seamlessly.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Web applications</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Mobile apps</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Cross-platform widgets</li>
              </ul>
            </Card>

            {/* Feature 4 */}
            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-amber-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-6">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">5-Star Rating System</h3>
              <p className="text-slate-300 mb-6">
                Collect detailed ratings with our 5-star system. Visualize rating distributions and track average scores.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />1-5 star ratings</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Average rating calculation</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Rating breakdown charts</li>
              </ul>
            </Card>

            {/* Feature 5 */}
            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-pink-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Project Management</h3>
              <p className="text-slate-300 mb-6">
                Organize your reviews by projects. Switch between different projects and manage multiple apps from one dashboard.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Multiple projects</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Project switching</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Organized dashboard</li>
              </ul>
            </Card>

            {/* Feature 6 */}
            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-violet-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Easy Integration</h3>
              <p className="text-slate-300 mb-6">
                Get started in minutes with our simple setup process. No complex configurations or technical expertise required.
              </p>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />5-minute setup</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />No coding required</li>
                <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Instant activation</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-4 py-20 md:px-8 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get started in minutes
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              No complex setup, no technical expertise required. Just follow these simple steps and you&apos;re ready to go.
            </p>
          </div>

          <div className="relative">
            {/* Connection Lines */}
            <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                      <Users className="h-10 w-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                      1
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Sign Up & Create Project</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Create your account and set up your first project. Configure your app details and customize your review widget.
                  </p>
                  <Link href="/features" className="inline-flex items-center text-blue-400 hover:text-blue-300 mt-4">
                    Learn more about features <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                      <MessageSquare className="h-10 w-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                      2
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Collect Reviews</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Import existing testimonials or start collecting new ones. Our system makes it easy to gather authentic customer feedback.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                      <Globe className="h-10 w-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">
                      3
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Embed & Showcase</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">
                    Copy the embed code and paste it on your website. Watch your credibility and conversions grow with beautiful testimonials.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-slate-900/50 border border-slate-700/50">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Lightning Fast</h4>
              <p className="text-slate-400">Setup takes less than 5 minutes</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-slate-900/50 border border-slate-700/50">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Secure & Reliable</h4>
              <p className="text-slate-400">Enterprise-grade security</p>
            </div>
            
            <div className="text-center p-6 rounded-xl bg-slate-900/50 border border-slate-700/50">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Proven Results</h4>
              <p className="text-slate-400">Increase conversions by 15-30%</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 md:px-8 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 p-12 md:p-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                                 radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)`
              }}></div>
            </div>
            
            <div className="relative text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8">
                <Sparkles className="h-4 w-4 mr-2" />
                Join 10,000+ businesses
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Start collecting reviews
                <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  in under 5 minutes
                </span>
              </h2>
              
              <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Transform your customer feedback into powerful social proof. No coding required, no complex setup. Just results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-2xl text-lg px-10 py-5 rounded-xl">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-10 py-5 rounded-xl">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">Free 14-day trial</p>
                    <p className="text-slate-400 text-sm">No credit card required</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">5-minute setup</p>
                    <p className="text-slate-400 text-sm">Get started instantly</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold">Free to start</p>
                    <p className="text-slate-400 text-sm">No commitment required</p>
                  </div>
                </div>
              </div>
            </div>
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
