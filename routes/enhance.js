const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

// Configure Multer to handle file uploads in memory (as a Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.post("/enhance", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }

  const resolution = req.body.resolution;
  let width, height;
  if (resolution === "8K") {
    width = 7680;
    height = 4320;
  } else if (resolution === "4K") {
    width = 3840;
    height = 2160;
  } else {
    return res
      .status(400)
      .json({ error: "Invalid resolution specified! Use '4K' or '8K'." });
  }

  try {
    // Resize the image to the specified resolution
    const enhancedBuffer = await sharp(req.file.buffer)
      .median(3)
      .resize(width, height, { fit: sharp.fit.inside })
      .toBuffer();

    // Convert the enhanced image buffer to a base64-encoded string
    const enhancedImage = enhancedBuffer.toString("base64");

    let format = req.file.mimetype.split("/")[1];
    if (format === "jpeg") {
      format = "jpg";
    }

    res.json({ format, base64: enhancedImage });
  } catch (error) {
    console.error("Error during image enhancement:", error);
    res.status(500).json({ error: "Image enhancement failed!" });
  }
});

module.exports = router;
