import { useState } from 'react';
import { Download, Copy, FileText, FileSpreadsheet, ChevronDown } from 'lucide-react';
import { generateTxt, generateCsv, downloadFile, copyToClipboard } from '../utils/export';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';

const ExportButton = ({ users, type }) => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = generateTxt(users, type);
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setIsOpen(false);
    }
  };

  const handleDownloadTxt = () => {
    const text = generateTxt(users, type);
    downloadFile(text, `ig_${type}_${new Date().toISOString().slice(0,10)}.txt`, 'text/plain');
    setIsOpen(false);
  };

  const handleDownloadCsv = () => {
    const csv = generateCsv(users);
    downloadFile(csv, `ig_${type}_${new Date().toISOString().slice(0,10)}.csv`, 'text/csv');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-surface border border-border-light shadow-sm rounded-lg text-sm font-medium text-text-primary hover:border-accent transition-all duration-300"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">{t('exportButton.export')}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-surface border border-border-light rounded-xl shadow-lg overflow-hidden z-10 animate-slide-in">
          <button
            onClick={handleCopy}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-left hover:bg-border-light/50 transition-colors"
          >
            <Copy className="w-4 h-4 text-text-secondary" />
            {copied ? t('exportButton.copied') : t('exportButton.copyClipboard')}
          </button>
          <button
            onClick={handleDownloadTxt}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-left hover:bg-border-light/50 transition-colors"
          >
            <FileText className="w-4 h-4 text-text-secondary" />
            {t('exportButton.downloadTxt')}
          </button>
          <button
            onClick={handleDownloadCsv}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-left hover:bg-border-light/50 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4 text-text-secondary" />
            {t('exportButton.downloadCsv')}
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;
