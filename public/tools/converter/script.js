document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
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

  // Update the file label when a file is selected
  document.getElementById("image").addEventListener("change", function () {
    const fileLabel = document.getElementById("fileLabel");
    const fileName = this.files.length
      ? this.files[0].name
      : "Click to Select Image";
    fileLabel.textContent = fileName;
  });

  // Handle image conversion
  document
    .getElementById("convertForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData();
      formData.append("image", document.getElementById("image").files[0]);
      formData.append("format", document.getElementById("format").value);

      // Show loading spinner and hide results
      document.getElementById("loading").classList.remove("hidden");
      document.getElementById("result").classList.add("hidden");
      document.getElementById("downloadLink").classList.add("hidden");

      try {
        // Send the image to the server for conversion
        const response = await fetch("/api/v1/convert", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        document.getElementById("loading").classList.add("hidden");

        if (response.ok) {
          // Get the converted image format and use it for the download link
          const format = data.format;
          const imgElement = document.getElementById("convertedImage");
          imgElement.src = `data:image/${format};base64,${data.base64}`;

          // Update the download link with the correct file format
          document.getElementById("downloadLink").href = imgElement.src;
          document.getElementById(
            "downloadLink"
          ).download = `converted-image.${format}`;
          document.getElementById("result").classList.remove("hidden");
          document.getElementById("downloadLink").classList.remove("hidden");
        } else {
          alert("Image conversion failed!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while converting the image.");
        document.getElementById("loading").classList.add("hidden");
      }
    });
});
