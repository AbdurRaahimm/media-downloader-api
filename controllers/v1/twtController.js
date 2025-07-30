import { twitter } from 'btch-downloader';
import isInvalidTwitterUrl from '../../utils/isInvalidTwitterUrl.js';

const twtController = async (req, res) => {
    try {
        const { url } = req.body;
    
        if (isInvalidTwitterUrl(url)) {
        return res.status(400).json({
            error: "Invalid or missing Twitter video URL",
            version: req.apiVersion,
        });
        }
    
        const videoInfo = await twitter(url);
        if (!videoInfo) {
        return res.status(404).json({
            error: "No video found for the provided URL",
            version: req.apiVersion,
        });
        }
    
        res.status(200).json({
        title: videoInfo.title || " ",
        video: {
            sd: videoInfo.url[1].sd || "",
            hd: videoInfo.url[0].hd || "",
        },
        version: req.apiVersion,
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({
        error: "Failed to process Twitter video download",
        version: req.apiVersion,
        });
    }
};

export default twtController;