import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEOHead } from "@/components/seo-head";
import { 
  FileText, 
  Scale, 
  Shield, 
  Users, 
  AlertTriangle,
  ArrowRight,
  Heart,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  return (
    <>
      <SEOHead
        title="Terms of Service - Kyndly Review Management Software"
        description="Read Kyndly's terms of service covering user responsibilities, service availability, content policies, and legal terms for our review management platform."
        keywords="terms of service, user agreement, review management terms, software terms, legal terms"
        canonicalUrl="/terms"
        noIndex={false}
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
            <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-20 md:px-8 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8">
            <FileText className="h-4 w-4 mr-2" />
            Legal Terms
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Last updated: December 2024
          </p>
          <p className="text-lg text-slate-400 max-w-4xl mx-auto">
            These Terms of Service govern your use of Kyndly&apos;s review management platform. By using our services, you agree to be bound by these terms.
          </p>
        </div>
      </section>

      {/* Key Terms Overview */}
      <section className="px-4 py-20 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Key Terms Overview
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Important highlights from our terms of service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-blue-500/50 transition-all duration-300 text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Account Responsibility</h3>
              <p className="text-slate-300 text-sm">
                You&apos;re responsible for maintaining the security of your account and all activities under it.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-300 text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Content Guidelines</h3>
              <p className="text-slate-300 text-sm">
                Reviews must be authentic, respectful, and comply with our content policies.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-amber-500/50 transition-all duration-300 text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Service Availability</h3>
              <p className="text-slate-300 text-sm">
                We strive for 99.9% uptime but cannot guarantee uninterrupted service.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-pink-500/50 transition-all duration-300 text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-3">Termination Rights</h3>
              <p className="text-slate-300 text-sm">
                Either party may terminate the service with appropriate notice as outlined in the terms.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="px-4 py-20 md:px-8 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Detailed Terms
          </h2>

          <div className="space-y-8">
            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-6">1. Acceptance of Terms</h3>
              <p className="text-slate-300 mb-4">
                By accessing or using Kyndly&apos;s services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />You must be at least 18 years old to use our services</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />You must provide accurate and complete information when creating an account</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />You are responsible for maintaining the confidentiality of your account</li>
              </ul>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-6">2. Service Description</h3>
              <p className="text-slate-300 mb-4">
                Kyndly provides a review management platform that allows businesses to collect, manage, and display customer reviews. Our services include:
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Review collection and management tools</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Analytics and reporting features</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Widget embedding capabilities</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />API access for integrations</li>
              </ul>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-6">3. User Responsibilities</h3>
              <p className="text-slate-300 mb-4">
                As a user of our services, you agree to:
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Use the service only for lawful purposes and in accordance with these terms</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Not upload, post, or transmit any content that is illegal, harmful, or violates any rights</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Maintain the security of your account credentials</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Comply with all applicable laws and regulations</li>
              </ul>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-6">4. Content Policy</h3>
              <p className="text-slate-300 mb-4">
                All reviews and content must comply with our content policy:
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Reviews must be authentic and based on real experiences</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Content must not contain spam, fake reviews, or misleading information</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />No offensive, discriminatory, or inappropriate content</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Respect intellectual property rights of others</li>
              </ul>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-6">5. Payment and Billing</h3>
              <p className="text-slate-300 mb-4">
                Our billing terms include:
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Subscription fees are billed in advance on a monthly or annual basis</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />All fees are non-refundable except as required by law</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />We may change pricing with 30 days&apos; notice to existing customers</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Failure to pay may result in service suspension or termination</li>
              </ul>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-6">6. Service Availability</h3>
              <p className="text-slate-300 mb-4">
                We strive to provide reliable service but cannot guarantee:
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Uninterrupted or error-free service</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />That the service will meet your specific requirements</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />That defects will be corrected in a timely manner</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />That the service will be available at all times</li>
              </ul>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-6">7. Termination</h3>
              <p className="text-slate-300 mb-4">
                Either party may terminate the service:
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />You may cancel your subscription at any time through your account settings</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />We may suspend or terminate accounts that violate these terms</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Upon termination, your access to the service will cease immediately</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />We will provide reasonable notice before terminating service for non-payment</li>
              </ul>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white mb-6">8. Limitation of Liability</h3>
              <p className="text-slate-300 mb-4">
                To the maximum extent permitted by law:
              </p>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Kyndly shall not be liable for any indirect, incidental, or consequential damages</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Our total liability shall not exceed the amount paid by you for the service in the 12 months preceding the claim</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />We are not responsible for any loss of data, profits, or business opportunities</li>
                <li className="flex items-start"><CheckCircle className="h-4 w-4 mr-2 text-green-400 mt-1 flex-shrink-0" />Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="px-4 py-20 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Questions About Our Terms?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            If you have any questions about these terms, please contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/support">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                Contact Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <FileText className="mr-2 h-4 w-4" />
              legal@kyndly.com
            </Button>
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
