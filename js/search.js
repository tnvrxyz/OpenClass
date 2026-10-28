const searchInput = document.querySelector(".search");

if (searchInput) {
    const searchResults = document.createElement("div");
    searchResults.className = "search-results";

    document.body.appendChild(searchResults);

    function positionResults() {
        const rect = searchInput.getBoundingClientRect();

        searchResults.style.position = "fixed";
        searchResults.style.top = (rect.bottom + 15) + "px";
        searchResults.style.left = rect.left + "px";
        searchResults.style.width = rect.width + "px";
    }

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase().trim();

        searchResults.innerHTML = "";

        if (!query) {
            searchResults.style.display = "none";
            return;
        }
        const matches = (window.allCourses || []).filter(course =>
        course.title.toLowerCase().includes(query) ||
        course.creator.toLowerCase().includes(query)
        );

        positionResults();
        searchResults.style.display = "block";

        if (matches.length === 0) {
            searchResults.innerHTML = "<p>No courses found.</p>";
            return;
        }

        matches.forEach(course => {
            const result = document.createElement("a");
            result.className = "search-result";
            result.href = course.url;
            result.target = "_blank";
            result.rel = "noopener noreferrer";

            const title = document.createElement("strong");
            title.textContent = course.title;

            const details = document.createElement("p");
            details.textContent =
            course.creator + " · " + course.category;

            result.append(title, details);
            searchResults.appendChild(result);
        });
    });
    searchInput.addEventListener("focus", positionResults);

    window.addEventListener("resize", () => {
        if (searchResults.style.display === "block") {
            positionResults();
        }
    });

    document.addEventListener("click", event => {
        if (
            !searchInput.contains(event.target) &&
            !searchResults.contains(event.target)
        ) {
            searchResults.style.display = "none";
        }
    });
}
