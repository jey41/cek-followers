import { Users, UserMinus, HeartHandshake } from 'lucide-react';
import { formatNumber } from '../utils/formatter';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';

const StatCard = ({ title, value, icon: Icon, colorClass, delay }) => (
  <div 
    className="bg-surface border border-border-light shadow-sm rounded-2xl p-5 flex items-center gap-4 animate-slide-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`p-3 rounded-xl ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-text-secondary font-medium">{title}</p>
      <p className="text-2xl font-bold text-text-primary mt-1">{formatNumber(value)}</p>
    </div>
  </div>
);

const StatsCards = ({ stats }) => {
  if (!stats) return null;

  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full max-w-5xl mx-auto px-4 mb-8 mt-8">
      <StatCard 
        title={t('statsCards.followers')} 
        value={stats.followers} 
        icon={Users} 
        colorClass="bg-[#607B8F]/10 text-text-secondary" 
        delay={0} 
      />
      <StatCard 
        title={t('statsCards.following')} 
        value={stats.following} 
        icon={Users} 
        colorClass="bg-[#434E78]/10 text-text-primary" 
        delay={100} 
      />
      <StatCard 
        title={t('statsCards.notFollowingBack')} 
        value={stats.unfollowers} 
        icon={UserMinus} 
        colorClass="bg-accent/10 text-accent" 
        delay={200} 
      />
      <StatCard 
        title={t('statsCards.mutual')} 
        value={stats.mutual} 
        icon={HeartHandshake} 
        colorClass="bg-[#F7E396]/30 text-[#E97F4A]" 
        delay={300} 
      />
    </div>
  );
};

export default StatsCards;
