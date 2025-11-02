'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Leaf, Phone, Mail, MapPin, Facebook, Twitter, Youtube } from 'lucide-react';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');

  const quickLinks = [
    { key: 'about', href: `/${locale}/about` },
    { key: 'contact', href: `/${locale}/contact` },
    { key: 'privacy', href: `/${locale}/policy` },
    { key: 'terms', href: `/${locale}/policy#terms` },
  ];

  const supportLinks = [
    { key: 'marketPrices', href: `/${locale}/market-prices`, icon: Leaf },
    { key: 'weather', href: `/${locale}/weather`, icon: Leaf },
    { key: 'schemes', href: `/${locale}/schemes`, icon: Leaf },
    { key: 'help', href: `/${locale}/help`, icon: Leaf },
  ];

  const contactInfo = [
    {
      icon: Phone,
      text: locale === 'hi' ? 'किसान हेल्पलाइन: 1800-XXX-XXXX' : 'Farmer Helpline: 1800-XXX-XXXX',
      href: 'tel:1800-XXX-XXXX',
    },
    {
      icon: Mail,
      text: 'support@cropper.in',
      href: 'mailto:support@cropper.in',
    },
    {
      icon: MapPin,
      text: locale === 'hi'
        ? 'नई दिल्ली, भारत'
        : 'New Delhi, India',
      href: '#',
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">Cropper</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {locale === 'hi'
                ? 'भारतीय किसानों के लिए व्यापक कृषि समर्थन प्लेटफॉर्म। AI-संचालित सहायता और वास्तविक समय की जानकारी के साथ किसानों को सशक्त बनाना।'
                : 'Comprehensive agricultural support platform for Indian farmers. Empowering farmers with AI-powered assistance and real-time information.'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">
              {locale === 'hi' ? 'त्वरित लिंक' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {t(link.key as any)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">
              {locale === 'hi' ? 'सेवाएं' : 'Services'}
            </h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{link.key}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">
              {locale === 'hi' ? 'संपर्क करें' : 'Contact Us'}
            </h3>
            <div className="space-y-3">
              {contactInfo.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <a
                    key={index}
                    href={contact.href}
                    className="flex items-center space-x-2 text-gray-300 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    <IconComponent className="h-4 w-4 flex-shrink-0" />
                    <span>{contact.text}</span>
                  </a>
                );
              })}
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">
                {locale === 'hi' ? 'हमें फॉलो करें' : 'Follow Us'}
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                      aria-label={social.label}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {t('copyright')}
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400 text-sm">
                {t('support')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}