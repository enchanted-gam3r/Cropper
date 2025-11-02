import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { message, language = 'en', context } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate response based on message content
    const response = generateAgriculturalResponse(message, language, context);

    return NextResponse.json({
      reply: response,
      suggestions: generateSuggestions(message, language),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateAgriculturalResponse(message: string, language: string, context?: any): string {
  const input = message.toLowerCase();

  // Agricultural topic detection and response generation
  if (input.includes('fertilizer') || input.includes('उर्वरक') || input.includes('खाद')) {
    return language === 'hi'
      ? 'अधिकांश फसलों के लिए, मैं मिट्टी की जांच परिणामों के आधार पर एनपीके उर्वरकों के साथ जैविक कंपोस्ट का उपयोग करने की अनुशंसा करता हूं। क्या आप अपनी फसल के लिए विशिष्ट अनुशंसाएं चाहेंगे?'
      : 'For most crops, I recommend using organic compost along with NPK fertilizers based on your soil test results. Would you like specific recommendations for your crop?';
  }

  if (input.includes('pest') || input.includes('disease') || input.includes('कीट') || input.includes('रोग')) {
    return language === 'hi'
      ? 'सामान्य कीट नियंत्रण विधियों में नीम तेल स्प्रे, फसल चक्र, और प्रतिरोधी किस्मों का उपयोग शामिल है। क्या आप बता सकते हैं कि आप किस फसल और कीट से निपट रहे हैं?'
      : 'Common pest control methods include neem oil spray, crop rotation, and using resistant varieties. Can you specify which crop and pest you\'re dealing with?';
  }

  if (input.includes('price') || input.includes('market') || input.includes('भाव') || input.includes('बाजार')) {
    return language === 'hi'
      ? 'आप हमारे बाजार मूल्य अनुभाग में विभिन्न फसलों के वर्तमान बाजार मूल्य देख सकते हैं। डेटा भारत भर के मंडियों से रोजाना अपडेट किया जाता है।'
      : 'You can check current market prices for various crops in our Market Prices section. The data is updated daily from mandis across India.';
  }

  if (input.includes('weather') || input.includes('मौसम') || input.includes('बारिश')) {
    return language === 'hi'
      ? 'हमारे मौसम अनुभाग में कृषि गतिविधियों के लिए विशिष्ट कृषि सलाह के साथ 7-दिन का पूर्वानुमान प्रदान किया गया है। आप विस्तृत जानकारी के लिए अपना स्थान चुन सकते हैं।'
      : 'Our weather section provides 7-day forecasts with agricultural advisories specific to farming activities. You can select your location for detailed information.';
  }

  if (input.includes('scheme') || input.includes('government') || input.includes('योजना') || input.includes('सरकार')) {
    return language === 'hi'
      ? 'हमारे पास किसानों के लिए विभिन्न सरकारी योजनाओं के बारे में जानकारी है, जिसमें पीएम किसान, फसल बीमा, और कृषि सब्सिडी शामिल हैं। विवरण के लिए हमारे योजना अनुभाग देखें।'
      : 'We have information about various government schemes for farmers including PM Kisan, crop insurance, and agricultural subsidies. Check our Schemes section for details.';
  }

  if (input.includes('irrigation') || input.includes('पानी') || input.includes('सिंचाई')) {
    return language === 'hi'
      ? 'जल संरक्षण और कुशल सिंचाई के लिए, ड्रिप सिंचाई, स्प्रिंकलर सिस्टम, और वर्षा जल संचयन जैसी आधुनिक तकनीकों पर विचार करें। फसल की जरूरतों के अनुसार सिंचाई का समय निर्धारित करें।'
      : 'For water conservation and efficient irrigation, consider modern techniques like drip irrigation, sprinkler systems, and rainwater harvesting. Schedule irrigation based on crop needs and weather conditions.';
  }

  if (input.includes('seed') || input.includes('बीज') || input.includes('बीजारोपण')) {
    return language === 'hi'
      ? 'अच्छी गुणवत्ता वाले प्रमाणित बीजों का उपयोग करें। बीज उपचार करें और मिट्टी के तापमान और नमी के अनुसार बोई का समय चुनें। फसल चक्र का पालन करें।'
      : 'Use quality certified seeds. Treat seeds before planting and choose sowing time based on soil temperature and moisture. Follow crop rotation practices for better soil health.';
  }

  // Default response
  return language === 'hi'
    ? 'मैं खेती के प्रश्नों में आपकी मदद करने के लिए यहां हूं। आप फसल प्रबंधन, कीट नियंत्रण, उर्वरक, बाजार मूल्य, मौसम पूर्वानुमान, या सरकारी योजनाओं के बारे में पूछ सकते हैं। आप क्या जानना चाहेंगे?'
    : 'I\'m here to help with farming questions. You can ask me about crop management, pest control, fertilizers, market prices, weather forecasts, or government schemes. What specific information would you like?';
}

function generateSuggestions(message: string, language: string): string[] {
  const baseSuggestions = language === 'hi' ? [
    'मिट्टी की जांच कैसे करें?',
    'फसल बीमा योजनाएं',
    'जैविक खेती के तरीके',
    'सिंचाई के आधुनिक तरीके',
    'कृषि यंत्रों पर सब्सिडी'
  ] : [
    'How to test soil quality?',
    'Crop insurance schemes',
    'Organic farming methods',
    'Modern irrigation techniques',
    'Subsidy on agricultural equipment'
  ];

  // Customize suggestions based on message context
  if (message.toLowerCase().includes('organic') || message.includes('जैविक')) {
    return language === 'hi' ? [
      'जैविक उर्वरक बनाने के तरीके',
      'जैविक कीट नियंत्रण',
      'जैविक प्रमाणन प्रक्रिया',
      'जैविक खेती में सरकारी सहायता'
    ] : [
      'How to make organic fertilizers?',
      'Organic pest control methods',
      'Organic certification process',
      'Government support for organic farming'
    ];
  }

  return baseSuggestions;
}