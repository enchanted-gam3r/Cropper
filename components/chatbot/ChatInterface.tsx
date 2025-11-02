'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Mic, MicOff, Bot, User, Volume2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  height?: string;
  suggestions?: string[];
}

export default function ChatInterface({
  height = 'h-96 md:h-[500px]',
  suggestions
}: ChatInterfaceProps) {
  const t = useTranslations('chatbot');
  const homeT = useTranslations('home.chatbot');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('greeting'),
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const defaultSuggestions = [
    t('suggestions.pesticide'),
    t('suggestions.fertilizer'),
    t('suggestions.market'),
    t('suggestions.weather'),
    t('suggestions.scheme')
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US'; // Default to English

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');

        setInputText(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setIsRecording(false);
      };
    }
  }, []);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Simulate API call to chatbot
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          language: 'en', // Could be dynamic based on user preference
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.reply || t('error'),
          sender: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      // Fallback response for development/demo
      const fallbackResponse = generateFallbackResponse(inputText);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateFallbackResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    if (input.includes('fertilizer') || input.includes('उर्वरक')) {
      return 'For most crops, I recommend using organic compost along with NPK fertilizers based on your soil test results. Would you like specific recommendations for your crop?';
    }
    if (input.includes('pest') || input.includes('disease') || input.includes('कीट')) {
      return 'Common pest control methods include neem oil spray, crop rotation, and using resistant varieties. Can you specify which crop and pest you\'re dealing with?';
    }
    if (input.includes('price') || input.includes('market') || input.includes('भाव')) {
      return 'You can check current market prices for various crops in our Market Prices section. The data is updated daily from mandis across India.';
    }
    if (input.includes('weather') || input.includes('मौसम')) {
      return 'Our weather section provides 7-day forecasts with agricultural advisories specific to farming activities. You can select your location for detailed information.';
    }
    if (input.includes('scheme') || input.includes('government') || input.includes('योजना')) {
      return 'We have information about various government schemes for farmers including PM Kisan, crop insurance, and agricultural subsidies. Check our Schemes section for details.';
    }

    return 'I\'m here to help with farming questions. You can ask me about crop management, pest control, fertilizers, market prices, weather forecasts, or government schemes. What specific information would you like?';
  };

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
      setIsListening(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden ${height} flex flex-col`}>
      {/* Header */}
      <div className="bg-primary-600 text-white p-4 border-b border-primary-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{homeT('title')}</h3>
            <p className="text-primary-100 text-sm">{homeT('subtitle')}</p>
          </div>
          <div className="ml-auto">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-2 ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.sender === 'assistant' && (
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="h-5 w-5 text-gray-600" />
              </div>
            )}

            <div
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-primary-600 text-white ml-auto'
                  : 'bg-gray-100 text-gray-800 mr-auto'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              {message.sender === 'assistant' && (
                <button
                  onClick={() => speakText(message.text)}
                  className="mt-2 text-xs text-gray-500 hover:text-primary-600 flex items-center space-x-1"
                  aria-label="Speak text"
                >
                  <Volume2 className="h-3 w-3" />
                  <span>Play</span>
                </button>
              )}
            </div>

            {message.sender === 'user' && (
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <User className="h-5 w-5 text-white" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-2 justify-start">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Bot className="h-5 w-5 text-gray-600" />
            </div>
            <div className="bg-gray-100 text-gray-800 mr-auto px-4 py-2 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div className="px-4 py-3 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">You can ask:</p>
          <div className="flex flex-wrap gap-2">
            {(suggestions || defaultSuggestions).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={homeT('placeholder')}
              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              disabled={isTyping}
            />

            {/* Voice input button */}
            <button
              onClick={toggleRecording}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-200 ${
                isRecording
                  ? 'bg-red-500 text-white animate-pulse-record'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
            >
              {isRecording ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Send button */}
          <button
            onClick={handleSendMessage}
            disabled={inputText.trim() === '' || isTyping}
            className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-full transition-colors duration-200"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        {isListening && (
          <p className="text-xs text-red-500 mt-2 text-center animate-pulse">
            {homeT('recording')}
          </p>
        )}
      </div>
    </div>
  );
}