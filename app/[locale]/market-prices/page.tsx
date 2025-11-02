'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { TrendingUp, TrendingDown, Minus, Search, Filter, Calendar } from 'lucide-react';

interface MarketPrice {
  id: string;
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

interface FilterState {
  state: string;
  district: string;
  commodity: string;
}

const mockData: MarketPrice[] = [
  {
    id: '1',
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
    lastUpdated: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
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
    lastUpdated: '2024-01-15T11:00:00Z'
  },
  {
    id: '3',
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
    lastUpdated: '2024-01-15T09:45:00Z'
  },
  {
    id: '4',
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
    lastUpdated: '2024-01-15T10:15:00Z'
  },
  {
    id: '5',
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
    lastUpdated: '2024-01-15T11:30:00Z'
  }
];

const states = [
  'All States',
  'Delhi',
  'Maharashtra',
  'Rajasthan',
  'Gujarat',
  'Uttar Pradesh',
  'Punjab',
  'Haryana',
  'Madhya Pradesh',
  'Karnataka'
];

const commodities = [
  'All Commodities',
  'Wheat',
  'Rice',
  'Pulses',
  'Cotton',
  'Sugarcane',
  'Maize',
  'Soybean',
  'Groundnut',
  'Mustard'
];

export default function MarketPricesPage() {
  const t = useTranslations('marketPrices');
  const commonT = useTranslations('common');
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [filteredPrices, setFilteredPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    state: 'All States',
    district: '',
    commodity: 'All Commodities'
  });

  useEffect(() => {
    fetchMarketPrices();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [prices, filters, searchTerm]);

  const fetchMarketPrices = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPrices(mockData);
    } catch (error) {
      console.error('Error fetching market prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...prices];

    // Apply commodity filter
    if (filters.commodity !== 'All Commodities') {
      filtered = filtered.filter(price =>
        price.commodity.toLowerCase() === filters.commodity.toLowerCase()
      );
    }

    // Apply state filter
    if (filters.state !== 'All States') {
      filtered = filtered.filter(price =>
        price.state.toLowerCase() === filters.state.toLowerCase()
      );
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(price =>
        price.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        price.market.toLowerCase().includes(searchTerm.toLowerCase()) ||
        price.state.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPrices(filtered);
  };

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString('en-IN')}/quintal`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriceChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const getPriceChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-600';
  };

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

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={`${commonT.search')} commodity or market...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* State Filter */}
            <div className="lg:w-48">
              <select
                value={filters.state}
                onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            {/* Commodity Filter */}
            <div className="lg:w-48">
              <select
                value={filters.commodity}
                onChange={(e) => setFilters({ ...filters, commodity: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select Commodity</option>
                {commodities.map(commodity => (
                  <option key={commodity} value={commodity}>{commodity}</option>
                ))}
              </select>
            </div>

            {/* Last Updated */}
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-2" />
              Last updated: Today 11:30 AM
            </div>
          </div>
        </div>

        {/* Price Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('priceTable.commodity')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('priceTable.market')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('priceTable.minPrice')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('priceTable.maxPrice')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('priceTable.modalPrice')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('priceTable.change')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('priceTable.lastUpdated')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                      </div>
                      <p className="mt-2 text-gray-500">{commonT('loading')}</p>
                    </td>
                  </tr>
                ) : filteredPrices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No market prices found for the selected criteria.
                    </td>
                  </tr>
                ) : (
                  filteredPrices.map((price) => (
                    <tr key={price.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {price.commodity}
                          </div>
                          <div className="text-sm text-gray-500">
                            {price.commodityHi}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div>{price.market}</div>
                          <div className="text-xs text-gray-500">{price.district}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(price.minPrice)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatPrice(price.maxPrice)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatPrice(price.modalPrice)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center space-x-1 ${getPriceChangeColor(price.change)}`}>
                          {getPriceChangeIcon(price.change)}
                          <span className="text-sm font-medium">
                            {price.change > 0 ? '+' : ''}{price.change} ({price.changePercent}%)
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(price.lastUpdated)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Price Information
          </h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Prices are updated daily from various agricultural markets (mandis) across India.</p>
            <p>• Modal price represents the most common price at which the commodity is traded.</p>
            <p>• Prices are shown per quintal (100 kg) unless specified otherwise.</p>
            <p>• Data source: AGMARKNET and e-NAM official portals.</p>
          </div>
        </div>
      </div>
    </div>
  );
}