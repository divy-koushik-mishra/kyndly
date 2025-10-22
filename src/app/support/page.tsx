import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEOHead } from "@/components/seo-head";
import { 
  Mail, 
  Clock, 
  HelpCircle, 
  BookOpen, 
  Users, 
  ArrowRight,
  CheckCircle,
  Heart
} from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Support - Kyndly Review Management",
    "description": "Get help with Kyndly review management platform. 24/7 support, documentation, and resources.",
    "url": "https://kyndly.online/support",
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How quickly can I get started?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can be up and running in under 5 minutes! Simply sign up, create your first project, and start adding reviews. No technical setup required."
          }
        },
        {
          "@type": "Question",
          "name": "Can I import existing reviews?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! You can import reviews from CSV files or manually add them through our dashboard. We also provide API endpoints for bulk imports."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a free trial?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! We offer a 14-day free trial with full access to all features. No credit card required to get started."
          }
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Support - Free Review Management Software | Kyndly Help Center"
        description="Get help with Kyndly's free review management platform. Email support, documentation, and resources to maximize your review collection and display."
        keywords="free review management support, testimonial software help, customer review platform support, review widget help, email support"
        canonicalUrl="/support"
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
            <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-slate-300 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-20 md:px-8 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            We&apos;re here to
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              help you succeed
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto">
            Get the support you need to make the most of your free review management system. Our team is ready to help you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="px-4 py-20 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Get in touch
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Get help with your review management platform
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-300 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Email Support</h3>
              <p className="text-slate-300 mb-6">
                Send us a detailed message and we&apos;ll respond within 24 hours. We&apos;re here to help you get the most out of your free review management platform.
              </p>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                <Mail className="mr-2 h-4 w-4" />
                support@kyndly.online
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-20 md:px-8 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-300">
              Find answers to common questions about Kyndly
            </p>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-3">How quickly can I get started?</h3>
              <p className="text-slate-300">
                You can be up and running in under 5 minutes! Simply sign up, create your first project, and start adding reviews. No technical setup required.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-3">Can I import existing reviews?</h3>
              <p className="text-slate-300">
                Yes! You can import reviews from CSV files or manually add them through our dashboard. We also provide API endpoints for bulk imports.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-3">Is Kyndly really free?</h3>
              <p className="text-slate-300">
                Yes! Kyndly is completely free to use. No credit card required, no hidden fees, no time limits. You get full access to all features at no cost.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-3">How do I embed reviews on my website?</h3>
              <p className="text-slate-300">
                Simply copy the embed code from your dashboard and paste it into your website&apos;s HTML. We provide responsive widgets that work on all devices.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-3">Can I customize the review widget appearance?</h3>
              <p className="text-slate-300">
                Yes! You can customize colors, fonts, layout, and more to match your brand. We offer multiple themes and advanced customization options.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-3">What happens to my data?</h3>
              <p className="text-slate-300">
                Your data is always yours. Since Kyndly is free, there&apos;s no cancellation to worry about. You can export all your reviews and data at any time, and your data stays with you as long as you need it.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="px-4 py-20 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Helpful Resources
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Learn how to make the most of your review management system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-blue-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Documentation</h3>
              <p className="text-slate-300 mb-4">
                Comprehensive guides and API documentation to help you integrate and customize your review system.
              </p>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                View Docs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
                <HelpCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Video Tutorials</h3>
              <p className="text-slate-300 mb-4">
                Step-by-step video guides covering everything from setup to advanced features and integrations.
              </p>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                Watch Videos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-amber-500/50 transition-all duration-300">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Community Forum</h3>
              <p className="text-slate-300 mb-4">
                Connect with other users, share tips, and get help from the community of Kyndly users.
              </p>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800">
                Join Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Info */}
      <section className="px-4 py-20 md:px-8 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8">
            <Clock className="h-4 w-4 mr-2" />
            Support Information
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            We&apos;re here to help
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">Email Support</h3>
              <p className="text-slate-300 mb-4">We respond to all emails within 24 hours</p>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Reliable Support</span>
              </div>
            </div>
          </div>
          
          <p className="text-slate-400 mt-8">
            Since Kyndly is completely free, we provide email support to help you get the most out of your review management platform.
          </p>
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
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link href="/support" className="hover:text-white transition-colors">Support</Link>
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
