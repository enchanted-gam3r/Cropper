'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  Cloud,
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Thermometer,
  MapPin,
  AlertTriangle,
  TrendingUp,
  Eye,
  Gauge
} from 'lucide-react';

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

const mockWeatherData: WeatherData = {
  location: {
    name: 'Delhi',
    state: 'Delhi',
    district: 'Central Delhi',
    lat: 28.6139,
    lng: 77.2090
  },
  current: {
    temperature: 28,
    feelsLike: 30,
    humidity: 65,
    windSpeed: 12,
    windDirection: 'NW',
    pressure: 1012,
    visibility: 8,
    uvIndex: 6,
    condition: 'Partly Cloudy',
    icon: 'cloud-sun',
    lastUpdated: '2024-01-15T14:30:00Z'
  },
  forecast: [
    {
      date: '2024-01-15',
      dayName: 'Today',
      high: 32,
      low: 18,
      condition: 'Partly Cloudy',
      icon: 'cloud-sun',
      rainfall: 0,
      humidity: 60,
      windSpeed: 10
    },
    {
      date: '2024-01-16',
      dayName: 'Tomorrow',
      high: 31,
      low: 17,
      condition: 'Clear',
      icon: 'sun',
      rainfall: 0,
      humidity: 55,
      windSpeed: 8
    },
    {
      date: '2024-01-17',
      dayName: 'Wednesday',
      high: 29,
      low: 16,
      condition: 'Cloudy',
      icon: 'cloud',
      rainfall: 0,
      humidity: 70,
      windSpeed: 12
    },
    {
      date: '2024-01-18',
      dayName: 'Thursday',
      high: 27,
      low: 15,
      condition: 'Light Rain',
      icon: 'cloud-rain',
      rainfall: 2,
      humidity: 80,
      windSpeed: 15
    },
    {
      date: '2024-01-19',
      dayName: 'Friday',
      high: 26,
      low: 14,
      condition: 'Rain',
      icon: 'cloud-rain',
      rainfall: 8,
      humidity: 85,
      windSpeed: 18
    },
    {
      date: '2024-01-20',
      dayName: 'Saturday',
      high: 28,
      low: 16,
      condition: 'Partly Cloudy',
      icon: 'cloud-sun',
      rainfall: 1,
      humidity: 65,
      windSpeed: 10
    },
    {
      date: '2024-01-21',
      dayName: 'Sunday',
      high: 30,
      low: 17,
      condition: 'Clear',
      icon: 'sun',
      rainfall: 0,
      humidity: 50,
      windSpeed: 8
    }
  ],
  advisories: [
    {
      type: 'irrigation',
      title: 'Irrigation Recommended',
      description: 'Light rainfall expected on Thursday. Plan irrigation accordingly. Current soil moisture is moderate.',
      priority: 'medium',
      validUntil: '2024-01-18'
    },
    {
      type: 'fertilizer',
      title: 'Good Time for Fertilizer Application',
      description: 'Current weather conditions are favorable for nitrogen fertilizer application. Low wind speeds expected.',
      priority: 'high',
      validUntil: '2024-01-17'
    },
    {
      type: 'pest',
      title: 'Pest Alert',
      description: 'High humidity in the coming days may increase pest activity. Monitor crops regularly.',
      priority: 'medium',
      validUntil: '2024-01-20'
    }
  ]
};

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Puducherry'
];

export default function WeatherPage() {
  const t = useTranslations('weather');
  const commonT = useTranslations('common');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWeatherData(mockWeatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="h-6 w-6 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'light rain':
      case 'rain':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case 'partly cloudy':
      default:
        return <Cloud className="h-6 w-6 text-blue-400" />;
    }
  };

  const getAdvisoryIcon = (type: string) => {
    switch (type) {
      case 'irrigation':
        return <Droplets className="h-5 w-5 text-blue-600" />;
      case 'fertilizer':
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'pest':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'harvest':
        return <Sun className="h-5 w-5 text-yellow-600" />;
      case 'sowing':
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    // In a real app, this would trigger a new API call for the selected location
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedLocation('');
    // In a real app, this would load districts/cities for the selected state
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{commonT('loading')}</p>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Unable to load weather data</p>
          <button
            onClick={fetchWeatherData}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
          >
            {commonT('retry')}
          </button>
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
            Current weather and agricultural advisories for farmers
          </p>
        </div>

        {/* Location Selector */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center space-x-2 text-gray-700">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">Location:</span>
            </div>

            <div className="flex-1 flex flex-col md:flex-row gap-4">
              <select
                value={selectedState}
                onChange={(e) => handleStateChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select State</option>
                {indianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Enter city or district..."
                value={selectedLocation}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="text-sm text-gray-600">
              <strong>Current:</strong> {weatherData.location.name}, {weatherData.location.state}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Weather */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                {t('current')}
                <span className="ml-2 text-sm text-gray-500">
                  (Last updated: {new Date(weatherData.current.lastUpdated).toLocaleTimeString()})
                </span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main Weather Display */}
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-blue-100 rounded-full">
                    {getWeatherIcon(weatherData.current.condition)}
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      {weatherData.current.temperature}°C
                    </div>
                    <div className="text-gray-600">
                      {weatherData.current.condition}
                    </div>
                    <div className="text-sm text-gray-500">
                      Feels like {weatherData.current.feelsLike}°C
                    </div>
                  </div>
                </div>

                {/* Weather Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Humidity:</span>
                    <span className="font-medium">{weatherData.current.humidity}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wind className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Wind:</span>
                    <span className="font-medium">{weatherData.current.windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gauge className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-gray-600">Pressure:</span>
                    <span className="font-medium">{weatherData.current.pressure} hPa</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600">Visibility:</span>
                    <span className="font-medium">{weatherData.current.visibility} km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('forecast')}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {weatherData.forecast.map((day, index) => (
                  <div
                    key={index}
                    className={`text-center p-3 rounded-lg ${
                      index === 0 ? 'bg-primary-50 border-2 border-primary-200' : 'bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-900 mb-2">
                      {day.dayName}
                    </div>
                    <div className="flex justify-center mb-2">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div className="text-xs text-gray-600">
                      {day.low}° - {day.high}°
                    </div>
                    {day.rainfall > 0 && (
                      <div className="text-xs text-blue-600 mt-1">
                        💧 {day.rainfall}mm
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Agricultural Advisory */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('advisory')}
              </h2>

              <div className="space-y-4">
                {weatherData.advisories.map((advisory, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${getPriorityColor(advisory.priority)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getAdvisoryIcon(advisory.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm mb-1">
                          {advisory.title}
                        </h3>
                        <p className="text-xs opacity-90 leading-relaxed">
                          {advisory.description}
                        </p>
                        <p className="text-xs mt-2 opacity-75">
                          Valid until: {new Date(advisory.validUntil).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-sm text-blue-900 mb-2">
                  Quick Tips
                </h3>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• Avoid fertilizer application before rain</li>
                  <li>• Monitor soil moisture regularly</li>
                  <li>• Schedule farm activities based on weather</li>
                  <li>• Keep weather alerts enabled</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}