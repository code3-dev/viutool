const express = require("express");
const multer = require("multer");
const uglifyJS = require("uglify-js");

// Create an instance of the Express Router to handle routes separately
const router = express.Router();

// Configure Multer to handle file uploads in memory (as a Buffer)
const storage = multer.memoryStorage();

// Initialize Multer with the configured storage setting
const upload = multer({ storage });

// Define a POST route to handle JavaScript minification
// The `upload.single("file")` middleware is used to handle single file uploads
router.post("/js-minify", upload.single("file"), (req, res) => {
  // Check if a JS file was uploaded
  if (!req.file) {
    // If no file is uploaded, respond with a 400 Bad Request and an error message
    return res.status(400).json({ error: "No file uploaded!" });
  }

  try {
    // Get the uploaded file's content as a string
    const jsCode = req.file.buffer.toString("utf-8");

    // Minify the JavaScript code using UglifyJS
    const minifiedResult = uglifyJS.minify(jsCode);

    // Check if there was an error during the minification
    if (minifiedResult.error) {
      throw minifiedResult.error;
    }

    // Send the minified code back to the client as a JSON response
    res.json({ minifiedCode: minifiedResult.code });
  } catch (error) {
    // If any error occurs during the minification process, log the error and respond with a 500 Internal Server Error
    console.error("Error during JS minification:", error);
    res.status(500).json({ error: "JS minification failed!" });
  }
});

// Export the router so it can be used in other parts of the application
module.exports = router;
