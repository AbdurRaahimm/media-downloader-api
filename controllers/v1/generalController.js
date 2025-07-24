import youtubedl from "youtube-dl-exec";

const generalController = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Invalid or unsupported URL." });
  }
  try {
    const info = await youtubedl(url, {
      youtubeDl: './yt-dlp',
      dumpSingleJson: true,
      noWarnings: true,
      preferFreeFormats: true,
      noCheckCertificates: true,
      noCacheDir: true,
    });

    if (!info || !info.url) {
      return res.status(400).json({ error: "Unable to retrieve video info." });
    }

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
};

export default generalController;
