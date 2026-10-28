const videoGrid = document.getElementById("video-grid");

if (videoGrid) {
    const category = document.body.dataset.category;

    const courseLists = {
        fullCourses: window.fullCourses,
        oneShots: window.oneShots,
        cqCourses: window.cqCourses,
        mcqCourses: window.mcqCourses
    };

    const courses = courseLists[category] || [];

    videoGrid.innerHTML = "";

    if (courses.length === 0) {
        videoGrid.innerHTML = "<p>No courses added yet.</p>";
    } else {
        courses.forEach(course => {
            const card = document.createElement("a");

            card.className = "video-card";
            card.href = course.url;
            card.target = "_blank";
            card.rel = "noopener noreferrer";

            const thumbnail = document.createElement("img");

            thumbnail.className = "video-thumbnail";
            thumbnail.src = course.thumbnail;
            thumbnail.alt = course.title;

            const info = document.createElement("div");
            info.className = "video-info";

            const title = document.createElement("h2");
            title.textContent = course.title;

            const creator = document.createElement("p");
            creator.textContent = course.creator;

            const details = document.createElement("p");
            details.className = "video-details";
            details.textContent = course.videos + " videos";

            info.append(title, creator, details);
            card.append(thumbnail, info);

            videoGrid.appendChild(card);
        });
    }
}
window.addEventListener("load", () => {
    requestAnimationFrame(() => {
        window.dispatchEvent(new Event("resize"));
    });
});
