import { NextRequest, NextResponse } from 'next/server';

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
  priority: 'high' | 'medium' | 'low';
  targetFarmers: string[];
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
    priority: 'high',
    targetFarmers: ['small', 'marginal']
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
    priority: 'high',
    targetFarmers: ['all']
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
    priority: 'medium',
    targetFarmers: ['all']
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const state = searchParams.get('state');
    const language = searchParams.get('language') || 'en';

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));

    let filteredSchemes = [...mockSchemes];

    // Apply category filter
    if (category && category !== 'all') {
      filteredSchemes = filteredSchemes.filter(scheme => scheme.category === category);
    }

    // Apply state filter (in real implementation, this would check state-specific schemes)
    if (state && state !== 'all') {
      filteredSchemes = filteredSchemes.filter(scheme => {
        // In real implementation, check if scheme is available in the specified state
        return scheme.status === 'active';
      });
    }

    // Add language-specific content
    const schemesWithLanguage = filteredSchemes.map(scheme => ({
      ...scheme,
      title: language === 'hi' ? scheme.titleHi : scheme.title,
      description: language === 'hi' ? scheme.descriptionHi : scheme.description,
      benefits: language === 'hi' ? scheme.benefitsHi : scheme.benefits,
      eligibility: language === 'hi' ? scheme.eligibilityHi : scheme.eligibility
    }));

    return NextResponse.json({
      success: true,
      data: schemesWithLanguage,
      total: schemesWithLanguage.length,
      lastUpdated: new Date().toISOString(),
      source: 'Ministry of Agriculture & Farmers Welfare, MyScheme.gov.in'
    });

  } catch (error) {
    console.error('Schemes API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch schemes data',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    switch (type) {
      case 'eligibility-check':
        // Handle eligibility checking
        const eligibleSchemes = checkEligibility(data);
        return NextResponse.json({
          success: true,
          eligibleSchemes,
          checkedAt: new Date().toISOString(),
          profileId: Math.random().toString(36).substr(2, 9)
        });

      case 'scheme-application':
        // Handle scheme application submission
        return NextResponse.json({
          success: true,
          applicationId: Math.random().toString(36).substr(2, 9),
          message: 'Application submitted successfully',
          nextSteps: [
            'Verification of documents will take 7-10 working days',
            'You will receive updates on your registered mobile number',
            'Track application status using the application ID'
          ]
        });

      case 'scheme-compare':
        // Handle scheme comparison
        return NextResponse.json({
          success: true,
          comparison: generateSchemeComparison(data.schemes),
          generatedAt: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { error: 'Invalid request type' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Schemes POST error:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

function checkEligibility(profileData: any) {
  // Simple eligibility checking logic
  const { landHolding, farmingType, cropsGrown, irrigationSource, state } = profileData;

  return mockSchemes.filter(scheme => {
    // PM Kisan eligibility
    if (scheme.id === 'pm-kisan') {
      const smallLandHolding = landHolding === 'Less than 1 hectare' || landHolding === '1-2 hectares';
      return smallLandHolding;
    }

    // Soil Health Card - all farmers eligible
    if (scheme.id === 'soil-health') {
      return landHolding !== 'No land';
    }

    // PMFBY - all farmers with land eligible
    if (scheme.id === 'pm-fby') {
      return landHolding !== 'No land';
    }

    return true;
  }).map(scheme => ({
    ...scheme,
    matchScore: calculateMatchScore(scheme, profileData)
  })).sort((a, b) => b.matchScore - a.matchScore);
}

function calculateMatchScore(scheme: GovernmentScheme, profile: any): number {
  // Simple scoring algorithm (1-100)
  let score = 50; // Base score

  // Add points based on profile matching
  if (scheme.targetFarmers.includes('small') && profile.landHolding === 'Less than 1 hectare') {
    score += 30;
  }

  if (scheme.targetFarmers.includes('marginal') && profile.landHolding === '1-2 hectares') {
    score += 25;
  }

  if (scheme.priority === 'high') {
    score += 10;
  }

  return Math.min(score, 100);
}

function generateSchemeComparison(schemeIds: string[]) {
  const schemesToCompare = mockSchemes.filter(scheme => schemeIds.includes(scheme.id));

  return {
    schemes: schemesToCompare,
    recommendations: [
      'PM Kisan offers immediate financial assistance',
      'PMFBY provides comprehensive crop insurance',
      'Soil Health Card helps optimize fertilizer use'
    ],
    totalBenefits: schemesToCompare.length * 5000, // Estimated value
    applicationComplexity: {
      'pm-kisan': 'Low',
      'pm-fby': 'Medium',
      'soil-health': 'Low'
    }
  };
}