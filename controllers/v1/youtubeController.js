import ytdl from "ytdl-core";

const youtubeController = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || !ytdl.validateURL(url)) {
      return res.status(400).json({
        error: "Invalid YouTube URL",
        version: req.apiVersion,
      });
    }

    const videoId = ytdl.getURLVideoID(url);
    console.log("YouTube video ID:", videoId);

    const info = await ytdl.getInfo(url, {
      requestOptions: {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
      },
    });

    console.log("YouTube video info:", info);
    res.status(200).json({ info, version: req.apiVersion });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: error.message || "Failed to process YouTube video download",
      version: req.apiVersion,
    });
  }
};

export default youtubeController;
