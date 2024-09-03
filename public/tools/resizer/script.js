document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuButton = document.getElementById("menuButton");
  const closeButton = document.getElementById("closeButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("overlay");

  menuButton.addEventListener("click", function () {
    mobileMenu.classList.remove("translate-x-full");
    overlay.classList.remove("hidden");
  });

  closeButton.addEventListener("click", function () {
    mobileMenu.classList.add("translate-x-full");
    overlay.classList.add("hidden");
  });

  overlay.addEventListener("click", function () {
    mobileMenu.classList.add("translate-x-full");
    overlay.classList.add("hidden");
  });

  // Update the file label and show image dimensions
  const fileInput = document.getElementById("image");
  const fileLabel = document.getElementById("fileLabel");
  const widthInput = document.getElementById("width");
  const heightInput = document.getElementById("height");
  const autoFixCheckbox = document.getElementById("autoFix");

  let image = new Image(); // Create a new image object
  let aspectRatio = 1;

  fileInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      fileLabel.textContent = file.name;

      const reader = new FileReader();
      reader.onload = function (e) {
        image.src = e.target.result;
        image.onload = function () {
          // Calculate and store the aspect ratio
          aspectRatio = image.width / image.height;

          // Update width and height inputs with the image dimensions
          widthInput.value = image.width;
          heightInput.value = image.height;
        };
      };
      reader.readAsDataURL(file);
    } else {
      fileLabel.textContent = "Click to Select Image";
      widthInput.value = "";
      heightInput.value = "";
    }
  });

  // Update the width and height display when the input changes
  widthInput.addEventListener("input", function () {
    if (autoFixCheckbox.checked) {
      const newWidth = this.value;
      heightInput.value = Math.round(newWidth / aspectRatio);
    }
  });

  heightInput.addEventListener("input", function () {
    if (autoFixCheckbox.checked) {
      const newHeight = this.value;
      widthInput.value = Math.round(newHeight * aspectRatio);
    }
  });

  // Handle form submission for resizing
  const resizeForm = document.getElementById("resizeForm");
  const downloadLink = document.getElementById("downloadLink");
  const resultDiv = document.getElementById("result");
  const loadingDiv = document.getElementById("loading");
  const imageInfo = document.getElementById("imageInfo");
  const resizedImage = document.getElementById("resizedImage");

  resizeForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const file = fileInput.files[0];
    const width = widthInput.value;
    const height = heightInput.value;

    if (!file) {
      alert("Please select an image file.");
      return;
    }

    if (!width || !height) {
      alert("Please enter width and height.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("width", width);
    formData.append("height", height);

    loadingDiv.classList.remove("hidden");
    resultDiv.classList.add("hidden");
    downloadLink.classList.add("hidden");

    try {
      const response = await fetch("/api/v1/resize", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      imageInfo.textContent = `Resized Image: ${data.width} x ${data.height}`;
      const format = data.format;
      resizedImage.src = `data:image/${format};base64,${data.base64}`;

      // Ensure the download link is set properly
      downloadLink.href = resizedImage.src;
      downloadLink.download = `resized-image.${format}`;
      downloadLink.classList.remove("hidden");

      resultDiv.classList.remove("hidden");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      loadingDiv.classList.add("hidden");
    }
  });
});
