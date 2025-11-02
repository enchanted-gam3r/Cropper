'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Shield,
  Eye,
  Lock,
  Cookie,
  AlertTriangle,
  CheckCircle,
  FileText,
  Download,
  Mail,
  Phone
} from 'lucide-react';

export default function PolicyPage() {
  const [activeSection, setActiveSection] = useState('privacy');

  const policySections = [
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: Shield,
      description: 'How we collect, use, and protect your information'
    },
    {
      id: 'terms',
      title: 'Terms of Service',
      icon: FileText,
      description: 'Rules and guidelines for using Cropper'
    },
    {
      id: 'cookies',
      title: 'Cookie Policy',
      icon: Cookie,
      description: 'How we use cookies and similar technologies'
    },
    {
      id: 'data',
      title: 'Data Protection',
      icon: Lock,
      description: 'Security measures and data handling practices'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'privacy':
        return <PrivacyPolicyContent />;
      case 'terms':
        return <TermsOfServiceContent />;
      case 'cookies':
        return <CookiePolicyContent />;
      case 'data':
        return <DataProtectionContent />;
      default:
        return <PrivacyPolicyContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-600 rounded-full">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Policies & Legal
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Transparency and trust are fundamental to our relationship with users. Learn how we protect your data and operate our platform.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Policy Documents
              </h3>
              <nav className="space-y-2">
                {policySections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 flex items-center space-x-3 ${
                        activeSection === section.id
                          ? 'bg-primary-100 text-primary-700 border-l-4 border-primary-600'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{section.title}</div>
                        <div className="text-sm opacity-75">{section.description}</div>
                      </div>
                    </button>
                  );
                })}
              </nav>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Questions?</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>privacy@cropper.in</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>1800-XXX-XXXX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {policySections.find(s => s.id === activeSection)?.title}
                </h2>
                <p className="text-lg text-gray-600">
                  Last updated: January 15, 2024
                </p>
              </div>

              {renderContent()}

              {/* Download Section */}
              <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Policies</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors duration-200">
                    <Download className="h-5 w-5" />
                    <span>Download PDF</span>
                  </button>
                  <button className="flex items-center space-x-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition-colors duration-200">
                    <FileText className="h-5 w-5" />
                    <span>Print Version</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrivacyPolicyContent() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            We collect information you provide directly to us, such as when you create an account, use our chatbot, or contact us for support.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <h4 className="font-medium text-blue-900 mb-2">What We Collect:</h4>
            <ul className="list-disc list-inside space-y-1 text-blue-800">
              <li>Name and contact information</li>
              <li>Farming location and crop information</li>
              <li>Chatbot queries and interactions</li>
              <li>Usage patterns and preferences</li>
              <li>Device and browser information</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Service Improvement</h4>
              <p className="text-gray-600 text-sm">To provide and improve our agricultural services</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Personalization</h4>
              <p className="text-gray-600 text-sm">To customize content and recommendations</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Communication</h4>
              <p className="text-gray-600 text-sm">To send updates and important notifications</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-gray-900">Analytics</h4>
              <p className="text-gray-600 text-sm">To understand usage patterns and improve features</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h3>
        <p className="text-gray-700 mb-4">
          We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <h4 className="font-medium text-yellow-900">Important</h4>
          </div>
          <p className="text-yellow-800 text-sm">
            While we take reasonable precautions, no method of transmission over the internet or method of electronic storage is 100% secure.
          </p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h3>
        <div className="space-y-3 text-gray-700">
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Access your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function TermsOfServiceContent() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h3>
        <p className="text-gray-700">
          By accessing and using Cropper, you accept and agree to be bound by the terms and provision of this agreement.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Use License</h3>
        <div className="space-y-4 text-gray-700">
          <p>
            Permission is granted to temporarily download one copy of Cropper for personal, non-commercial transitory viewing only.
          </p>
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <h4 className="font-medium text-red-900 mb-2">Prohibited Activities:</h4>
            <ul className="list-disc list-inside space-y-1 text-red-800">
              <li>Commercial use of the platform</li>
              <li>Reverse engineering or attempting to extract source code</li>
              <li>Using the platform for illegal purposes</li>
              <li>Sharing false or misleading agricultural information</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Disclaimer</h3>
        <p className="text-gray-700">
          The information on Cropper is provided on an "as is" basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Limitations</h3>
        <p className="text-gray-700">
          In no event shall Cropper or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Cropper.
        </p>
      </section>
    </div>
  );
}

function CookiePolicyContent() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">What Are Cookies</h3>
        <p className="text-gray-700">
          Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and allowing us to analyze how our site is used.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Types of Cookies We Use</h3>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-400 pl-4">
            <h4 className="font-medium text-gray-900">Essential Cookies</h4>
            <p className="text-gray-600">Required for the website to function properly.</p>
          </div>
          <div className="border-l-4 border-green-400 pl-4">
            <h4 className="font-medium text-gray-900">Performance Cookies</h4>
            <p className="text-gray-600">Help us understand how visitors interact with our website.</p>
          </div>
          <div className="border-l-4 border-yellow-400 pl-4">
            <h4 className="font-medium text-gray-900">Functional Cookies</h4>
            <p className="text-gray-600">Enable enhanced functionality and personalization.</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Managing Cookies</h3>
        <p className="text-gray-700">
          You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device and you can set most browsers to prevent them from being placed.
        </p>
      </section>
    </div>
  );
}

function DataProtectionContent() {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Encryption</h3>
        <p className="text-gray-700">
          All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Storage</h3>
        <p className="text-gray-700">
          Your data is stored on secure servers located in India. We maintain appropriate security measures to protect against unauthorized access.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Retention</h3>
        <p className="text-gray-700">
          We retain your personal data only as long as necessary to provide our services and fulfill the purposes outlined in our privacy policy.
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Third-Party Services</h3>
        <p className="text-gray-700">
          We may share your data with trusted third-party service providers who assist us in operating our platform, conducting business, or servicing users.
        </p>
      </section>
    </div>
  );
}