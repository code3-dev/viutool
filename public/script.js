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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categorySelect");
  const searchResults = document.getElementById("searchResults");

  // Function to perform the search
  async function performSearch() {
    const query = searchInput.value.trim();
    const category = categorySelect.value.trim();

    // Build the query string based on provided parameters
    let queryString = `/api/v1/tools/search?timestamp=${new Date().getTime()}`;
    if (query) queryString += `&query=${encodeURIComponent(query)}`;
    if (category) queryString += `&category=${encodeURIComponent(category)}`;

    try {
      const response = await fetch(queryString);
      if (!response.ok) throw new Error("Network response was not ok");
      const tools = await response.json();
      displaySearchResults(tools);
    } catch (error) {
      console.error("Fetch error:", error);
      searchResults.innerHTML =
        "<p class='text-red-500'>An error occurred while fetching the search results.</p>";
    }
  }

  // Function to display search results
  function displaySearchResults(tools) {
    searchResults.innerHTML = "";

    tools.forEach((tool) => {
      const toolElement = `
        <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow w-full md:w-1/3">
          <div class="flex items-center justify-center text-4xl text-blue-600 mb-4">
            <i class="${tool.icon}"></i>
          </div>
          <h3 class="text-2xl font-bold mb-4">${tool.title}</h3>
          <p class="text-gray-600 mb-6">${tool.description}</p>
          <a href="${tool.address}" class="bg-blue-600 text-white px-4 py-2 rounded">Go to Tool</a>
        </div>
      `;
      searchResults.insertAdjacentHTML("beforeend", toolElement);
    });
  }

  // Prevent the default form submission and perform the search on submit
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    performSearch();
  });

  // Add event listeners to input and select elements for real-time search
  searchInput.addEventListener("input", performSearch);
  categorySelect.addEventListener("change", performSearch);

  // Optional: Call performSearch on initial load to show results based on default values
  performSearch();
});
