'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Twitter,
  Youtube,
  Leaf
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const contactInfo = [
    {
      icon: Phone,
      label: 'Farmer Helpline',
      value: '1800-XXX-XXXX',
      sublabel: 'Available 24/7',
      href: 'tel:1800-XXX-XXXX'
    },
    {
      icon: Mail,
      label: 'Email Support',
      value: 'support@cropper.in',
      sublabel: 'Response within 24 hours',
      href: 'mailto:support@cropper.in'
    },
    {
      icon: MapPin,
      label: 'Head Office',
      value: 'New Delhi, India',
      sublabel: 'Monday - Friday, 9 AM - 6 PM',
      href: '#'
    }
  ];

  const officeLocations = [
    {
      city: 'New Delhi',
      address: '123 Agriculture Complex, Connaught Place',
      phone: '011-XXXX-XXXX',
      email: 'delhi@cropper.in'
    },
    {
      city: 'Mumbai',
      address: '456 Agri-Tech Park, Bandra Kurla Complex',
      phone: '022-XXXX-XXXX',
      email: 'mumbai@cropper.in'
    },
    {
      city: 'Bangalore',
      address: '789 Farm Innovation Center, Whitefield',
      phone: '080-XXXX-XXXX',
      email: 'bangalore@cropper.in'
    }
  ];

  const socialMedia = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
    { icon: MessageCircle, label: 'WhatsApp', href: '#' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-600 rounded-full">
                <MessageCircle className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're here to help you with any questions about our services, technical support, or partnership opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary-100 rounded-full">
                      <IconComponent className="h-8 w-8 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {contact.label}
                  </h3>
                  <a
                    href={contact.href}
                    className="text-xl text-primary-600 hover:text-primary-700 font-medium mb-1 block"
                  >
                    {contact.value}
                  </a>
                  <p className="text-gray-600">
                    {contact.sublabel}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Offices */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  Thank you for your message! We'll get back to you within 24 hours.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="technical">Technical Support</option>
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Please describe your inquiry in detail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </div>
                  )}
                </button>
              </form>
            </div>

            {/* Office Locations */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Our Office Locations
              </h2>

              <div className="space-y-6">
                {officeLocations.map((office, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {office.city}
                    </h3>
                    <div className="space-y-2 text-gray-600">
                      <p className="flex items-start">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 text-primary-600 flex-shrink-0" />
                        {office.address}
                      </p>
                      <p className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-primary-600 flex-shrink-0" />
                        {office.phone}
                      </p>
                      <p className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-primary-600 flex-shrink-0" />
                        {office.email}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Connect With Us
                </h3>
                <p className="text-gray-600 mb-4">
                  Follow us on social media for updates and farming tips.
                </p>
                <div className="flex space-x-4">
                  {socialMedia.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        className="bg-primary-100 hover:bg-primary-200 text-primary-600 p-3 rounded-lg transition-colors duration-200"
                        aria-label={social.label}
                      >
                        <IconComponent className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How quickly do you respond to support requests?
              </h3>
              <p className="text-gray-600">
                We aim to respond to all inquiries within 24 hours during business days. For urgent technical issues, our helpline is available 24/7.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you provide on-site support for farmers?
              </h3>
              <p className="text-gray-600">
                Currently, we provide remote support through our platform, phone, and email. We're expanding to include on-field support in select regions.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is Cropper free to use for farmers?
              </h3>
              <p className="text-gray-600">
                Yes, our basic services including market prices, weather information, and government schemes are completely free for farmers.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How accurate is your market price data?
              </h3>
              <p className="text-gray-600">
                Our market data is sourced directly from official government portals (AGMARKNET, e-NAM) and is updated daily from verified mandis.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}