function isInvalidTikTokUrl(url) {
    // Basic pattern for TikTok video URLs
    const tiktokRegex = /^https?:\/\/(www\.)?tiktok\.com\/(@[\w.-]+\/video\/\d+|v\/\d+)/;
  
    try {
      new URL(url); // Check if it's a valid URL format
      return !url || !tiktokRegex.test(url); // Return true if it doesn't match TikTok pattern
    } catch {
      return true; // Invalid overall URL
    }
  }
  

export default isInvalidTikTokUrl;