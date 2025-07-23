import { ttdl } from "btch-downloader";
import isInvalidTikTokUrl from "../../utils/isInvalidTikTokUrl.js";

const tiktokController = async (req, res) => {
  try {
    const { url } = req.body;

    if (isInvalidTikTokUrl(url)) {
      return res.status(400).json({
        error: "Invalid TikTok URL",
        version: req.apiVersion,
      });
    }

    const videoInfo = await ttdl(url)

    res.status(200).json({
      title: videoInfo.title || " ",
      video: Array.isArray(videoInfo.video) ? videoInfo.video : [],
      audio: Array.isArray(videoInfo.audio) ? videoInfo.audio : [],
      thumbnail: videoInfo.thumbnail || "",
      version: req.apiVersion,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "Failed to process TikTok video download",
      version: req.apiVersion,
    });
  }
};

export default tiktokController;
