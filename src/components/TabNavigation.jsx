import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';

const TabNavigation = ({ activeTab, setActiveTab, counts }) => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const tabs = [
    { id: 'unfollowers', label: t('tabs.unfollowers'), count: counts.unfollowers, color: 'text-danger' },
    { id: 'mutual', label: t('tabs.mutual'), count: counts.mutual, color: 'text-success' },
    { id: 'fans', label: t('tabs.fans'), count: counts.fans, color: 'text-warning' },
    { id: 'deactivated', label: t('tabs.deactivated'), count: counts.deactivated, color: 'text-text-secondary' },
    { id: 'unfollowed', label: t('tabs.unfollowed'), count: counts.unfollowed, color: 'text-text-primary' }
  ];

  return (
    <div className="flex border-b border-border-light mb-6 max-w-5xl mx-auto px-4 w-full overflow-x-auto hide-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative px-6 py-3 text-sm font-medium transition-colors shrink-0 ${
            activeTab === tab.id 
              ? 'text-text-primary' 
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <div className="flex items-center gap-2 transition-transform duration-300">
            {tab.label}
            <span className={`px-2 py-0.5 rounded-full text-xs bg-border-light/50 ${activeTab === tab.id ? tab.color : 'text-text-secondary'}`}>
              {tab.count}
            </span>
          </div>
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-t-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
