function isInvalidFbUrl(url) {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
  
      // List of valid Facebook domains
      const validHosts = [
        'www.facebook.com',
        'm.facebook.com',
        'facebook.com',
        'fb.com' , 
        'www.fb.com' , // include this to allow redirects

      ];
  
      return !url || !validHosts.includes(hostname);
    } catch (err) {
      return true; // invalid URL format
    }
  }
  
  
  export default isInvalidFbUrl;