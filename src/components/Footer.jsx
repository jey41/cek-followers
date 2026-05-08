import { Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';

const Footer = () => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  return (
    <footer className="border-t border-border-light mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-secondary">
          © {new Date().getFullYear()} {t('footer.copyright')}
        </p>
        <div className="flex items-center gap-4 text-sm text-text-secondary">
          <span className="flex items-center gap-1">
            {t('footer.madeBy')} <Heart className="w-4 h-4 text-danger fill-danger" /> {t('footer.by')}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
