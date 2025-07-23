import express from "express";
import versionHandler from "../../middleware/versionHandler.js";
import downloadLimiter from "../../middleware/downloadLimiter.js";
import youtubeController from "../../controllers/v1/youtubeController.js";
import tiktokController from "../../controllers/v1/tiktokController.js";
import generalController from "../../controllers/v1/generalController.js";

const router = express.Router();

router.use(versionHandler("1.0.0"));

router.get("/status", (req, res) => {
  res.json({
    status: "API is running",
    version: req.apiVersion,
    ip: req.ip || req.connection.remoteAddress,
    timestamp: new Date().toISOString(),
  });
});

router.post("/download/youtube", downloadLimiter, youtubeController);
router.post("/download/tiktok", downloadLimiter, tiktokController);
router.post("/download/all", downloadLimiter, generalController);

export default router;
