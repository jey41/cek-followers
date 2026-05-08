import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="relative w-14 h-7 rounded-full bg-border-light border border-border-dark/30 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 group"
      aria-label={language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
      title={language === 'en' ? 'Switch to Indonesian' : 'Switch to English'}
    >
      {/* Track background labels */}
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-400 opacity-40 transition-opacity duration-300">EN</span>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-red-400 opacity-40 transition-opacity duration-300">ID</span>
      
      {/* Sliding knob */}
      <span 
        className={`absolute top-[3px] left-[3px] w-5 h-5 rounded-full shadow-md flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] font-bold text-xs text-white ${
          language === 'en' 
            ? 'translate-x-0 bg-blue-500' 
            : 'translate-x-7 bg-red-500'
        }`}
      >
        {language === 'en' ? 'EN' : 'ID'}
      </span>
    </button>
  );
};

export default LanguageToggle;
