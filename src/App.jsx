import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadArea from './components/UploadArea';
import StatsCards from './components/StatsCards';
import TabNavigation from './components/TabNavigation';
import UserList from './components/UserList';
import ExportButton from './components/ExportButton';
import { parseFollowers, parseFollowing, computeRelationships } from './utils/parser';
import { useLanguage } from './contexts/LanguageContext';
import { getTranslation } from './utils/translations';

function App() {
  const { language } = useLanguage();
  const t = (key) => getTranslation(language, key);
  const [rawFollowingJson, setRawFollowingJson] = useState(() => {
    try {
      const saved = localStorage.getItem('ig_raw_following_json');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Error parsing saved raw following data:", e);
      return null;
    }
  });

  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('ig_computed_data');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Error parsing saved computed data:", e);
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState('unfollowers'); // 'unfollowers', 'mutual', 'fans', 'deactivated', 'unfollowed'
  
  const [unfollowedUsers, setUnfollowedUsers] = useState(() => {
    const saved = localStorage.getItem('ig_unfollowed_users');
    return saved ? JSON.parse(saved) : [];
  });
  const [hiddenUsers, setHiddenUsers] = useState(() => {
    const saved = localStorage.getItem('ig_hidden_users');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleHideUser = (username) => {
    setHiddenUsers(prev => {
      let newHidden;
      if (prev.includes(username)) {
        newHidden = prev.filter(u => u !== username);
      } else {
        newHidden = [...prev, username];
      }
      localStorage.setItem('ig_hidden_users', JSON.stringify(newHidden));
      return newHidden;
    });
  };

  const toggleUnfollowUser = (username) => {
    setUnfollowedUsers(prev => {
      let newUnfollowed;
      if (prev.includes(username)) {
        newUnfollowed = prev.filter(u => u !== username);
      } else {
        newUnfollowed = [...prev, username];
      }
      localStorage.setItem('ig_unfollowed_users', JSON.stringify(newUnfollowed));
      return newUnfollowed;
    });
  };

  const handleDataProcessed = (followersRaw, followingRaw) => {
    try {
      setRawFollowingJson(followingRaw);
      localStorage.setItem('ig_raw_following_json', JSON.stringify(followingRaw));

      const followersMap = parseFollowers(followersRaw);
      const followingMap = parseFollowing(followingRaw);
      
      const { unfollowers, mutual, fans } = computeRelationships(followersMap, followingMap);
      
      const computedData = {
        stats: {
          followers: followersMap.size,
          following: followingMap.size,
          mutual: mutual.length,
          fans: fans.length
        },
        lists: {
          unfollowersRaw: unfollowers,
          mutual,
          fans
        }
      };

      setData(computedData);
      localStorage.setItem('ig_computed_data', JSON.stringify(computedData));
    } catch (error) {
      console.error(error);
      alert("Error processing data: " + error.message);
    }
  };

  const handleReset = () => {
    setData(null);
    setRawFollowingJson(null);
    setActiveTab('unfollowers');
    localStorage.removeItem('ig_raw_following_json');
    localStorage.removeItem('ig_computed_data');
    localStorage.removeItem('ig_unfollowed_users');
    localStorage.removeItem('ig_hidden_users');
    setUnfollowedUsers([]);
    setHiddenUsers([]);
  };

  const downloadUpdatedFollowingJson = () => {
    if (!rawFollowingJson) return;
    
    // Filter out users that are marked as unfollowed
    const updatedFollowing = {
      ...rawFollowingJson,
      relationships_following: rawFollowingJson.relationships_following.filter(
        item => !unfollowedUsers.includes(item.title)
      )
    };
    
    const blob = new Blob([JSON.stringify(updatedFollowing, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'following.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const actualUnfollowers = data ? data.lists.unfollowersRaw.filter(u => !hiddenUsers.includes(u.username) && !unfollowedUsers.includes(u.username)) : [];
  const hiddenUnfollowers = data ? data.lists.unfollowersRaw.filter(u => hiddenUsers.includes(u.username)) : [];
  const manuallyUnfollowed = data ? data.lists.unfollowersRaw.filter(u => unfollowedUsers.includes(u.username)) : [];

  const displayData = data ? {
    stats: {
      ...data.stats,
      unfollowers: actualUnfollowers.length,
      deactivated: hiddenUnfollowers.length,
      unfollowed: manuallyUnfollowed.length
    },
    lists: {
      ...data.lists,
      unfollowers: actualUnfollowers,
      deactivated: hiddenUnfollowers,
      unfollowed: manuallyUnfollowed
    }
  } : null;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 w-full pt-8 pb-16">
        {!data ? (
          <UploadArea onDataProcessed={handleDataProcessed} />
        ) : (
            <div className="animate-slide-in">
              <div className="max-w-5xl mx-auto px-4 flex justify-between items-center mb-4 gap-4 flex-wrap">
                <button 
                  onClick={downloadUpdatedFollowingJson}
                  className="text-sm font-medium px-4 py-2 bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20 rounded-lg transition-all duration-300 flex items-center gap-2"
                  title={t('header.downloadUpdated')}
                >
                  {t('header.downloadUpdated')}
                </button>
                <button 
                  onClick={handleReset}
                  className="text-sm text-text-secondary hover:text-text-primary underline underline-offset-4 transition-all duration-300"
                >
                  {t('header.uploadDifferent')}
                </button>
              </div>
            
            <StatsCards stats={displayData.stats} />
            
            <TabNavigation 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              counts={{
                unfollowers: displayData.stats.unfollowers,
                mutual: displayData.stats.mutual,
                fans: displayData.stats.fans,
                deactivated: displayData.stats.deactivated,
                unfollowed: displayData.stats.unfollowed
              }} 
            />
            
            <div className="max-w-5xl mx-auto px-4 flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold capitalize">{activeTab}</h3>
              <ExportButton users={displayData.lists[activeTab]} type={activeTab} />
            </div>
            
            <UserList 
              users={displayData.lists[activeTab]} 
              type={activeTab} 
              onToggleHide={toggleHideUser} 
              onToggleUnfollow={toggleUnfollowUser}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
