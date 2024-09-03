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

document.getElementById("image").addEventListener("change", function () {
  // Update the file label when a file is selected
  const fileLabel = document.getElementById("fileLabel");
  const fileName = this.files.length
    ? this.files[0].name
    : "Click to Select Image";
  fileLabel.textContent = fileName;
});

document
  .getElementById("grayscaleForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", document.getElementById("image").files[0]);

    // Show loading spinner and hide results
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
    document.getElementById("downloadLink").classList.add("hidden");

    try {
      // Send the image to the server for grayscale conversion
      const response = await fetch("/api/v1/grayscale", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      document.getElementById("loading").classList.add("hidden");

      if (response.ok) {
        // Get the grayscale image format and use it for the download link
        const format = data.format;
        const imgElement = document.getElementById("grayscaleImage");
        imgElement.src = `data:image/${format};base64,${data.base64}`;

        // Update the download link with the correct file format
        document.getElementById("downloadLink").href = imgElement.src;
        document.getElementById(
          "downloadLink"
        ).download = `grayscale-image.${format}`;
        document.getElementById("result").classList.remove("hidden");
        document.getElementById("downloadLink").classList.remove("hidden");
      } else {
        alert("Image conversion to grayscale failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while converting the image to grayscale.");
      document.getElementById("loading").classList.add("hidden");
    }
  });
