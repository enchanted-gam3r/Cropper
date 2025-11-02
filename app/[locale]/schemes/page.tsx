'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  FileText,
  DollarSign,
  Shield,
  Users,
  CheckCircle,
  Clock,
  ExternalLink,
  Search,
  Filter,
  AlertCircle,
  TrendingUp,
  GraduationCap,
  Wrench,
  Leaf
} from 'lucide-react';

interface GovernmentScheme {
  id: string;
  title: string;
  titleHi: string;
  category: 'financial' | 'insurance' | 'infrastructure' | 'education' | 'sustainable' | 'technology';
  description: string;
  descriptionHi: string;
  benefits: string;
  benefitsHi: string;
  eligibility: string[];
  eligibilityHi: string[];
  applicationDeadline: string;
  status: 'active' | 'upcoming' | 'closed';
  applicationLink: string;
  ministry: string;
  amount?: string;
  documents: string[];
  icon: React.ElementType;
}

interface EligibilityQuestion {
  id: string;
  question: string;
  questionHi: string;
  type: 'select' | 'number' | 'multiselect';
  options?: string[];
  optionsHi?: string[];
  key: string;
}

const mockSchemes: GovernmentScheme[] = [
  {
    id: 'pm-kisan',
    title: 'PM Kisan Samman Nidhi',
    titleHi: 'पीएम किसान सम्मान निधि',
    category: 'financial',
    description: 'Direct income support scheme for small and marginal farmers',
    descriptionHi: 'छोटे और सीमांत किसानों के लिए प्रत्यक्ष आय सहायता योजना',
    benefits: '₹6,000 per year in three equal installments',
    benefitsHi: 'प्रति वर्ष ₹6,000 तीन समान किश्तों में',
    eligibility: [
      'Small and marginal farmers',
      'Land holding up to 2 hectares',
      'Valid Aadhaar card linked to bank account',
      'Not applicable for income tax payees'
    ],
    eligibilityHi: [
      'छोटे और सीमांत किसान',
      '2 हेक्टेयर तक की भूमि धारण',
      'बैंक खाते से लिंक वैध आधार कार्ड',
      'आयकर भुगतानकर्ताओं पर लागू नहीं'
    ],
    applicationDeadline: 'Open throughout the year',
    status: 'active',
    applicationLink: 'https://pmkisan.gov.in/',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    amount: '₹6,000 annually',
    documents: ['Aadhaar Card', 'Bank Account Details', 'Land Records'],
    icon: DollarSign
  },
  {
    id: 'pm-fby',
    title: 'Pradhan Mantri Fasal Bima Yojana',
    titleHi: 'प्रधानमंत्री फसल बीमा योजना',
    category: 'insurance',
    description: 'Crop insurance scheme to protect farmers against crop losses',
    descriptionHi: 'फसल हानि के खिलाफ किसानों की रक्षा के लिए फसल बीमा योजना',
    benefits: 'Insurance coverage for crop losses due to natural calamities',
    benefitsHi: 'प्राकृतिक आपदाओं के कारण फसल हानि के लिए बीमा कवर',
    eligibility: [
      'All farmers including sharecroppers',
      'Must have insurable interest in crops',
      'Required for loanee farmers',
      'Voluntary for non-loanee farmers'
    ],
    eligibilityHi: [
      'सभी किसान जिनमें साझेदार किसान भी शामिल हैं',
      'फसलों में बीमायोग्य हित होना चाहिए',
      'ऋणदार किसानों के लिए अनिवार्य',
      'गैर-ऋणदार किसानों के लिए स्वैच्छिक'
    ],
    applicationDeadline: 'Varies by crop season',
    status: 'active',
    applicationLink: 'https://pmfby.gov.in/',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    amount: 'Up to 100% of crop cost',
    documents: ['Land Records', 'Aadhaar Card', 'Bank Details', 'Crop Details'],
    icon: Shield
  },
  {
    id: 'soil-health',
    title: 'Soil Health Card Scheme',
    titleHi: 'स्वास्थ्य कार्ड योजना',
    category: 'sustainable',
    description: 'Provides soil health cards to farmers for balanced fertilizer use',
    descriptionHi: 'संतुलित उर्वरक उपयोग के लिए किसानों को मृदा स्वास्थ्य कार्ड प्रदान करता है',
    benefits: 'Free soil testing and fertilizer recommendations',
    benefitsHi: 'मुफ्त मृदा परीक्षण और उर्वरक सिफारिशें',
    eligibility: [
      'All farmers',
      'Land ownership proof required',
      'Sample collection from agricultural land'
    ],
    eligibilityHi: [
      'सभी किसान',
      'भूमि स्वामित्व प्रमाण आवश्यक',
      'कृषि भूमि से नमूना संग्रह'
    ],
    applicationDeadline: 'Throughout the year',
    status: 'active',
    applicationLink: 'https://soilhealth.gov.in/',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    amount: 'Free service',
    documents: ['Land Records', 'Identity Proof'],
    icon: Leaf
  },
  {
    id: 'pm-kusum',
    title: 'PM KUSUM Scheme',
    titleHi: 'पीएम कुसुम योजना',
    category: 'technology',
    description: 'Promotes installation of solar pumps and grid-connected solar power plants',
    descriptionHi: 'सोलर पंप और ग्रिड-कनेक्टेड सोलर पावर प्लांट की स्थापना को बढ़ावा देता है',
    benefits: 'Financial assistance for solar agricultural pumps',
    benefitsHi: 'सौर कृषि पंपों के लिए वित्तीय सहायता',
    eligibility: [
      'Farmers with cultivable land',
      'Priority to areas with poor electricity supply',
      'Grid-connected solar power plants for farmers'
    ],
    eligibilityHi: [
      'खेती योग्य भूमि वाले किसान',
      'खराब बिजली आपूर्ति वाले क्षेत्रों को प्राथमिकता',
      'किसानों के लिए ग्रिड-कनेक्टेड सौर पावर प्लांट'
    ],
    applicationDeadline: '2025-03-31',
    status: 'active',
    applicationLink: 'https://mnre.gov.in/kusum',
    ministry: 'Ministry of New and Renewable Energy',
    amount: 'Up to 30-90% subsidy',
    documents: ['Land Records', 'Aadhaar Card', 'Bank Details', 'Electricity Bill'],
    icon: Wrench
  }
];

const eligibilityQuestions: EligibilityQuestion[] = [
  {
    id: 'land-holding',
    question: 'What is your land holding size?',
    questionHi: 'आपकी भूमि धारण का आकार क्या है?',
    type: 'select',
    options: ['No land', 'Less than 1 hectare', '1-2 hectares', '2-5 hectares', 'More than 5 hectares'],
    optionsHi: ['कोई भूमि नहीं', '1 हेक्टेयर से कम', '1-2 हेक्टेयर', '2-5 हेक्टेयर', '5 हेक्टेयर से अधिक'],
    key: 'landHolding'
  },
  {
    id: 'farming-type',
    question: 'What type of farming do you practice?',
    questionHi: 'आप किस प्रकार की खेती करते हैं?',
    type: 'select',
    options: ['Organic farming', 'Conventional farming', 'Mixed farming', 'Other'],
    optionsHi: ['जैविक खेती', 'पारंपरिक खेती', 'मिश्रित खेती', 'अन्य'],
    key: 'farmingType'
  },
  {
    id: 'crops-grown',
    question: 'Which crops do you primarily grow?',
    questionHi: 'आप मुख्य रूप से कौन सी फसलें उगाते हैं?',
    type: 'multiselect',
    options: ['Rice', 'Wheat', 'Pulses', 'Oilseeds', 'Horticulture', 'Other'],
    optionsHi: ['चावल', 'गेहूं', 'दालें', 'तिलहन', 'बागवानी', 'अन्य'],
    key: 'cropsGrown'
  },
  {
    id: 'irrigation-source',
    question: 'What is your primary irrigation source?',
    questionHi: 'आपका प्राथमिक सिंचाई स्रोत क्या है?',
    type: 'select',
    options: ['Canal irrigation', 'Well/Tubewell', 'Rain-fed', 'Drip irrigation'],
    optionsHi: ['नहर सिंचाई', 'कुआं/ट्यूबवेल', 'बारिश पर निर्भर', 'ड्रिप सिंचाई'],
    key: 'irrigationSource'
  }
];

export default function SchemesPage() {
  const t = useTranslations('schemes');
  const commonT = useTranslations('common');
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [filteredSchemes, setFilteredSchemes] = useState<GovernmentScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showEligibilityChecker, setShowEligibilityChecker] = useState(false);
  const [eligibilityAnswers, setEligibilityAnswers] = useState<Record<string, string>>({});
  const [recommendedSchemes, setRecommendedSchemes] = useState<GovernmentScheme[]>([]);

  const categories = [
    { key: 'all', label: 'All Schemes', icon: FileText },
    { key: 'financial', label: 'Financial Assistance', icon: DollarSign },
    { key: 'insurance', label: 'Crop Insurance', icon: Shield },
    { key: 'infrastructure', label: 'Infrastructure', icon: Wrench },
    { key: 'education', label: 'Training & Education', icon: GraduationCap },
    { key: 'sustainable', label: 'Sustainable Agriculture', icon: Leaf },
    { key: 'technology', label: 'Technology Adoption', icon: TrendingUp }
  ];

  useEffect(() => {
    fetchSchemes();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [schemes, searchTerm, selectedCategory]);

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSchemes(mockSchemes);
    } catch (error) {
      console.error('Error fetching schemes:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...schemes];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(scheme => scheme.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(scheme =>
        scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.ministry.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSchemes(filtered);
  };

  const handleEligibilityAnswer = (questionId: string, answer: string) => {
    setEligibilityAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const analyzeEligibility = () => {
    // Simple eligibility analysis logic
    const eligible = schemes.filter(scheme => {
      // PM Kisan eligibility
      if (scheme.id === 'pm-kisan') {
        const landSize = eligibilityAnswers['land-holding'];
        return landSize === 'Less than 1 hectare' || landSize === '1-2 hectares';
      }

      // Soil Health Card - all farmers eligible
      if (scheme.id === 'soil-health') {
        return eligibilityAnswers['land-holding'] !== 'No land';
      }

      // PM KUSUM - farmers with land
      if (scheme.id === 'pm-kusum') {
        return eligibilityAnswers['land-holding'] !== 'No land';
      }

      // PMFBY - all farmers with land eligible
      if (scheme.id === 'pm-fby') {
        return eligibilityAnswers['land-holding'] !== 'No land';
      }

      return true;
    });

    setRecommendedSchemes(eligible);
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.key === category);
    return categoryData ? categoryData.icon : FileText;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (showEligibilityChecker) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {t('eligibility')} - Quick Assessment
            </h2>

            <div className="space-y-6">
              {eligibilityQuestions.map((question, index) => (
                <div key={question.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-primary-100 text-primary-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <h3 className="text-lg font-medium text-gray-900">
                      {question.question}
                    </h3>
                  </div>

                  {question.type === 'select' && (
                    <select
                      value={eligibilityAnswers[question.id] || ''}
                      onChange={(e) => handleEligibilityAnswer(question.id, e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select an option</option>
                      {question.options?.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}

                  {question.type === 'multiselect' && (
                    <div className="space-y-2">
                      {question.options?.map(option => (
                        <label key={option} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value={option}
                            checked={eligibilityAnswers[question.id]?.includes(option) || false}
                            onChange={(e) => {
                              const current = eligibilityAnswers[question.id] || '';
                              const selected = current ? current.split(',') : [];
                              if (e.target.checked) {
                                handleEligibilityAnswer(question.id, [...selected, option].join(','));
                              } else {
                                handleEligibilityAnswer(question.id, selected.filter(item => item !== option).join(','));
                              }
                            }}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setShowEligibilityChecker(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {commonT('cancel')}
              </button>
              <button
                onClick={() => {
                  analyzeEligibility();
                  setShowEligibilityChecker(false);
                }}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                {t('analyze')} & Show Results
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>

        {/* Hero Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => setShowEligibilityChecker(true)}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <CheckCircle className="h-5 w-5 inline mr-2" />
              {t('eligibility')}
            </button>

            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Recommended Schemes */}
        {recommendedSchemes.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-green-900 mb-4">
              <CheckCircle className="h-5 w-5 inline mr-2" />
              Recommended Schemes Based on Your Profile
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedSchemes.map(scheme => (
                <div key={scheme.id} className="bg-white rounded-lg p-4 border border-green-300">
                  <h4 className="font-medium text-green-900">{scheme.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{scheme.description}</p>
                  <span className="inline-block mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Match Score: High
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    selectedCategory === category.key
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Schemes Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">{commonT('loading')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSchemes.map(scheme => {
              const IconComponent = scheme.icon;
              return (
                <div key={scheme.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-primary-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary-600" />
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(scheme.status)}`}>
                        {scheme.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {scheme.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4">
                      {scheme.description}
                    </p>

                    <div className="space-y-3">
                      {scheme.amount && (
                        <div className="flex items-center text-sm">
                          <DollarSign className="h-4 w-4 text-green-600 mr-2" />
                          <span className="font-medium">{scheme.amount}</span>
                        </div>
                      )}

                      <div className="text-sm text-gray-600">
                        <strong>Deadline:</strong> {scheme.applicationDeadline}
                      </div>

                      <div className="text-sm text-gray-600">
                        <strong>Ministry:</strong> {scheme.ministry}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <a
                        href={scheme.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        {t('apply')}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {filteredSchemes.length === 0 && !loading && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No schemes found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find more schemes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}