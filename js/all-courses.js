window.allCourses = [

    ...window.fullCourses.map(course => ({
        ...course,
        category: "Full Courses",
        page: "full-courses.html"
    })),

...window.oneShots.map(course => ({
    ...course,
    category: "One-Shots",
    page: "one-shots.html"
})),
...window.cqCourses.map(course => ({
    ...course,
    category: "CQ Solving",
    page: "cq.html"
})),

...window.mcqCourses.map(course => ({
    ...course,
    category: "MCQ Solving",
    page: "mcq.html"
}))

];
