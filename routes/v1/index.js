import express from "express";
import versionHandler from "../../middleware/versionHandler.js";
import downloadLimiter from "../../middleware/downloadLimiter.js";
import tiktokController from "../../controllers/v1/tiktokController.js";
import generalController from "../../controllers/v1/generalController.js";
import fbController from "../../controllers/v1/fbController.js";
import igController from "../../controllers/v1/igController.js";
import ytController from "../../controllers/v1/ytController.js";
import twtController from "../../controllers/v1/twtController.js";

const router = express.Router();

router.use(versionHandler("1.0.0"));

router.get("/status", (req, res) => {
  res.json({
    status: "API is running",
    version: req.apiVersion,
    ip: req.ip || req.socket.remoteAddress,
    timestamp: new Date().toISOString(),
  });
});

router.post("/download/facebook", downloadLimiter, fbController);
router.post("/download/instagram", downloadLimiter, igController);
router.post("/download/youtube", downloadLimiter, ytController);
router.post("/download/twitter", downloadLimiter, twtController);
router.post("/download/tiktok", downloadLimiter, tiktokController);
router.post("/download/all", downloadLimiter, generalController);

export default router;
