
const TOTAL_WEEKS = 39;
const TASKS_PER_WEEK = 6;
const START_DATE = new Date(2026, 9, 26); // Monday, 26 October 2026
const STORAGE_KEY = "weeklyChecker_v3";

const plans = [
    {
        title: "Start with HTML",
        description: "Set up your routine and strengthen HTML fundamentals.",
        tasks: [
            "Study HTML structure, headings, paragraphs and links.",
            "Practice images, lists and semantic HTML tags.",
            "Build a simple personal profile webpage.",
            "Learn 5 English words and use them in sentences.",
            "Speak about yourself in English for 2 minutes.",
            "Revise everything you learned this week."
        ]
    },
    {
        title: "HTML Forms and Tables",
        description: "Build useful pages with forms and tables.",
        tasks: [
            "Learn HTML tables, rows, columns and captions.",
            "Practice forms, labels, inputs and buttons.",
            "Build a student registration form.",
            "Learn 5 English words related to technology.",
            "Give a 2-minute spoken introduction.",
            "Review HTML and improve your previous project."
        ]
    },
    {
        title: "CSS Foundations",
        description: "Start styling your websites with CSS.",
        tasks: [
            "Learn CSS selectors, colors and backgrounds.",
            "Practice margins, padding and borders.",
            "Learn font properties and text styling.",
            "Style your personal profile webpage.",
            "Explain your webpage in English for 2 minutes.",
            "Revise CSS basics and correct mistakes."
        ]
    },
    {
        title: "CSS Layout",
        description: "Understand how to arrange page elements.",
        tasks: [
            "Learn display, width, height and box sizing.",
            "Practice Flexbox alignment and spacing.",
            "Build a navigation bar using CSS.",
            "Create a simple card layout.",
            "Describe your CSS layout in English.",
            "Revise Flexbox and improve the layout."
        ]
    },
    {
        title: "Responsive Design",
        description: "Make your website work on mobile screens.",
        tasks: [
            "Learn media queries and responsive units.",
            "Make your navigation mobile-friendly.",
            "Build a responsive landing page.",
            "Test your website at different screen sizes.",
            "Practice speaking about responsive design.",
            "Fix mobile layout issues and revise."
        ]
    },
    {
        title: "CSS Polish",
        description: "Improve visual quality and consistency.",
        tasks: [
            "Practice transitions and hover effects.",
            "Learn shadows, gradients and border radius.",
            "Create a polished hero section.",
            "Review spacing and typography.",
            "Explain your design choices aloud.",
            "Polish and revise your landing page."
        ]
    },
    {
        title: "JavaScript Introduction",
        description: "Begin learning programming for the web.",
        tasks: [
            "Understand what JavaScript does in a website.",
            "Learn variables, let, const and data types.",
            "Practice console.log and simple expressions.",
            "Write 5 small JavaScript examples.",
            "Explain variables in simple English.",
            "Revise all JavaScript basics learned so far."
        ]
    },
    {
        title: "Conditions",
        description: "Teach your programs to make decisions.",
        tasks: [
            "Learn comparison and logical operators.",
            "Practice if, else if and else.",
            "Write a simple marks and grade checker.",
            "Solve 5 beginner condition exercises.",
            "Explain one program aloud in English.",
            "Revise conditions and fix errors."
        ]
    },
    {
        title: "Loops",
        description: "Repeat tasks using programming loops.",
        tasks: [
            "Understand for and while loops.",
            "Practice counting and number patterns.",
            "Write a multiplication table program.",
            "Solve 5 beginner loop exercises.",
            "Explain how one loop works.",
            "Revise conditions and loops together."
        ]
    },
    {
        title: "Functions",
        description: "Organize your JavaScript into reusable blocks.",
        tasks: [
            "Learn function declarations and parameters.",
            "Practice return values.",
            "Write 5 small reusable functions.",
            "Build a simple calculator function.",
            "Explain parameters and return values aloud.",
            "Revise functions and earlier topics."
        ]
    },
    {
        title: "Arrays",
        description: "Store and work with collections of data.",
        tasks: [
            "Learn arrays and array indexes.",
            "Practice push, pop and length.",
            "Loop through an array of names.",
            "Write a small marks list program.",
            "Explain arrays in your own words.",
            "Revise array exercises."
        ]
    },
    {
        title: "Objects",
        description: "Represent structured information in JavaScript.",
        tasks: [
            "Learn objects and key-value pairs.",
            "Practice reading and updating properties.",
            "Create a student object.",
            "Combine arrays and objects in a practice task.",
            "Describe your student object in English.",
            "Revise arrays and objects."
        ]
    },
    {
        title: "DOM Basics",
        description: "Connect JavaScript to your HTML page.",
        tasks: [
            "Understand the Document Object Model.",
            "Practice querySelector and getElementById.",
            "Change text and styles using JavaScript.",
            "Build a button that changes page text.",
            "Explain how JavaScript updates HTML.",
            "Revise DOM selection and updates."
        ]
    },
    {
        title: "Events",
        description: "Make webpages respond to user actions.",
        tasks: [
            "Learn click and input events.",
            "Practice addEventListener.",
            "Build an interactive counter.",
            "Create a button-based theme switcher.",
            "Explain event handling aloud.",
            "Revise DOM and event concepts."
        ]
    },
    {
        title: "Form Validation",
        description: "Make forms more useful and user-friendly.",
        tasks: [
            "Learn form submit events.",
            "Practice checking empty input fields.",
            "Show useful validation messages.",
            "Build a basic registration form demo.",
            "Explain the validation process in English.",
            "Revise forms, DOM and events."
        ]
    },
    {
        title: "Small JavaScript Project",
        description: "Combine your skills into a working project.",
        tasks: [
            "Plan a small interactive webpage.",
            "Build the HTML structure.",
            "Style the webpage with CSS.",
            "Add JavaScript interactions.",
            "Explain the project for 3 minutes.",
            "Test, fix and revise the complete project."
        ]
    },
    {
        title: "Git and GitHub",
        description: "Learn how to save and share your code.",
        tasks: [
            "Understand Git and version control.",
            "Install or open Git and check its setup.",
            "Learn repositories, commits and status.",
            "Create or update a GitHub repository.",
            "Practice explaining your project repository.",
            "Review Git basics and organize your files."
        ]
    },
    {
        title: "Portfolio Website",
        description: "Start creating a professional online presence.",
        tasks: [
            "Plan your portfolio sections.",
            "Create an About Me section.",
            "Add projects and skills to your portfolio.",
            "Make the portfolio responsive.",
            "Practice introducing your portfolio in English.",
            "Publish and test the portfolio."
        ]
    },
    {
        title: "Web Fundamentals Revision",
        description: "Strengthen your HTML, CSS and JavaScript foundation.",
        tasks: [
            "Revise semantic HTML and forms.",
            "Revise CSS layout and responsive design.",
            "Revise JavaScript conditions and loops.",
            "Revise functions, arrays and objects.",
            "Explain a project without reading notes.",
            "Fix 3 issues in your previous projects."
        ]
    },
    {
        title: "C Programming Revision",
        description: "Strengthen your college programming fundamentals.",
        tasks: [
            "Revise variables, data types and operators in C.",
            "Practice if-else and switch statements.",
            "Solve beginner loop exercises in C.",
            "Practice arrays and strings in C.",
            "Explain one C program aloud.",
            "Revise mistakes and organize your solutions."
        ]
    },
    {
        title: "Problem Solving",
        description: "Build logical thinking through small problems.",
        tasks: [
            "Solve 3 beginner number problems.",
            "Practice reversing a number.",
            "Practice sum and product of digits.",
            "Solve 3 problems using loops.",
            "Explain your solution step by step.",
            "Review errors and note what you learned."
        ]
    },
    {
        title: "DSA Introduction",
        description: "Get a beginner-friendly introduction to data structures.",
        tasks: [
            "Understand what data structures and algorithms mean.",
            "Revise arrays and their operations.",
            "Learn linear search.",
            "Practice finding minimum and maximum values.",
            "Explain linear search in English.",
            "Revise the problems you solved."
        ]
    },
    {
        title: "Searching and Sorting",
        description: "Learn the basics of finding and ordering data.",
        tasks: [
            "Practice linear search.",
            "Understand binary search prerequisites.",
            "Learn the idea behind bubble sort.",
            "Trace a sorting example on paper.",
            "Explain one search or sort algorithm.",
            "Revise searching and sorting basics."
        ]
    },
    {
        title: "Project Improvement",
        description: "Make your projects clearer and more reliable.",
        tasks: [
            "Choose one existing project to improve.",
            "Improve its layout and readability.",
            "Check mobile responsiveness.",
            "Test the main interactions.",
            "Write a clear project description.",
            "Update your GitHub repository."
        ]
    },
    {
        title: "Communication Basics",
        description: "Practice speaking clearly and confidently.",
        tasks: [
            "Practice a 2-minute self-introduction.",
            "Learn 5 useful everyday English phrases.",
            "Describe your daily routine in English.",
            "Read aloud for 10 minutes.",
            "Record a short spoken explanation.",
            "Review your recording and note improvements."
        ]
    },
    {
        title: "Speaking Practice",
        description: "Build comfort explaining familiar topics.",
        tasks: [
            "Speak about your hobbies for 2 minutes.",
            "Explain one project in simple English.",
            "Practice asking and answering 5 questions.",
            "Learn 5 words related to your studies.",
            "Record a short English practice session.",
            "Review clarity, pace and pronunciation."
        ]
    },
    {
        title: "Presentation Skills",
        description: "Learn to explain your work in an organized way.",
        tasks: [
            "Prepare a short project introduction.",
            "Explain the problem your project solves.",
            "Describe the tools you used.",
            "Practice a 3-minute presentation.",
            "Record your presentation once.",
            "Revise your explanation for clarity."
        ]
    },
    {
        title: "Interview Foundations",
        description: "Prepare answers to common beginner questions.",
        tasks: [
            "Draft your self-introduction.",
            "Prepare an answer about your strengths.",
            "Explain your favorite project.",
            "Practice 5 basic technical questions.",
            "Answer questions aloud without reading.",
            "Review and improve your answers."
        ]
    },
    {
        title: "Build a Useful Website",
        description: "Create something that solves a practical problem.",
        tasks: [
            "Choose a simple real-world problem.",
            "Plan the website sections and features.",
            "Build the HTML structure.",
            "Style the page with responsive CSS.",
            "Add an interaction if appropriate.",
            "Test the site and record improvements."
        ]
    },
    {
        title: "Website Finishing",
        description: "Polish a project for sharing with others.",
        tasks: [
            "Check all links and navigation.",
            "Improve spacing and readability.",
            "Check mobile and desktop layouts.",
            "Add meaningful page titles and alt text.",
            "Prepare a short project explanation.",
            "Publish or update the finished website."
        ]
    },
    {
        title: "Debugging Skills",
        description: "Get better at finding and fixing mistakes.",
        tasks: [
            "Learn to read browser console errors.",
            "Practice tracing JavaScript variables.",
            "Fix 3 small coding errors.",
            "Check HTML and CSS for common mistakes.",
            "Explain one bug and its solution.",
            "Write down debugging lessons learned."
        ]
    },
    {
        title: "Code Quality",
        description: "Make your code easier to read and maintain.",
        tasks: [
            "Use meaningful variable and function names.",
            "Organize HTML, CSS and JS into files.",
            "Remove unused code from one project.",
            "Use consistent indentation.",
            "Explain your code structure aloud.",
            "Review and improve one old project."
        ]
    },
    {
        title: "GitHub Portfolio",
        description: "Present your work in a clear and organized way.",
        tasks: [
            "Choose your best projects.",
            "Write a useful README for one project.",
            "Add screenshots where useful.",
            "Check repository names and descriptions.",
            "Practice explaining your GitHub profile.",
            "Review all project links."
        ]
    },
    {
        title: "Internship Research",
        description: "Understand entry-level opportunities and requirements.",
        tasks: [
            "Explore beginner web development internship listings.",
            "Write down common required skills.",
            "Compare your current skills with requirements.",
            "Identify 3 areas to improve.",
            "Practice explaining your learning journey.",
            "Create a realistic next-step learning plan."
        ]
    },
    {
        title: "Resume Basics",
        description: "Prepare a truthful, beginner-friendly resume.",
        tasks: [
            "Draft your education section.",
            "List skills you can actually demonstrate.",
            "Describe your projects clearly.",
            "Add relevant links to your portfolio.",
            "Practice a short introduction about yourself.",
            "Proofread and improve your resume."
        ]
    },
    {
        title: "Mock Interview",
        description: "Practice answering questions with confidence.",
        tasks: [
            "Answer 5 HTML and CSS questions.",
            "Answer 5 JavaScript basics questions.",
            "Explain one project from start to finish.",
            "Practice a 2-minute self-introduction.",
            "Record a mock interview session.",
            "Review answers and note topics to revise."
        ]
    },
    {
        title: "Final Project",
        description: "Bring your learning together in one project.",
        tasks: [
            "Choose your final project idea.",
            "Plan its pages and features.",
            "Build and style the main interface.",
            "Add and test the required interactions.",
            "Prepare a project presentation.",
            "Test the project and publish it."
        ]
    },
    {
        title: "Final Review and Next Steps",
        description: "Review your progress and plan your next stage.",
        tasks: [
            "Review the projects you built.",
            "Revisit your weakest technical topics.",
            "Practice explaining your best project.",
            "Review your resume and GitHub profile.",
            "Reflect on your communication progress.",
            "Write your next 3-month learning plan."
        ]
    }
];

// Load saved data safely.
function loadSavedData() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return saved && typeof saved === "object" ? saved : {};
    } catch (error) {
        return {};
    }
}

let savedData = loadSavedData();
let currentWeek = 1;

const weekSelect = document.getElementById("weekSelect");
const weekTitle = document.getElementById("weekTitle");
const weekDates = document.getElementById("weekDates");
const weekDescription = document.getElementById("weekDescription");
const taskList = document.getElementById("taskList");
const weekNotes = document.getElementById("weekNotes");
const saveStatus = document.getElementById("saveStatus");
const roadmap = document.getElementById("roadmap");

function getWeekDates(weekNumber) {
    const start = new Date(START_DATE);
    start.setDate(start.getDate() + (weekNumber - 1) * 7);

    const end = new Date(start);
    end.setDate(end.getDate() + 6);

    const options = {
        day: "numeric",
        month: "short",
        year: "numeric"
    };

    return {
        start: start.toLocaleDateString("en-IN", options),
        end: end.toLocaleDateString("en-IN", options)
    };
}

function getWeekData(weekNumber) {
    const key = String(weekNumber);

    if (!savedData[key]) {
        savedData[key] = {
            tasks: {},
            notes: ""
        };
    }

    if (!savedData[key].tasks) {
        savedData[key].tasks = {};
    }

    return savedData[key];
}

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData));
        saveStatus.textContent = "✓ Saved in your browser";
    } catch (error) {
        saveStatus.textContent = "Could not save data";
    }
}

function getCompletedCount(weekNumber) {
    const data = getWeekData(weekNumber);

    return plans[weekNumber - 1].tasks.filter(
        (_, index) => data.tasks[index] === true
    ).length;
}

function getWeekPercent(weekNumber) {
    return Math.round(
        (getCompletedCount(weekNumber) / TASKS_PER_WEEK) * 100
    );
}

function getOverallPercent() {
    let totalCompleted = 0;

    for (let week = 1; week <= TOTAL_WEEKS; week++) {
        totalCompleted += getCompletedCount(week);
    }

    return Math.round(
        (totalCompleted / (TOTAL_WEEKS * TASKS_PER_WEEK)) * 100
    );
}

function populateWeekSelect() {
    weekSelect.innerHTML = "";

    for (let week = 1; week <= TOTAL_WEEKS; week++) {
        const dates = getWeekDates(week);
        const option = document.createElement("option");

        option.value = week;
        option.textContent =
            `Week ${week} — ${dates.start} to ${dates.end}`;

        weekSelect.appendChild(option);
    }
}

function renderTasks() {
    const plan = plans[currentWeek - 1];
    const data = getWeekData(currentWeek);

    taskList.innerHTML = "";

    plan.tasks.forEach((task, index) => {
        const label = document.createElement("label");
        label.className = "task-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = data.tasks[index] === true;

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task;

        if (checkbox.checked) {
            label.classList.add("done");
        }

        checkbox.addEventListener("change", () => {
            data.tasks[index] = checkbox.checked;

            label.classList.toggle("done", checkbox.checked);

            saveData();
            renderStats();
            renderRoadmap();
        });

        label.appendChild(checkbox);
        label.appendChild(text);
        taskList.appendChild(label);
    });
}

function renderStats() {
    const completed = getCompletedCount(currentWeek);
    const weeklyPercent = getWeekPercent(currentWeek);
    const overallPercent = getOverallPercent();

    document.getElementById("weeklyProgress").textContent =
        `${weeklyPercent}%`;

    document.getElementById("weeklyBar").style.width =
        `${weeklyPercent}%`;

    document.getElementById("tasksCompleted").textContent =
        `${completed}/${TASKS_PER_WEEK}`;

    document.getElementById("taskCount").textContent =
        `${completed}/${TASKS_PER_WEEK}`;

    document.getElementById("overallProgress").textContent =
        `${overallPercent}%`;

    document.getElementById("overallBar").style.width =
        `${overallPercent}%`;

    const message = document.getElementById("completionMessage");

    if (completed === TASKS_PER_WEEK) {
        message.textContent =
            "Amazing! You completed every goal this week. Keep it up!";
        message.classList.add("complete");
    } else {
        message.textContent =
            `${TASKS_PER_WEEK - completed} tasks left. Keep going, one step at a time!`;
        message.classList.remove("complete");
    }
}

function renderRoadmap() {
    roadmap.innerHTML = "";

    for (let week = 1; week <= TOTAL_WEEKS; week++) {
        const dates = getWeekDates(week);
        const percent = getWeekPercent(week);

        const button = document.createElement("button");
        button.type = "button";
        button.className = "roadmap-week";

        if (week === currentWeek) {
            button.classList.add("selected");
        }

        if (percent === 100) {
            button.classList.add("complete");
        }

        const title = document.createElement("strong");
        title.textContent = `Week ${week}`;

        const dateText = document.createElement("span");
        dateText.textContent = `${dates.start} – ${dates.end}`;

        const progressText = document.createElement("span");
        progressText.textContent = `${percent}% completed`;

        const track = document.createElement("div");
        track.className = "mini-progress";

        const fill = document.createElement("div");
        fill.style.width = `${percent}%`;

        track.appendChild(fill);
        button.append(title, dateText, progressText, track);

        button.addEventListener("click", () => {
            selectWeek(week);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        roadmap.appendChild(button);
    }
}

function renderDashboard() {
    const plan = plans[currentWeek - 1];
    const dates = getWeekDates(currentWeek);
    const data = getWeekData(currentWeek);

    weekTitle.textContent = `Week ${currentWeek}`;
    weekDates.textContent = `${dates.start} – ${dates.end}`;
    weekDescription.textContent = plan.description;

    weekSelect.value = String(currentWeek);
    weekNotes.value = data.notes || "";

    renderTasks();
    renderStats();
    renderRoadmap();
}

function selectWeek(weekNumber) {
    currentWeek = Math.min(
        TOTAL_WEEKS,
        Math.max(1, Number(weekNumber) || 1)
    );

    renderDashboard();
}

weekSelect.addEventListener("change", () => {
    selectWeek(Number(weekSelect.value));
});

weekNotes.addEventListener("input", () => {
    getWeekData(currentWeek).notes = weekNotes.value;
    saveData();
});

document.getElementById("clearNotes").addEventListener("click", () => {
    const confirmed = window.confirm(
        "Clear the notes for this week?"
    );

    if (!confirmed) return;

    getWeekData(currentWeek).notes = "";
    weekNotes.value = "";
    saveData();
});

populateWeekSelect();
renderDashboard();
