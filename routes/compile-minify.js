const express = require("express");
const multer = require("multer");
const sass = require("sass");
const CleanCSS = require("clean-css");

const router = express.Router();

// Configure Multer to handle file uploads in memory (as a Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define a POST route to handle SCSS/SASS compilation and CSS minification
router.post("/compile-minify", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded!" });
  }

  try {
    // Compile the SCSS file to CSS with in-memory buffer
    const result = sass.renderSync({
      data: req.file.buffer.toString(), // SCSS content as a string
      outputStyle: "expanded", // Or 'compressed' if you want initial minification
    });

    // Minify the compiled CSS using CleanCSS
    const minifiedCSS = new CleanCSS().minify(result.css).styles;

    // Send the minified CSS back to the client as a JSON response
    res.json({ minifiedCSS });
  } catch (error) {
    console.error(
      "Error during SCSS/SASS compilation or CSS minification:",
      error
    );
    res.status(500).json({ error: "Compilation or minification failed!" });
  }
});

module.exports = router;
