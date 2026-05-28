import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation helpers
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectLanguage = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  const currentLanguageLabel = language === 'en' ? 'English' : 'Bahasa Indonesia';

  return (
    <div className="relative inline-block text-left" ref={dropdownRef} onKeyDown={handleKeyDown}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative rounded-full border bg-surface/40 hover:bg-surface/90 backdrop-blur-md px-3.5 py-1.5 flex items-center gap-1.5 text-xs font-bold tracking-wide text-text-primary shadow-sm hover:shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 ${
          isOpen ? 'border-accent/40 bg-surface/90 shadow-md ring-2 ring-accent/20' : 'border-border-light'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`Change language. Current: ${currentLanguageLabel}`}
        title={`Change language. Current: ${currentLanguageLabel}`}
      >
        <Globe className={`w-3.5 h-3.5 text-text-secondary transition-all duration-500 ${isOpen ? 'text-accent rotate-45' : 'group-hover:text-accent'}`} />
        <span className="uppercase text-[11px] font-bold text-text-primary tracking-wider">{language}</span>
        <ChevronDown 
          className={`w-3 h-3 text-text-secondary transition-transform duration-500 ease-out ${
            isOpen ? 'rotate-180 text-accent' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-48 rounded-2xl bg-surface/90 border border-border-light/60 backdrop-blur-xl shadow-xl z-50 p-1.5 origin-top-right transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
        }`}
        role="menu"
        aria-orientation="vertical"
      >
        {/* Language Options */}
        <button
          onClick={() => handleSelectLanguage('en')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all duration-200 cursor-pointer ${
            language === 'en'
              ? 'bg-accent/10 text-accent'
              : 'text-text-primary hover:bg-border-light/40 hover:text-accent'
          }`}
          role="menuitem"
        >
          {/* High-fidelity custom CSS stylized UK Flag */}
          <span className="relative w-4 h-4 rounded-full border border-border-dark/10 bg-blue-800 overflow-hidden shadow-sm shrink-0 flex items-center justify-center">
            <span className="absolute w-full h-[1.5px] bg-white rotate-45" />
            <span className="absolute w-full h-[1.5px] bg-white -rotate-45" />
            <span className="absolute w-full h-1 bg-white" />
            <span className="absolute h-full w-1 bg-white" />
            <span className="absolute w-full h-[0.7px] bg-red-600" />
            <span className="absolute h-full w-[0.7px] bg-red-600" />
          </span>
          <span>English</span>
          {language === 'en' && <Check className="w-3.5 h-3.5 ml-auto text-accent shrink-0 animate-scale-in" />}
        </button>

        <button
          onClick={() => handleSelectLanguage('id')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all duration-200 cursor-pointer ${
            language === 'id'
              ? 'bg-accent/10 text-accent'
              : 'text-text-primary hover:bg-border-light/40 hover:text-accent'
          }`}
          role="menuitem"
        >
          {/* High-fidelity custom CSS stylized Indonesian Flag */}
          <span className="relative w-4 h-4 rounded-full border border-border-dark/15 flex flex-col overflow-hidden shadow-sm shrink-0">
            <span className="h-1/2 bg-red-600 w-full" />
            <span className="h-1/2 bg-white w-full" />
          </span>
          <span>Bahasa Indonesia</span>
          {language === 'id' && <Check className="w-3.5 h-3.5 ml-auto text-accent shrink-0 animate-scale-in" />}
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;
