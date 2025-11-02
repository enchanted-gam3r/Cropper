import { NextRequest, NextResponse } from 'next/server';

interface WeatherData {
  location: {
    name: string;
    state: string;
    district: string;
    lat: number;
    lng: number;
  };
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    pressure: number;
    visibility: number;
    uvIndex: number;
    condition: string;
    icon: string;
    lastUpdated: string;
  };
  forecast: {
    date: string;
    dayName: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    rainfall: number;
    humidity: number;
    windSpeed: number;
  }[];
  advisories: {
    type: 'irrigation' | 'fertilizer' | 'pest' | 'harvest' | 'sowing';
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    validUntil: string;
  }[];
}

const generateMockWeatherData = (location?: string): WeatherData => {
  const locations = [
    { name: 'Delhi', state: 'Delhi', district: 'Central Delhi', lat: 28.6139, lng: 77.2090 },
    { name: 'Mumbai', state: 'Maharashtra', district: 'Mumbai', district: 'Mumbai City', lat: 19.0760, lng: 72.8777 },
    { name: 'Jaipur', state: 'Rajasthan', district: 'Jaipur', lat: 26.9124, lng: 75.7873 },
    { name: 'Ahmedabad', state: 'Gujarat', district: 'Ahmedabad', lat: 23.0225, lng: 72.5714 },
    { name: 'Lucknow', state: 'Uttar Pradesh', district: 'Lucknow', lat: 26.8467, lng: 80.9462 }
  ];

  const selectedLocation = locations.find(loc =>
    loc.name.toLowerCase().includes(location?.toLowerCase() || '') ||
    loc.state.toLowerCase().includes(location?.toLowerCase() || '')
  ) || locations[0];

  return {
    location: selectedLocation,
    current: {
      temperature: Math.floor(Math.random() * 15) + 20, // 20-35°C
      feelsLike: Math.floor(Math.random() * 15) + 22,
      humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
      pressure: Math.floor(Math.random() * 20) + 1000, // 1000-1020 hPa
      visibility: Math.floor(Math.random() * 5) + 5, // 5-10 km
      uvIndex: Math.floor(Math.random() * 8) + 1, // 1-9
      condition: ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
      icon: 'sun',
      lastUpdated: new Date().toISOString()
    },
    forecast: Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);

      return {
        date: date.toISOString().split('T')[0],
        dayName: index === 0 ? 'Today' : index === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { weekday: 'long' }),
        high: Math.floor(Math.random() * 10) + 25, // 25-35°C
        low: Math.floor(Math.random() * 10) + 15, // 15-25°C
        condition: ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
        icon: 'sun',
        rainfall: Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0, // 30% chance of rain
        humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
        windSpeed: Math.floor(Math.random() * 15) + 5 // 5-20 km/h
      };
    }),
    advisories: [
      {
        type: 'irrigation',
        title: 'Irrigation Recommended',
        description: 'Current soil moisture levels indicate need for irrigation in the next 2-3 days.',
        priority: 'medium',
        validUntil: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        type: 'fertilizer',
        title: 'Optimal Fertilizer Application',
        description: 'Weather conditions are favorable for nitrogen fertilizer application.',
        priority: 'high',
        validUntil: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        type: 'pest',
        title: 'Pest Alert',
        description: 'High humidity may increase pest activity. Monitor crops regularly.',
        priority: 'low',
        validUntil: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  };
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location') || 'Delhi';
    const forecastDays = Math.min(parseInt(searchParams.get('forecast_days') || '7'), 14); // Max 14 days

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const weatherData = generateMockWeatherData(location);

    // Limit forecast days if requested
    if (forecastDays < 7) {
      weatherData.forecast = weatherData.forecast.slice(0, forecastDays);
    }

    return NextResponse.json({
      success: true,
      data: weatherData,
      lastUpdated: new Date().toISOString(),
      source: 'India Meteorological Department (IMD)',
      cacheExpiry: new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
    });

  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch weather data',
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
      case 'location-search':
        // Handle location search
        const locations = [
          { name: 'Delhi', state: 'Delhi', lat: 28.6139, lng: 77.2090 },
          { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
          { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
          { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
          { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 }
        ];

        const filteredLocations = locations.filter(loc =>
          loc.name.toLowerCase().includes(data.query.toLowerCase()) ||
          loc.state.toLowerCase().includes(data.query.toLowerCase())
        );

        return NextResponse.json({
          success: true,
          locations: filteredLocations
        });

      case 'weather-alert':
        // Handle weather alert subscription
        return NextResponse.json({
          success: true,
          message: 'Weather alert subscription successful',
          alertId: Math.random().toString(36).substr(2, 9)
        });

      default:
        return NextResponse.json(
          { error: 'Invalid request type' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Weather POST error:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}