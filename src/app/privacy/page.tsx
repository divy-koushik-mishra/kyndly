import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SEOHead } from "@/components/seo-head";
import { 
  Shield, 
  Eye, 
  Lock, 
  Database, 
  Users, 
  Mail,
  ArrowRight,
  Heart,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy - Kyndly Review Management Software"
        description="Learn how Kyndly protects your privacy and data. Our comprehensive privacy policy covers data collection, usage, security, and your rights."
        keywords="privacy policy, data protection, GDPR compliance, review management privacy, customer data security"
        canonicalUrl="/privacy"
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
            <Link href="/terms" className="text-slate-300 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-4 py-20 md:px-8 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8">
            <Shield className="h-4 w-4 mr-2" />
            Your Privacy Matters
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Last updated: December 2024
          </p>
          <p className="text-lg text-slate-400 max-w-4xl mx-auto">
            We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
          </p>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="px-4 py-20 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Privacy Principles
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              We follow these core principles to protect your privacy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-blue-500/50 transition-all duration-300 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Transparency</h3>
              <p className="text-slate-300">
                We clearly explain what data we collect and how we use it. No hidden practices or surprise data collection.
              </p>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-emerald-500/50 transition-all duration-300 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Security</h3>
              <p className="text-slate-300">
                Your data is protected with enterprise-grade encryption and security measures. We never compromise on security.
              </p>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl hover:border-amber-500/50 transition-all duration-300 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Control</h3>
              <p className="text-slate-300">
                You have full control over your data. Access, modify, or delete your information at any time.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Information We Collect */}
      <section className="px-4 py-20 md:px-8 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Information We Collect
          </h2>

          <div className="space-y-8">
            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <Database className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Account Information</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Name and email address</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Profile information you choose to provide</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Authentication credentials (securely encrypted)</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Review Data</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Customer reviews and ratings</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Reviewer names and avatars</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Review timestamps and metadata</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">Usage Analytics</h3>
                  <ul className="space-y-2 text-slate-300">
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />How you interact with our platform</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Feature usage and performance metrics</li>
                    <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" />Error logs and debugging information</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Use Information */}
      <section className="px-4 py-20 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            How We Use Your Information
          </h2>

          <div className="space-y-6">
            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-3">Service Delivery</h3>
              <p className="text-slate-300">
                We use your information to provide, maintain, and improve our review management services, including processing reviews, generating analytics, and delivering customer support.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-3">Communication</h3>
              <p className="text-slate-300">
                We may contact you about your account, service updates, security alerts, and important changes to our terms or privacy policy.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-3">Analytics & Improvement</h3>
              <p className="text-slate-300">
                We analyze usage patterns to improve our platform, develop new features, and ensure optimal performance and security.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-3">Legal Compliance</h3>
              <p className="text-slate-300">
                We may use your information to comply with legal obligations, enforce our terms of service, and protect our rights and the rights of our users.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Security */}
      <section className="px-4 py-20 md:px-8 bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Data Security & Protection
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-4">Encryption</h3>
              <p className="text-slate-300">
                All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. Your sensitive information is protected with industry-standard security measures.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-4">Access Controls</h3>
              <p className="text-slate-300">
                We implement strict access controls and authentication mechanisms. Only authorized personnel can access your data, and all access is logged and monitored.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-4">Regular Audits</h3>
              <p className="text-slate-300">
                We conduct regular security audits and penetration testing to identify and address potential vulnerabilities. Our security practices are continuously improved.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-4">Data Backup</h3>
              <p className="text-slate-300">
                Your data is regularly backed up to secure, geographically distributed locations to ensure availability and protection against data loss.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Your Rights */}
      <section className="px-4 py-20 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            Your Privacy Rights
          </h2>

          <div className="space-y-6">
            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-3">Access Your Data</h3>
              <p className="text-slate-300">
                You can view and download all your data at any time through your account dashboard or by contacting our support team.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-3">Update Information</h3>
              <p className="text-slate-300">
                You can update your account information, review settings, and preferences at any time through your account settings.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-3">Delete Your Data</h3>
              <p className="text-slate-300">
                You can request deletion of your account and all associated data. We will process deletion requests within 30 days.
              </p>
            </Card>

            <Card className="p-6 bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white mb-3">Opt-Out of Communications</h3>
              <p className="text-slate-300">
                You can unsubscribe from marketing emails at any time while still receiving important service-related communications.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="px-4 py-20 md:px-8 bg-slate-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Questions About Privacy?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            We&apos;re here to help with any privacy-related questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/support">
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                Contact Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <Mail className="mr-2 h-4 w-4" />
              privacy@kyndly.com
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
