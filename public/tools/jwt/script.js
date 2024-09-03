document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("menuButton").addEventListener("click", function () {
    document.getElementById("mobileMenu").classList.remove("translate-x-full");
    document.getElementById("overlay").classList.remove("hidden");
  });

  document.getElementById("closeButton").addEventListener("click", function () {
    document.getElementById("mobileMenu").classList.add("translate-x-full");
    document.getElementById("overlay").classList.add("hidden");
  });

  document.getElementById("overlay").addEventListener("click", function () {
    document.getElementById("mobileMenu").classList.add("translate-x-full");
    document.getElementById("overlay").classList.add("hidden");
  });

  // Generate Secret Button Functionality
  document
    .getElementById("generateSecretButton")
    .addEventListener("click", function () {
      const generatedSecret = generateRandomSecret();
      document.getElementById("secret").value = generatedSecret;
    });

  function generateRandomSecret() {
    // Generate a random 32-byte secret (encoded in base64)
    const randomBytes = new Uint8Array(32);
    window.crypto.getRandomValues(randomBytes);
    return btoa(String.fromCharCode.apply(null, randomBytes));
  }

  // Copy Button Functionality
  document.getElementById("copyButton").addEventListener("click", function () {
    const jwtToken = document.getElementById("jwtToken").textContent;
    navigator.clipboard.writeText(jwtToken).then(
      function () {
        alert("JWT copied to clipboard!");
      },
      function (err) {
        alert("Failed to copy JWT.");
        console.error("Error copying JWT: ", err);
      }
    );
  });

  // JWT Generation Form Submission
  document
    .getElementById("jwtForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const payloadInput = document.getElementById("payload").value;
      const secretInput = document.getElementById("secret").value;
      const expiresInInput = document.getElementById("expiresIn").value;
      const algorithmInput = document.getElementById("algorithm").value;

      if (!payloadInput || !secretInput) {
        alert("Payload and Secret are required fields!");
        return;
      }

      const payload = JSON.parse(payloadInput);
      const secret = secretInput;
      const options = {};

      if (expiresInInput) {
        options.expiresIn = expiresInInput;
      }
      if (algorithmInput) {
        options.algorithm = algorithmInput;
      }

      const requestBody = {
        payload,
        secret,
        options,
      };

      // Show loading spinner and hide results
      document.getElementById("loading").classList.remove("hidden");
      document.getElementById("result").classList.add("hidden");
      document.getElementById("jwtToken").classList.add("hidden");

      try {
        // Send the payload, secret, and options to the server for JWT generation
        const response = await fetch("/api/v1/generate-jwt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        document.getElementById("loading").classList.add("hidden");

        if (response.ok) {
          // Display the generated JWT token
          const jwtToken = document.getElementById("jwtToken");
          jwtToken.textContent = data.token;

          // Show the result section
          document.getElementById("result").classList.remove("hidden");
          document.getElementById("jwtToken").classList.remove("hidden");
        } else {
          alert("JWT generation failed!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while generating the JWT.");
        document.getElementById("loading").classList.add("hidden");
      }
    });

  // JWT Decoding Form Submission
  document
    .getElementById("jwtDecodeForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const jwtInput = document.getElementById("jwt").value;
      const decodeSecretInput = document.getElementById("decodeSecret").value;

      if (!jwtInput || !decodeSecretInput) {
        alert("JWT and Secret are required fields!");
        return;
      }

      const requestBody = {
        jwt: jwtInput,
        secret: decodeSecretInput,
      };

      // Show loading spinner and hide results
      document.getElementById("decodeLoading").classList.remove("hidden");
      document.getElementById("decodeResult").classList.add("hidden");

      try {
        // Send the JWT and secret to the server for decoding
        const response = await fetch("/api/v1/decode-jwt", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        document.getElementById("decodeLoading").classList.add("hidden");

        if (response.ok) {
          // Display the decoded JWT payload
          const decodedPayload = document.getElementById("decodedPayload");
          decodedPayload.textContent = JSON.stringify(data.payload, null, 2);

          // Show the result section
          document.getElementById("decodeResult").classList.remove("hidden");
        } else {
          alert("JWT decoding failed!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while decoding the JWT.");
        document.getElementById("decodeLoading").classList.add("hidden");
      }
    });
});
