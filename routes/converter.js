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

// Define a POST route to handle image format conversion
// The `upload.single("image")` middleware is used to handle single image file uploads
router.post("/convert", upload.single("image"), async (req, res) => {
  // Check if an image file was uploaded
  if (!req.file) {
    // If no file is uploaded, respond with a 400 Bad Request and an error message
    return res.status(400).json({ error: "No file uploaded!" });
  }

  // Parse the target format from the request body and convert it to lowercase
  const targetFormat = req.body.format.toLowerCase();

  // Validate the target format, ensuring it is one of the supported formats (PNG, JPG, JPEG, WEBP)
  if (!["png", "jpg", "jpeg", "webp"].includes(targetFormat)) {
    // If the target format is not supported, respond with a 400 Bad Request and an error message
    return res.status(400).json({ error: "Unsupported target format!" });
  }

  try {
    let convertedBuffer;

    // Switch statement to handle conversion to the specified target format
    switch (targetFormat) {
      case "jpg":
      case "jpeg":
        // Convert the image to JPEG format
        convertedBuffer = await sharp(req.file.buffer).jpeg().toBuffer();
        break;
      case "png":
        // Convert the image to PNG format
        convertedBuffer = await sharp(req.file.buffer).png().toBuffer();
        break;
      case "webp":
        // Convert the image to WEBP format
        convertedBuffer = await sharp(req.file.buffer).webp().toBuffer();
        break;
      default:
        // Although this default case should never be reached due to earlier validation, it's a good practice
        return res.status(400).json({ error: "Unsupported target format!" });
    }

    // Convert the converted image buffer to a base64-encoded string for easy transfer
    const convertedImage = convertedBuffer.toString("base64");

    // Send the converted image and its new format back to the client as a JSON response
    res.json({ format: targetFormat, base64: convertedImage });
  } catch (error) {
    // If any error occurs during the image processing, log the error and respond with a 500 Internal Server Error
    console.error("Error during image conversion:", error);
    res.status(500).json({ error: "Image conversion failed!" });
  }
});

// Export the router so it can be used in other parts of the application
module.exports = router;
