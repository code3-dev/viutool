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
  const fileLabel = document.getElementById("fileLabel");
  const fileName = this.files.length
    ? this.files[0].name
    : "Click to Select Image";
  fileLabel.textContent = fileName;
});

document.getElementById("convertForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("image");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select an image file.");
    return;
  }

  const reader = new FileReader();

  // Show the loading spinner
  document.getElementById("loading").classList.remove("hidden");
  document.getElementById("result").classList.add("hidden");
  document.getElementById("downloadLink").classList.add("hidden");

  reader.onload = function () {
    const base64String = reader.result.split(",")[1]; // Get Base64 part only
    const base64DataURL = `data:${file.type};base64,${base64String}`;

    // Update the textarea with the complete Base64 data URL
    const base64Output = document.getElementById("base64Output");
    base64Output.value = base64DataURL;

    // Set up the download link
    const downloadLink = document.getElementById("downloadLink");
    const blob = new Blob([base64DataURL], { type: "text/plain" });
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = `${file.name}.txt`;
    downloadLink.classList.remove("hidden");

    // Hide the loading spinner and show the result section
    document.getElementById("loading").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    // Show success alert
    alert("Image successfully converted to Base64!");
  };

  reader.readAsDataURL(file);
});

document.getElementById("copyButton").addEventListener("click", function () {
  const base64Output = document.getElementById("base64Output");
  base64Output.select();
  document.execCommand("copy");
  alert("Base64 code copied to clipboard!");
});
