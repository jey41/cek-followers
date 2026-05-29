import brandLogo from '../assets/logo_apeiron.png';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';

const Header = () => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  return (
    <header className="border-b border-border-light bg-surface/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shadow-sm border border-border-light">
            <img src={brandLogo} alt="APEIRON Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-text-primary leading-tight">{t('UnfollowChecker')}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center text-xs font-medium px-3 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            {t('header.privacy')}
          </div>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
