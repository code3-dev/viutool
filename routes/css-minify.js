const express = require("express");
const multer = require("multer");
const CleanCSS = require("clean-css");

// Create an instance of the Express Router to handle routes separately
const router = express.Router();

// Configure Multer to handle file uploads in memory (as a Buffer)
const storage = multer.memoryStorage();

// Initialize Multer with the configured storage setting
const upload = multer({ storage });

// Define a POST route to handle CSS minification
// The `upload.single("cssFile")` middleware is used to handle single CSS file uploads
router.post("/css-minify", upload.single("cssFile"), (req, res) => {
  // Check if a CSS file was uploaded
  if (!req.file) {
    // If no file is uploaded, respond with a 400 Bad Request and an error message
    return res.status(400).json({ error: "No CSS file uploaded!" });
  }

  try {
    // Get the CSS file content from the uploaded file buffer
    const cssContent = req.file.buffer.toString("utf-8");

    // Minify the CSS content using the CleanCSS library
    const minifiedCSS = new CleanCSS().minify(cssContent).styles;

    // Send the minified CSS back to the client as a JSON response
    res.json({ minifiedCSS });
  } catch (error) {
    // If any error occurs during the minification, log the error and respond with a 500 Internal Server Error
    console.error("Error during CSS minification:", error);
    res.status(500).json({ error: "CSS minification failed!" });
  }
});

// Export the router so it can be used in other parts of the application
module.exports = router;
