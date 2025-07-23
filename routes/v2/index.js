import express from "express";
import versionHandler from "../../middleware/versionHandler.js";

const router = express.Router();

router.use(versionHandler("2.0.0"));

router.get("/status", (req, res) => {
  res.json({
    status: "API is running",
    version: req.apiVersion,
    timestamp: new Date().toISOString(),
    features: [
      "youtube_download",
      "tiktok_download",
      "facebook_download",
      "instagram_download",
      "future_features",
    ],
  });
});

export default router;
