function isInvalidTikTokUrl(url) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    // List of valid TikTok domains
    const validHosts = [
      'www.tiktok.com',
      'm.tiktok.com',
      'tiktok.com',
      'vt.tiktok.com' // include this to allow redirects
    ];

    return !url || !validHosts.includes(hostname);
  } catch (err) {
    return true; // invalid URL format
  }
}


export default isInvalidTikTokUrl;