const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const ColorThief = require("colorthief");

// Create an instance of the Express Router
const router = express.Router();

// Configure Multer to handle file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to convert RGB to Hex
const rgbToHex = (r, g, b) => {
  const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

// Define a POST route to handle color extraction
router.post("/color-picker", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }

  const colorCount = parseInt(req.body.colorCount, 10) || 6; // Default to 6 if not provided

  try {
    let imageBuffer = req.file.buffer;

    // Use Sharp to handle image format automatically
    const image = sharp(imageBuffer);

    // Get image metadata to determine the format
    const metadata = await image.metadata();

    // Convert the image buffer to PNG format
    imageBuffer = await image.toFormat("png").toBuffer();

    // Convert the image buffer to a Data URL
    const base64Image = `data:image/png;base64,${imageBuffer.toString(
      "base64"
    )}`;

    // Use ColorThief to extract colors
    const [dominantColorRgb, paletteRgb] = await Promise.all([
      ColorThief.getColor(base64Image),
      ColorThief.getPalette(base64Image, colorCount),
    ]);

    // Convert RGB colors to HEX
    const dominantColorHex = rgbToHex(...dominantColorRgb);
    const paletteHex = paletteRgb.map((rgb) => rgbToHex(...rgb));

    res.json({ dominantColor: dominantColorHex, palette: paletteHex });
  } catch (error) {
    console.error("Error during color extraction:", error);
    res.status(500).json({ error: "Color extraction failed!" });
  }
});

module.exports = router;
