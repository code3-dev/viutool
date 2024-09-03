const express = require("express");
const jwt = require("jsonwebtoken");

// Create an instance of the Express Router to handle routes separately
const router = express.Router();

// Existing route for generating JWT
router.post("/generate-jwt", (req, res) => {
  const { payload, secret, options } = req.body;

  if (!payload || !secret) {
    return res.status(400).json({ error: "Payload and secret are required!" });
  }

  try {
    const token = jwt.sign(payload, secret, options);
    res.json({ token });
  } catch (error) {
    console.error("Error during JWT generation:", error);
    res.status(500).json({ error: "JWT generation failed!" });
  }
});

// New route for decoding JWT
router.post("/decode-jwt", (req, res) => {
  const { jwt: token, secret } = req.body;

  if (!token || !secret) {
    return res.status(400).json({ error: "JWT and secret are required!" });
  }

  try {
    // Decode the JWT using the provided secret
    const decoded = jwt.verify(token, secret);
    res.json({ payload: decoded });
  } catch (error) {
    console.error("Error during JWT decoding:", error);
    res.status(500).json({ error: "JWT decoding failed!" });
  }
});

module.exports = router;
