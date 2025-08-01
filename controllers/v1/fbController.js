import { fbdown } from "btch-downloader";
import isInvalidFbUrl from "../../utils/isInvalidFbUrl.js";

const fbController = async (req, res) => {
  try {
    const { url } = req.body;

    if (isInvalidFbUrl(url)) {
      return res.status(400).json({
        error: "Invalid or missing Facebook video URL",
        version: req.apiVersion,
      });
    }

    const videoInfo = await fbdown(url);
    if (!videoInfo) {
      return res.status(404).json({
        error: "No video found for the provided URL",
        version: req.apiVersion,
      });
    }

    res.status(200).json({
      video: {
        normal: videoInfo.Normal_video || "",
        hd: videoInfo.HD || "",
      },
      version: req.apiVersion,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "Failed to process Facebook video download",
      version: req.apiVersion,
    });
  }
};

export default fbController;
