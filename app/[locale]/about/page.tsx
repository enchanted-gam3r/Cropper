'use client';

import { useTranslations } from 'next-intl';
import { Leaf, Users, Award, Shield, Target, Globe, Heart } from 'lucide-react';

export default function AboutPage() {
  const t = useTranslations('navigation');
  const commonT = useTranslations('common');

  const values = [
    {
      icon: Heart,
      title: 'Farmer-First Approach',
      description: 'Every feature is designed with the needs of Indian farmers at the forefront.'
    },
    {
      icon: Shield,
      title: 'Trusted Information',
      description: 'Reliable data from government sources and verified agricultural experts.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built with input from farming communities across India.'
    },
    {
      icon: Globe,
      title: 'Accessible to All',
      description: 'Available in multiple languages and designed for rural connectivity.'
    }
  ];

  const stats = [
    { number: '10+', label: 'Indian Languages Supported' },
    { number: '2000+', label: 'Mandis Covered' },
    { number: '50+', label: 'Government Schemes' },
    { number: '24/7', label: 'AI Assistant Available' }
  ];

  const team = [
    {
      name: 'Agricultural Experts',
      role: '30+ years combined experience',
      description: 'Team of agronomists, soil scientists, and farming experts'
    },
    {
      name: 'Technology Partners',
      role: 'Building digital solutions',
      description: 'Skilled developers and designers focused on rural India'
    },
    {
      name: 'Government Liaison',
      role: 'Policy and scheme specialists',
      description: 'Experts in agricultural policies and welfare programs'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-600 rounded-full">
                <Leaf className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About Cropper
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Empowering Indian farmers with AI-powered agricultural assistance, real-time market data, weather forecasts, and government scheme information.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To democratize access to agricultural information and technology for every farmer in India. We bridge the information gap between traditional farming practices and modern agricultural science, helping farmers make informed decisions that increase productivity and profitability.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary-100 rounded-full">
                      <IconComponent className="h-8 w-8 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600">
              Comprehensive tools and information for modern farming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="p-3 bg-green-100 rounded-full inline-block mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI Farming Assistant
              </h3>
              <p className="text-gray-600">
                24/7 multilingual chatbot providing expert advice on farming practices, pest control, and crop management.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="p-3 bg-blue-100 rounded-full inline-block mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-time Market Prices
              </h3>
              <p className="text-gray-600">
                Daily updated prices from 2000+ mandis across India, helping farmers get the best value for their produce.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="p-3 bg-yellow-100 rounded-full inline-block mb-4">
                <Shield className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Weather & Advisory
              </h3>
              <p className="text-gray-600">
                District-level weather forecasts with personalized agricultural recommendations for optimal farming decisions.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="p-3 bg-purple-100 rounded-full inline-block mb-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Government Schemes
              </h3>
              <p className="text-gray-600">
                Complete information on agricultural schemes with eligibility checking and application guidance.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="p-3 bg-red-100 rounded-full inline-block mb-4">
                <Globe className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Multilingual Support
              </h3>
              <p className="text-gray-600">
                Available in multiple Indian languages including Hindi, with voice input support for accessibility.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="p-3 bg-indigo-100 rounded-full inline-block mb-4">
                <Leaf className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sustainable Farming
              </h3>
              <p className="text-gray-600">
                Promoting environmentally friendly farming practices and organic agriculture techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Behind Cropper</h2>
            <p className="text-lg text-gray-600">
              Dedicated team committed to empowering farmers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2">
                  {member.role}
                </p>
                <p className="text-gray-600">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Us in Empowering Farmers
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Whether you're a farmer, agricultural expert, or technology enthusiast, together we can build a stronger future for Indian agriculture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Us
            </a>
            <a
              href="/help"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}