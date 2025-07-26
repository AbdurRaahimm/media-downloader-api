import { youtube } from "btch-downloader";

const ytController = async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!url || !url.includes("youtube.com") && !url.includes("youtu.be")) {
      return res.status(400).json({
        error: "Invalid or missing Youtube video URL",
        version: req.apiVersion,
      });
    }

    const videoInfo = await youtube(url);
    if (!videoInfo) {
      return res.status(404).json({
        error: "No video found for the provided URL",
        version: req.apiVersion,
      });
    }

    res.status(200).json({
      title: videoInfo.title || " ",
      thumbnail: videoInfo.thumbnail || "",
      author: videoInfo.author || "",
      video: videoInfo.mp4 || "",
      audio: videoInfo.mp3 || "",
      version: req.apiVersion,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "Failed to process Youtube video download",
      version: req.apiVersion,
    });
  }
};

export default ytController;
