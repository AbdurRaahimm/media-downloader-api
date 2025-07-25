import { igdl } from 'btch-downloader';

const igController = async (req, res) => {
    try {
        const { url } = req.body;
    
        if (!url || !url.includes("instagram.com")) {
        return res.status(400).json({
            error: "Invalid or missing Instagram video URL",
            version: req.apiVersion,
        });
        }
    
        const videoInfo = await igdl(url);
        if (!videoInfo || !videoInfo.result) {
        return res.status(404).json({
            error: "No video found for the provided URL",
            version: req.apiVersion,
        });
        }

        const { result } = videoInfo;
    
        res.status(200).json({
        thumbnail: result[0].thumbnail || "",
        video:result[0].url,
        version: req.apiVersion,
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({
        error: "Failed to process Instagram video download",
        version: req.apiVersion,
        });
    }
}

export default igController;