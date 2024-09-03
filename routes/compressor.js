const express = require("express");
const multer = require("multer");
const sharp = require("sharp");

// Create an instance of the Express Router to handle routes separately
const router = express.Router();

// Configure Multer to handle file uploads in memory (as a Buffer)
// memoryStorage() keeps the uploaded files in memory rather than saving them to disk
const storage = multer.memoryStorage();

// Initialize Multer with the configured storage setting
const upload = multer({ storage });

// Define a POST route to handle image compression
// The `upload.single("image")` middleware is used to handle single image file uploads
router.post("/compress", upload.single("image"), async (req, res) => {
  // Check if an image file was uploaded
  if (!req.file) {
    // If no file is uploaded, respond with a 400 Bad Request and an error message
    return res.status(400).json({ error: "No file uploaded!" });
  }

  // Parse the quality parameter from the request body and convert it to an integer
  const quality = parseInt(req.body.quality, 10);

  // Validate the quality value, ensuring it is between 10 and 100
  if (isNaN(quality) || quality < 10 || quality > 100) {
    // If the quality value is invalid, respond with a 400 Bad Request and an error message
    return res.status(400).json({ error: "Invalid quality value!" });
  }

  try {
    // Determine the original file format by splitting the MIME type (e.g., "image/jpeg" -> "jpeg")
    let format = req.file.mimetype.split("/")[1];
    let compressedBuffer;

    // Switch statement to handle different image formats and compress accordingly
    switch (format) {
      case "jpeg":
        format = "jpg"; // Normalize "jpeg" to "jpg" for consistency
        // Compress the JPEG image using the specified quality
        compressedBuffer = await sharp(req.file.buffer)
          .jpeg({ quality })
          .toBuffer();
        break;
      case "jpg":
        // Compress the JPG image using the specified quality
        compressedBuffer = await sharp(req.file.buffer)
          .jpeg({ quality })
          .toBuffer();
        break;
      case "png":
        // Compress the PNG image using the specified quality
        compressedBuffer = await sharp(req.file.buffer)
          .png({ quality })
          .toBuffer();
        break;
      case "gif":
        // Compress the GIF image using the specified quality
        compressedBuffer = await sharp(req.file.buffer)
          .gif({ quality })
          .toBuffer();
        break;
      case "webp":
        // Compress the WEBP image using the specified quality
        compressedBuffer = await sharp(req.file.buffer)
          .webp({ quality })
          .toBuffer();
        break;
      default:
        // If the image format is not supported, respond with a 400 Bad Request and an error message
        return res.status(400).json({ error: "Unsupported image format!" });
    }

    // Convert the compressed image buffer to a base64-encoded string for easy transfer
    const compressedImage = compressedBuffer.toString("base64");

    // Send the compressed image and its format back to the client as a JSON response
    res.json({ quality, base64: compressedImage, format });
  } catch (error) {
    // If any error occurs during the image processing, log the error and respond with a 500 Internal Server Error
    console.error("Error during image processing:", error);
    res.status(500).json({ error: "Image compression failed!" });
  }
});

// Export the router so it can be used in other parts of the application
module.exports = router;
