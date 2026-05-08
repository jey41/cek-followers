export const parseFollowers = (jsonData) => {
  try {
    const followers = new Map(); // using Map for faster lookup by username
    
    // followers_1.json is an array of objects
    jsonData.forEach(item => {
      if (item.string_list_data && item.string_list_data.length > 0) {
        const data = item.string_list_data[0];
        followers.set(data.value, {
          username: data.value,
          href: data.href,
          timestamp: data.timestamp
        });
      }
    });
    
    return followers;
  } catch (error) {
    console.error("Error parsing followers:", error);
    throw new Error("Invalid followers file format");
  }
};

export const parseFollowing = (jsonData) => {
  try {
    const following = new Map();
    
    // following.json has an object with 'relationships_following' array
    if (!jsonData.relationships_following) {
      throw new Error("Invalid following file format");
    }
    
    jsonData.relationships_following.forEach(item => {
      if (item.string_list_data && item.string_list_data.length > 0) {
        const data = item.string_list_data[0];
        following.set(item.title, {
          username: item.title,
          href: data.href,
          timestamp: data.timestamp
        });
      }
    });
    
    return following;
  } catch (error) {
    console.error("Error parsing following:", error);
    throw new Error("Invalid following file format");
  }
};

export const computeRelationships = (followersMap, followingMap) => {
  const unfollowers = [];
  const mutual = [];
  const fans = [];

  // Check who you follow
  for (const [username, data] of followingMap.entries()) {
    if (followersMap.has(username)) {
      mutual.push({ ...data, relationship: 'mutual' });
    } else {
      unfollowers.push({ ...data, relationship: 'unfollower' });
    }
  }

  // Check who follows you but you don't follow back
  for (const [username, data] of followersMap.entries()) {
    if (!followingMap.has(username)) {
      fans.push({ ...data, relationship: 'fan' });
    }
  }

  return { unfollowers, mutual, fans };
};
