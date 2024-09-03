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

document.getElementById("colorImage").addEventListener("change", function () {
  const fileLabelColor = document.getElementById("fileLabelColor");
  const fileName = this.files.length
    ? this.files[0].name
    : "Click to Select Image";
  fileLabelColor.textContent = fileName;
});

document
  .getElementById("colorPickerForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const fileInput = document.getElementById("colorImage");
    const colorCountSelect = document.getElementById("colorCount");
    const file = fileInput.files[0];
    const colorCount = colorCountSelect.value;

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("colorCount", colorCount); // Add color count to form data

    // Show the loading spinner
    document.getElementById("loadingColor").classList.remove("hidden");
    document.getElementById("colorResults").classList.add("hidden");

    try {
      const response = await fetch("/api/v1/color-picker", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        const dominantColor = data.dominantColor;
        const palette = data.palette;

        document.getElementById("dominantColor").textContent = dominantColor;
        document.getElementById("dominantColorBox").style.backgroundColor =
          dominantColor;

        const paletteContainer = document.getElementById("palette");
        paletteContainer.innerHTML = ""; // Clear any previous palette

        palette.forEach((color) => {
          const colorBox = document.createElement("div");
          colorBox.className = "w-16 h-16 bg-cover border border-gray-300";
          colorBox.style.backgroundColor = color;

          const colorCode = document.createElement("p");
          colorCode.className = "text-center mt-1 font-mono text-sm";
          colorCode.textContent = color;

          paletteContainer.appendChild(colorBox);
          paletteContainer.appendChild(colorCode);
        });

        // Hide the loading spinner and show the color results
        document.getElementById("loadingColor").classList.add("hidden");
        document.getElementById("colorResults").classList.remove("hidden");
      } else {
        document.getElementById("loadingColor").classList.add("hidden");
        throw new Error(data.error || "An error occurred.");
      }
    } catch (error) {
      document.getElementById("loadingColor").classList.add("hidden");
      console.error("Error during color extraction:", error);
      alert("Failed to extract colors. Please try again.");
    }
  });
