import { NextRequest, NextResponse } from 'next/server';

interface MarketPriceData {
  commodity: string;
  commodityHi: string;
  market: string;
  state: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

const mockMarketData: MarketPriceData[] = [
  {
    commodity: 'Wheat',
    commodityHi: 'गेहूं',
    market: 'Delhi Mandi',
    state: 'Delhi',
    district: 'Delhi',
    minPrice: 2200,
    maxPrice: 2450,
    modalPrice: 2325,
    change: 25,
    changePercent: 1.09,
    lastUpdated: new Date().toISOString()
  },
  {
    commodity: 'Rice',
    commodityHi: 'चावल',
    market: 'Mumbai Mandi',
    state: 'Maharashtra',
    district: 'Mumbai',
    minPrice: 3200,
    maxPrice: 3600,
    modalPrice: 3400,
    change: -50,
    changePercent: -1.45,
    lastUpdated: new Date().toISOString()
  },
  {
    commodity: 'Pulses',
    commodityHi: 'दालें',
    market: 'Jaipur Mandi',
    state: 'Rajasthan',
    district: 'Jaipur',
    minPrice: 4500,
    maxPrice: 5200,
    modalPrice: 4850,
    change: 0,
    changePercent: 0,
    lastUpdated: new Date().toISOString()
  },
  {
    commodity: 'Cotton',
    commodityHi: 'कपास',
    market: 'Ahmedabad Mandi',
    state: 'Gujarat',
    district: 'Ahmedabad',
    minPrice: 6800,
    maxPrice: 7500,
    modalPrice: 7150,
    change: 150,
    changePercent: 2.14,
    lastUpdated: new Date().toISOString()
  },
  {
    commodity: 'Sugarcane',
    commodityHi: 'गन्ना',
    market: 'Lucknow Mandi',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    minPrice: 320,
    maxPrice: 385,
    modalPrice: 350,
    change: 10,
    changePercent: 2.94,
    lastUpdated: new Date().toISOString()
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');
    const district = searchParams.get('district');
    const commodity = searchParams.get('commodity');
    const date = searchParams.get('date');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredData = [...mockMarketData];

    // Apply filters
    if (state && state !== 'all') {
      filteredData = filteredData.filter(item =>
        item.state.toLowerCase().includes(state.toLowerCase())
      );
    }

    if (district && district !== 'all') {
      filteredData = filteredData.filter(item =>
        item.district.toLowerCase().includes(district.toLowerCase())
      );
    }

    if (commodity && commodity !== 'all') {
      filteredData = filteredData.filter(item =>
        item.commodity.toLowerCase().includes(commodity.toLowerCase()) ||
        item.commodityHi.toLowerCase().includes(commodity.toLowerCase())
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredData,
      total: filteredData.length,
      lastUpdated: new Date().toISOString(),
      source: 'AGMARKNET, e-NAM'
    });

  } catch (error) {
    console.error('Market prices API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch market prices',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Handle price alert subscriptions or other POST requests
    const { type, data } = body;

    switch (type) {
      case 'price-alert':
        // Handle price alert subscription
        return NextResponse.json({
          success: true,
          message: 'Price alert subscription successful',
          alertId: Math.random().toString(36).substr(2, 9)
        });

      case 'price-comparison':
        // Handle price comparison requests
        return NextResponse.json({
          success: true,
          comparison: generatePriceComparison(data),
          generatedAt: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { error: 'Invalid request type' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Market prices POST error:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

function generatePriceComparison(data: any) {
  // Generate price comparison between different markets/commodities
  return {
    averagePrice: 3500,
    priceRange: { min: 2200, max: 7500 },
    trend: 'stable',
    recommendations: [
      'Current prices are favorable for selling',
      'Consider waiting for better prices in premium markets'
    ]
  };
}