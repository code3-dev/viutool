# ViuTool Documentation

Welcome to the **ViuTool** project! This documentation will guide you through the setup, usage, and architecture of the application.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Clone the Repository](#clone-the-repository)
   - [Install Dependencies](#install-dependencies)
   - [Configuration](#configuration)
   - [Running the Application](#running-the-application)
   - [Build Tailwind CSS](#build-tailwind-css)
3. [Project Structure](#project-structure)
4. [Libraries and Dependencies](#libraries-and-dependencies)
5. [Contact Us](#contact-us)
6. [License](#license)

## Introduction

**ViuTool** is a powerful toolset offering various image manipulation and web utility tools, such as image compressors, resizers, format converters, and more. The application is built with Express.js and EJS for server-side rendering, providing a sleek and efficient interface for a range of utilities.

## Getting Started

### Clone the Repository

To start using ViuTool, first, clone the repository from GitHub:

```bash
git clone https://github.com/code3-dev/viutool.git
cd viutool
```

### Install Dependencies

Once you have the repository, install the required dependencies using npm:

```bash
npm install
```

### Configuration

Before running the application, configure the environment variables by editing a `config.env` file in the root directory. Here's an example:

```bash
APP_NAME=ViuTool
APP_EMAIL=h3dev.pira@gmail.com
```

### Running the Application

You can run the application in either production or development mode:

#### Production Mode

To start the application in production mode, use:

```bash
npm start
```

The application will be accessible on port `3000`.

#### Development Mode

For development mode with hot-reloading, use:

```bash
npm run dev
```

### Build Tailwind CSS

If you make any changes to the styles and need to rebuild the Tailwind CSS, use the following command:

```bash
npm run build:css
```

This command will compile and minify your CSS files.

## Project Structure

The project is organized as follows:

- **`public/`**: Contains static assets, including styles and client-side JavaScript.
  
- **`views/`**: Contains the EJS templates used for server-side rendering.

- **`routes/`**: Contains the API route modules that handle different functionalities.

- **`app.js`**: The main application file that sets up the Express server, defines routes, and starts the application.

- **`config.env`**: The environment configuration file, loaded via `dotenv`.

## Libraries and Dependencies

The following libraries are used in this project:

### Dependencies

- **[express](https://www.npmjs.com/package/express)**: Web framework for Node.js.
- **[ejs](https://www.npmjs.com/package/ejs)**: Template engine for rendering HTML with embedded JavaScript.
- **[dotenv](https://www.npmjs.com/package/dotenv)**: Module to load environment variables from a `.env` file.
- **[body-parser](https://www.npmjs.com/package/body-parser)**: Middleware for parsing incoming request bodies in a middleware before your handlers.
- **[sharp](https://sharp.pixelplumbing.com)**: High-performance image processing.
- **[multer](https://www.npmjs.com/package/multer)**: Middleware for handling multipart/form-data, primarily used for file uploads.
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: Implementation of JSON Web Tokens (JWT).
- **[clean-css](https://www.npmjs.com/package/clean-css)**: Minifier for CSS.
- **[uglify-js](https://www.npmjs.com/package/uglify-js)**: Minifier for JavaScript.
- **[sass](https://sass-lang.com)**: Compiler for SCSS/SASS to CSS.
- **[colorthief](https://lokeshdhakar.com/projects/color-thief)**: Extracts the dominant color from an image.
- **[@fortawesome/fontawesome-free](https://www.npmjs.com/package/@fortawesome/fontawesome-free)**: Icon library providing free and premium icons in SVG and web font formats.
- **[nodemon](https://nodemon.io)**: Utility that monitors changes in your Node.js application and automatically restarts the server.
- **[tailwindcss](https://tailwindcss.com)**: Utility-first CSS framework for rapid UI development.
- **[path](https://nodejs.org/api/path.html)**: Node.js module for working with file and directory paths.

## Contact Us

If you have any questions, feedback, or need assistance, feel free to reach out to us:

- **Email**: [h3dev.pira@gmail.com](mailto:h3dev.pira@gmail.com)
- **Telegram**: [@h3dev](https://t.me/h3dev)
- **Instagram**: [@h3dev.pira](https://www.instagram.com/h3dev.pira/)

## License

This project is licensed under the MIT License.