import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-gold/90 to-yellow-400/90 backdrop-blur-sm border border-gold/40 text-slate-900 hover:from-gold hover:to-yellow-400 transition-all duration-300 shadow-lg shadow-gold/20"
      >
        <Globe size={20} className="text-slate-900" />
        <span className="hidden md:block text-xl font-semibold">
          {languages.find(lang => lang.code === i18n.language)?.flag}
        </span>
      </motion.button>
      
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 z-50"
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-gray-50 transition-colors ${
              i18n.language === lang.code ? 'bg-gold/10 text-gold' : 'text-gray-700'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}