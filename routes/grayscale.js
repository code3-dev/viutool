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

// Define a POST route to handle image grayscale conversion
// The `upload.single("image")` middleware is used to handle single image file uploads
router.post("/grayscale", upload.single("image"), async (req, res) => {
  // Check if an image file was uploaded
  if (!req.file) {
    // If no file is uploaded, respond with a 400 Bad Request and an error message
    return res.status(400).json({ error: "No file uploaded!" });
  }

  try {
    // Convert the uploaded image to grayscale using the Sharp library
    const grayscaleBuffer = await sharp(req.file.buffer)
      .grayscale() // Apply grayscale effect
      .toBuffer(); // Convert the result to a buffer

    // Convert the grayscale image buffer to a base64-encoded string for easy transfer
    const grayscaleImage = grayscaleBuffer.toString("base64");

    // Determine the original file format to maintain consistency
    let format;
    format = req.file.mimetype.split("/")[1];

    // If the format is jpeg, use jpg instead
    if (format === "jpeg") {
      format = "jpg";
    }

    // Send the grayscale image and its format back to the client as a JSON response
    res.json({ format, base64: grayscaleImage });
  } catch (error) {
    // If any error occurs during the image processing, log the error and respond with a 500 Internal Server Error
    console.error("Error during grayscale conversion:", error);
    res.status(500).json({ error: "Image grayscale conversion failed!" });
  }
});

// Export the router so it can be used in other parts of the application
module.exports = router;
