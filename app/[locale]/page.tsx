import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  TrendingUp,
  Cloud,
  FileText,
  MessageCircle,
  ArrowRight,
  Sprout,
  Users,
  Shield
} from 'lucide-react';
import ChatInterface from '@/components/chatbot/ChatInterface';

export default function HomePage() {
  const t = useTranslations();

  const quickLinks = [
    {
      key: 'marketPrices',
      href: '/market-prices',
      icon: TrendingUp,
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    },
    {
      key: 'weather',
      href: '/weather',
      icon: Cloud,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      key: 'schemes',
      href: '/schemes',
      icon: FileText,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      key: 'chatbot',
      href: '#chatbot',
      icon: MessageCircle,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    }
  ];

  const features = [
    {
      icon: Sprout,
      title: t('home.features.expertAdvice'),
      description: t('home.features.expertAdviceDesc')
    },
    {
      icon: Users,
      title: t('home.features.multilingual'),
      description: t('home.features.multilingualDesc')
    },
    {
      icon: Shield,
      title: t('home.features.trusted'),
      description: t('home.features.trustedDesc')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              {t('home.subtitle')}
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              {t('home.tagline')}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.quickLinks.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('home.quickLinks.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.key}
                  href={link.href === '#chatbot' ? link.href : `/${link.key}`}
                  className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
                >
                  <div className="p-6">
                    <div className={`${link.color} ${link.hoverColor} w-16 h-16 rounded-lg flex items-center justify-center mb-4 text-white transition-colors duration-300`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t(`home.quickLinks.${link.key}`)}
                    </h3>
                    <div className="flex items-center text-primary-600 group-hover:text-primary-700 transition-colors duration-200">
                      <span className="text-sm font-medium">
                        {link.href === '#chatbot'
                          ? (t('home.quickLinks.chatbotAction') || 'Start Chatting')
                          : (t('home.quickLinks.action') || 'Learn More')
                        }
                      </span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.features.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('home.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                    <IconComponent className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chatbot Section */}
      <section id="chatbot" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('home.chatbot.title')}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('home.chatbot.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ChatInterface />
          </div>
        </div>
      </section>
    </div>
  );
}