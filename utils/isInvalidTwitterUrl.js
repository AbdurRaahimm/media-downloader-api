function isInvalidTwitterUrl(url) {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
  
      const validHosts = [
        'www.twitter.com',
        'twitter.com',
        'x.com',
        'www.x.com',
        'mobile.twitter.com',       
      ];
  
      return !url || !validHosts.includes(hostname);
    } catch (err) {
      return true; // invalid URL format
    }
  }
  
  
  export default isInvalidTwitterUrl;