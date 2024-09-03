const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config({ path: "./config.env" });

// Create an instance of the Express application
const app = express();

// Set the view engine to EJS, which allows us to render EJS templates
app.set("view engine", "ejs");

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Set the directory where the EJS templates are located
app.set("views", path.join(__dirname, "views"));

// Serve static files such as CSS, JavaScript, and images from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Import routes from separate route modules
const compressorRoutes = require("./routes/compressor");
const resizerRoutes = require("./routes/resizer");
const converterRoutes = require("./routes/converter");
const grayscaleRoutes = require("./routes/grayscale");
const colorPickerRoutes = require("./routes/color-picker");
const cssMinify = require("./routes/css-minify");
const jsMinify = require("./routes/js-minify");
const compileSass = require("./routes/compile-minify");
const jwt = require("./routes/jwt");
const enhance = require("./routes/enhance");

// Serve Font Awesome CSS and webfonts from node_modules
app.use(
  "/css",
  express.static(
    path.join(__dirname, "node_modules/@fortawesome/fontawesome-free/css")
  )
);
app.use(
  "/webfonts",
  express.static(
    path.join(__dirname, "node_modules/@fortawesome/fontawesome-free/webfonts")
  )
);

// Use the imported routes for handling requests under "/api/v1"
app.use("/api/v1", compressorRoutes);
app.use("/api/v1", resizerRoutes);
app.use("/api/v1", converterRoutes);
app.use("/api/v1", grayscaleRoutes);
app.use("/api/v1", colorPickerRoutes);
app.use("/api/v1", cssMinify);
app.use("/api/v1", jsMinify);
app.use("/api/v1", compileSass);
app.use("/api/v1", jwt);
app.use("/api/v1", enhance);

// Define the APP Configs from the environment variables
const appName = process.env.APP_NAME || "ViuTool";
const appEmail = process.env.APP_EMAIL || "h3dev.pira@gmail.com";
const currentYear = new Date().getFullYear();

// Define route for the home page
app.get("/", (req, res) => {
  res.render("index", { appName, appEmail, currentYear });
});

// Define route for the image compressor tool page
app.get("/tools/compressor", (req, res) => {
  res.render("tools/compressor", { appName, appEmail, currentYear });
});

// Define route for the image resizer tool page
app.get("/tools/resizer", (req, res) => {
  res.render("tools/resizer", { appName, appEmail, currentYear });
});

// Define route for the image converter tool page
app.get("/tools/converter", (req, res) => {
  res.render("tools/converter", { appName, appEmail, currentYear });
});

// Define route for the image grayscale converter tool page
app.get("/tools/grayscale", (req, res) => {
  res.render("tools/grayscale", { appName, appEmail, currentYear });
});

// Define route for the image base64 converter tool page
app.get("/tools/image-base64", (req, res) => {
  res.render("tools/image-base64", { appName, appEmail, currentYear });
});

// Define route for the image color picker tool page
app.get("/tools/color-picker", (req, res) => {
  res.render("tools/color-picker", { appName, appEmail, currentYear });
});

// Define route for the css minify tool page
app.get("/tools/css-minify", (req, res) => {
  res.render("tools/css-minify", { appName, appEmail, currentYear });
});

// Define route for the js minify tool page
app.get("/tools/js-minify", (req, res) => {
  res.render("tools/js-minify", { appName, appEmail, currentYear });
});

// Define route for the sass compiler tool page
app.get("/tools/sass", (req, res) => {
  res.render("tools/sass", { appName, appEmail, currentYear });
});

// Define route for the jwt generator tool page
app.get("/tools/jwt", (req, res) => {
  res.render("tools/jwt", { appName, appEmail, currentYear });
});

// Define route for the image enhancement tool page
app.get("/tools/enhance", (req, res) => {
  res.render("tools/enhance", { appName, appEmail, currentYear });
});

// Define the tools list with titles, descriptions, and addresses
const tools = [
  {
    title: "Image Compressor",
    description:
      "Reduce the size of your images without compromising on quality.",
    category: "Image Tools",
    address: "/tools/compressor",
    icon: "fas fa-compress",
  },
  {
    title: "Image Resizer",
    description: "Easily resize your images to any dimensions.",
    category: "Image Tools",
    address: "/tools/resizer",
    icon: "fas fa-expand-arrows-alt",
  },
  {
    title: "Image Converter",
    description: "Convert your images from one format to another effortlessly.",
    category: "Image Tools",
    address: "/tools/converter",
    icon: "fas fa-exchange-alt",
  },
  {
    title: "Image Grayscale Converter",
    description: "Convert your images to grayscale effortlessly.",
    category: "Image Tools",
    address: "/tools/grayscale",
    icon: "fas fa-adjust",
  },
  {
    title: "Image to Base64 Converter",
    description:
      "Convert your images into Base64 strings for easy embedding in HTML or CSS.",
    category: "Image Tools",
    address: "/tools/image-base64",
    icon: "fas fa-code",
  },
  {
    title: "Color Picker (from image)",
    description:
      "Extract the dominant color and palette from your images with ease.",
    category: "Image Tools",
    address: "/tools/color-picker",
    icon: "fas fa-palette",
  },
  {
    title: "CSS Minifier",
    description:
      "Minify your CSS files to reduce their size and improve loading times.",
    category: "Web Tools",
    address: "/tools/css-minify",
    icon: "fab fa-css3-alt",
  },
  {
    title: "JS Minifier",
    description:
      "Minify your JavaScript files to reduce their size and improve loading times.",
    category: "Web Tools",
    address: "/tools/js-minify",
    icon: "fab fa-js",
  },
  {
    title: "SCSS/SASS Compiler",
    description:
      "Compile and minify your SCSS/SASS files to CSS with ease. Optimize your stylesheets for better performance.",
    category: "Web Tools",
    address: "/tools/sass",
    icon: "fab fa-sass",
  },
  {
    title: "JWT Generator",
    description:
      "Generate and validate JSON Web Tokens (JWT) for secure data exchange.",
    category: "Security Tools",
    address: "/tools/jwt",
    icon: "fas fa-key",
  },
  {
    title: "Image Enhancer",
    description:
      "Enhance your images with AI, improving clarity, resolution, and quality.",
    category: "Image Tools",
    address: "/tools/enhance",
    icon: "fas fa-image",
  },
];

// Define an API endpoint for searching tools
app.get("/api/v1/tools/search", (req, res) => {
  const { query = "", category = "" } = req.query;

  // Convert query and category to lower case for case-insensitive comparison
  const searchTerm = query.toLowerCase();
  const filterCategory = category.toLowerCase();

  // Filter tools based on query and category parameters
  const filteredTools = tools.filter((tool) => {
    const matchesQuery =
      searchTerm === "" ||
      tool.title.toLowerCase().includes(searchTerm) ||
      tool.description.toLowerCase().includes(searchTerm) ||
      tool.address.toLowerCase().includes(searchTerm);

    const matchesCategory =
      filterCategory === "" || tool.category.toLowerCase() === filterCategory;

    return matchesQuery && matchesCategory;
  });

  // Respond with the filtered list of tools
  res.json(filteredTools);
});

// Catch-all route for handling undefined routes (404 errors)
app.get("/*", (req, res) => {
  res.status(404).render("404", { appName, appEmail, currentYear });
});

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log("Server is running...");
});
