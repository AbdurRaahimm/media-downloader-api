import express from "express";
import rateLimit from "express-rate-limit";
import youtubedl from "youtube-dl-exec";
import { ttdl } from "btch-downloader";
import isInvalidTikTokUrl from "./utils/isInvalidTikTokUrl.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiter configuration
const downloadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: "Too many download requests, please try again later.",
});

// API version middleware
const versionHandler = (version) => (req, res, next) => {
  req.apiVersion = version;
  res.setHeader("X-API-Version", version);
  next();
};

// Version 1 routes
const v1 = express.Router();
v1.use(versionHandler("1.0.0"));

// V1 Status endpoint
v1.get("/status", (req, res) => {
  res.json({
    status: "API is running",
    version: req.apiVersion,
    ip:req.ip || req.connection.remoteAddress,
    timestamp: new Date().toISOString(),
  });
});

// V1 YouTube download endpoint
v1.post("/download/youtube", downloadLimiter, async (req, res) => {
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
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: error.message || "Failed to process YouTube video download",
      version: req.apiVersion,
    });
  }
});

v1.post("/download/all", downloadLimiter, async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Invalid or unsupported URL." });
  }
  try {
    const info = await youtubedl(url, {
      dumpSingleJson: true,
      noWarnings: true,
      preferFreeFormats: true,
      noCheckCertificates: true,
      noCacheDir: true,
    });
    if (!info || !info.url) {
      return res.status(400).json({ error: "Unable to retrieve video info." });
    }
    //console.log("Video info:", info);
    res.status(200).json({
      title: info.title || "Video",
      downloadUrl: info.url || "",
      thumbnail: info.thumbnail || "",
      version: req.apiVersion,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      error: "Failed to process download request",
      version: req.apiVersion,
    });
  }
});

// V1 TikTok download endpoint
v1.post("/download/tiktok", downloadLimiter, async (req, res) => {
  try {
    const { url } = req.body;

    if (isInvalidTikTokUrl(url)) {
      return res.status(400).json({
        error: "Invalid TikTok URL",
        version: req.apiVersion,
      });
    }

    const videoInfo = await ttdl(url)
      .then((data) => data)
      .catch((err) => {
        console.error("Error fetching TikTok video info:", err);
        throw new Error("Failed to fetch TikTok video info");
      });

    console.log("TikTok video info:", videoInfo);
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
});

// Version 2 routes (example for future expansion)
const v2 = express.Router();
v2.use(versionHandler("2.0.0"));

// V2 Status endpoint
v2.get("/status", (req, res) => {
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

// Mount versioned routes
app.use("/api/v1", v1);
app.use("/api/v2", v2);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    version: req.apiVersion || "unknown",
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
