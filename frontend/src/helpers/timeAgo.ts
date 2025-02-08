const timeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
  
    const units = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 },
    ];
  
    for (let { label, seconds } of units) {
      const interval = Math.floor(diffInSeconds / seconds);
      if (interval >= 1) {
        return `${interval} ${label}${interval > 1 ? 's' : ''} ago`;
      }
    }
    return 'Just now';
  };
  
  export default timeAgo;