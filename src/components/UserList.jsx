import { useState, useMemo } from 'react';
import { Search, ExternalLink, Calendar, ArrowUpDown, EyeOff, Eye, UserMinus, UserPlus } from 'lucide-react';
import { formatTimestamp } from '../utils/formatter';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../utils/translations';

const UserList = ({ users, type, onToggleHide, onToggleUnfollow }) => {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc'); // date-desc, date-asc, name-asc, name-desc

  const filteredAndSortedUsers = useMemo(() => {
    let result = users;

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(u => u.username.toLowerCase().includes(lowerTerm));
    }

    return [...result].sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return (b.timestamp || 0) - (a.timestamp || 0);
        case 'date-asc':
          return (a.timestamp || 0) - (b.timestamp || 0);
        case 'name-asc':
          return a.username.localeCompare(b.username);
        case 'name-desc':
          return b.username.localeCompare(a.username);
        default:
          return 0;
      }
    });
  }, [users, searchTerm, sortBy]);

  if (users.length === 0) {
    return (
      <div className="text-center py-16 border border-border-light border-dashed rounded-2xl bg-surface/50 max-w-5xl mx-auto w-full px-4 animate-slide-in">
        <p className="text-text-secondary text-lg">{t('userList.noUsersFound')}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder={t('userList.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-surface border border-border-light rounded-xl text-sm text-text-primary shadow-sm focus:outline-none focus:border-accent transition-all duration-300"
          />
        </div>
        <div className="relative shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none bg-surface border border-border-light rounded-xl pl-4 pr-10 py-2.5 text-sm text-text-primary shadow-sm focus:outline-none focus:border-accent cursor-pointer w-full sm:w-auto transition-all duration-300"
          >
            <option value="date-desc">{t('userList.newestFirst')}</option>
            <option value="date-asc">{t('userList.oldestFirst')}</option>
            <option value="name-asc">{t('userList.nameAZ')}</option>
            <option value="name-desc">{t('userList.nameZA')}</option>
          </select>
          <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedUsers.map((user, index) => (
          <div 
            key={user.username} 
            className="bg-surface border border-border-light shadow-sm rounded-2xl p-4 flex items-center justify-between hover:border-accent/50 hover:shadow-md transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${Math.min(index * 20, 400)}ms` }}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-11 h-11 rounded-full bg-border-light/50 shrink-0 flex items-center justify-center text-text-primary font-bold text-lg">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-text-primary truncate" title={user.username}>
                  @{user.username}
                </p>
                <div className="flex items-center gap-1 text-xs text-text-secondary mt-0.5">
                  <Calendar className="w-3 h-3" />
                  <span>{formatTimestamp(user.timestamp)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              {type === 'unfollowers' && (
                <>
                  <button
                    onClick={() => onToggleUnfollow(user.username)}
                    className="p-2 rounded-full hover:bg-border-light text-text-secondary hover:text-text-primary transition-colors"
                    title={t('userList.markAsUnfollowed')}
                  >
                    <UserMinus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onToggleHide(user.username)}
                    className="p-2 rounded-full hover:bg-danger/10 text-text-secondary hover:text-danger transition-colors"
                    title={t('userList.markAsDeactivated')}
                  >
                    <EyeOff className="w-4 h-4" />
                  </button>
                </>
              )}
              {type === 'deactivated' && (
                <button
                  onClick={() => onToggleHide(user.username)}
                  className="p-2 rounded-full hover:bg-success/10 text-text-secondary hover:text-success transition-colors"
                  title={t('userList.restoreToUnfollowers')}
                >
                  <Eye className="w-4 h-4" />
                </button>
              )}
              {type === 'unfollowed' && (
                <button
                  onClick={() => onToggleUnfollow(user.username)}
                  className="p-2 rounded-full hover:bg-success/10 text-text-secondary hover:text-success transition-colors"
                  title={t('userList.undoUnfollow')}
                >
                  <UserPlus className="w-4 h-4" />
                </button>
              )}
              <a 
                href={user.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-border-light text-text-secondary hover:text-accent transition-colors"
                title={t('userList.openProfile')}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
      
      {filteredAndSortedUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text-secondary">{t('userList.noUsersMatch')}</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
