'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Globe, Leaf } from 'lucide-react';

interface NavigationProps {
  locale: string;
}

export default function Navigation({ locale }: NavigationProps) {
  const t = useTranslations('navigation');
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'hi' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const navigationItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'marketPrices', href: `/${locale}/market-prices` },
    { key: 'weather', href: `/${locale}/weather` },
    { key: 'schemes', href: `/${locale}/schemes` },
    { key: 'help', href: `/${locale}/help` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary-600" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">Cropper</span>
                <span className="text-xs text-gray-600 hidden sm:block">
                  {locale === 'hi' ? 'किसान सहायक' : 'Farmer Helper'}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {t(item.key as any)}
              </Link>
            ))}
          </div>

          {/* Language switcher and mobile menu button */}
          <div className="flex items-center space-x-4">
            {/* Language switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 border border-gray-300 rounded-lg hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:block">
                {locale === 'en' ? 'हिं' : 'EN'}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {t(item.key as any)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}