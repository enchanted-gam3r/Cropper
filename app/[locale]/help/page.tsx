'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Book,
  MessageCircle,
  Search,
  ChevronDown,
  ChevronUp,
  Video,
  FileText,
  Download,
  Play,
  Users,
  Shield,
  Settings,
  Smartphone
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  questionHi: string;
  answer: string;
  answerHi: string;
  category: string;
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How do I use the AI chatbot?',
    questionHi: 'मैं AI चैटबॉट का उपयोग कैसे करूं?',
    answer: 'Simply type your question in English or Hindi, or click the microphone button to speak your question. The AI will provide instant answers about farming, crops, weather, and government schemes.',
    answerHi: 'अंग्रेजी या हिंदी में अपना प्रश्न टाइप करें, या अपना प्रश्न बोलने के लिए माइक्रोफोन बटन पर क्लिक करें। AI खेती, फसलों, मौसम और सरकारी योजनाओं के बारे में तुरंत उत्तर देगा।',
    category: 'Chatbot'
  },
  {
    id: '2',
    question: 'How accurate are the market prices?',
    questionHi: 'बाजार मूल्य कितने सटीक हैं?',
    answer: 'Our market prices are updated daily from official government sources like AGMARKNET and e-NAM. Data is collected from verified mandis across India and is typically accurate within 2-3%.',
    answerHi: 'हमारे बाजार मूल्य AGMARKNET और e-NAM जैसे आधिकारिक सरकारी स्रोतों से रोजाना अपडेट किए जाते हैं। डेटा भारत भर के सत्यापित मंडियों से एकत्र किया जाता है और आमतौर पर 2-3% के भीतर सटीक होता है।',
    category: 'Market Prices'
  },
  {
    id: '3',
    question: 'Can I access Cropper without internet?',
    questionHi: 'क्या मैं बिना इंटरनेट के Cropper तक पहुंच सकता हूं?',
    answer: 'Basic features like saved market prices and weather forecasts can work offline once loaded. However, real-time data and AI chatbot require an internet connection.',
    answerHi: 'एक बार लोड होने के बाद, सहेजे गए बाजार मूल्य और मौसम पूर्वानुमान जैसी बुनियादी सुविधाएं ऑफलाइन काम कर सकती हैं। हालांकि, रीयल-टाइम डेटा और AI चैटबॉट के लिए इंटरनेट कनेक्शन आवश्यक है।',
    category: 'General'
  }
];

const tutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Getting Started with Cropper',
    description: 'Learn the basics of using Cropper for your farming needs',
    duration: '5:30',
    thumbnail: '/images/tutorial-1.jpg',
    videoUrl: '#'
  },
  {
    id: '2',
    title: 'Understanding Market Prices',
    description: 'How to interpret and use market price data effectively',
    duration: '7:15',
    thumbnail: '/images/tutorial-2.jpg',
    videoUrl: '#'
  },
  {
    id: '3',
    title: 'Weather Forecast for Farming',
    description: 'Using weather data to plan your farming activities',
    duration: '6:45',
    thumbnail: '/images/tutorial-3.jpg',
    videoUrl: '#'
  },
  {
    id: '4',
    title: 'Government Schemes Guide',
    description: 'Complete guide to finding and applying for agricultural schemes',
    duration: '8:20',
    thumbnail: '/images/tutorial-4.jpg',
    videoUrl: '#'
  }
];

const categories = ['All', 'Chatbot', 'Market Prices', 'Weather', 'Schemes', 'General'];

export default function HelpPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = searchTerm === '' ||
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const helpSections = [
    {
      icon: Book,
      title: 'User Guides',
      description: 'Detailed documentation for all features',
      items: ['Getting Started Guide', 'Market Price Analysis', 'Weather Tools', 'Scheme Applications']
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      items: ['Platform Overview', 'Advanced Features', 'Mobile App Usage', 'Success Stories']
    },
    {
      icon: MessageCircle,
      title: 'Support Channels',
      description: 'Multiple ways to get help',
      items: ['24/7 Helpline', 'Email Support', 'Community Forum', 'Live Chat']
    },
    {
      icon: FileText,
      title: 'Resources',
      description: 'Downloadable materials',
      items: ['PDF Guides', 'Crop Calendars', 'Weather Charts', 'Scheme Documents']
    }
  ];

  const quickActions = [
    {
      icon: Users,
      title: 'Community Forum',
      description: 'Connect with other farmers',
      action: 'Join Community'
    },
    {
      icon: Shield,
      title: 'Report an Issue',
      description: 'Having technical problems?',
      action: 'Report Issue'
    },
    {
      icon: Settings,
      title: 'Account Settings',
      description: 'Manage your preferences',
      action: 'Go to Settings'
    },
    {
      icon: Smartphone,
      title: 'Mobile App',
      description: 'Download our mobile app',
      action: 'Get App'
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
                <Book className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Help Center
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Find answers, learn new features, and get the most out of Cropper for your farming success.
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for help articles, FAQs, and tutorials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary-100 rounded-full">
                      <IconComponent className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    {action.description}
                  </p>
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm transition-colors duration-200">
                    {action.action}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Help Sections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {helpSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 bg-primary-100 rounded-full">
                      <IconComponent className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 cursor-pointer">
                        <ChevronDown className="h-4 w-4" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Video Tutorials
            </h2>
            <p className="text-lg text-gray-600">
              Learn how to use Cropper with our step-by-step video guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tutorials.map((tutorial) => (
              <div key={tutorial.id} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <div className="relative">
                  <div className="aspect-video bg-gray-300 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white bg-black bg-opacity-50 rounded-full p-3" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                    {tutorial.duration}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {tutorial.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {tutorial.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Quick answers to common questions about Cropper
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-md">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-4 text-gray-600 border-t border-gray-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Our support team is here to assist you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1800-XXX-XXXX"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Call Helpline
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              Email Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}