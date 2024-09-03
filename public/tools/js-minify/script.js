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

document.getElementById("jsFile").addEventListener("change", function () {
  // Update the file label when a JS file is selected
  const fileLabel = document.getElementById("fileLabel");
  const fileName = this.files.length
    ? this.files[0].name
    : "Click to Select JS File";
  fileLabel.textContent = fileName;
});

document
  .getElementById("minifyForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", document.getElementById("jsFile").files[0]);

    // Show loading spinner and hide results
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");
    document.getElementById("downloadLink").classList.add("hidden");

    try {
      // Send the JS file to the server for minification
      const response = await fetch("/api/v1/js-minify", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      document.getElementById("loading").classList.add("hidden");

      if (response.ok) {
        // Create a Blob from the minified JS and generate a download link
        const blob = new Blob([data.minifiedCode], {
          type: "application/javascript",
        });
        const url = URL.createObjectURL(blob);

        // Update the download link with the Blob URL
        const downloadLink = document.getElementById("downloadLink");
        downloadLink.href = url;
        downloadLink.download = "minified.js";

        // Show the download link
        document.getElementById("result").classList.remove("hidden");
        document.getElementById("downloadLink").classList.remove("hidden");
      } else {
        alert("JS minification failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while minifying the JS.");
      document.getElementById("loading").classList.add("hidden");
    }
  });
