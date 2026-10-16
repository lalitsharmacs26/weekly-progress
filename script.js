
const TOTAL_WEEKS = 39;
const TASKS_PER_WEEK = 6;
const START_DATE = new Date(2026, 9, 26);
const STORAGE_KEY = "weeklyCheckerPro_v1";

const plans = [
    ["HTML Foundations", "Learn page structure, headings, links and images."],
    ["HTML Forms & Tables", "Practice forms, labels, inputs and tables."],
    ["CSS Foundations", "Learn selectors, colors, fonts, margins and padding."],
    ["CSS Layout", "Practice Flexbox, spacing and navigation bars."],
    ["Responsive Design", "Make your pages work on mobile and desktop."],
    ["CSS Polish", "Practice gradients, transitions, hover effects and shadows."],
    ["JavaScript Introduction", "Learn variables, data types and console.log."],
    ["Conditions", "Practice comparison operators and if-else statements."],
    ["Loops", "Learn for loops, while loops and number patterns."],
    ["Functions", "Practice parameters, return values and reusable code."],
    ["Arrays", "Learn indexes, array methods and looping through arrays."],
    ["Objects", "Store structured information using JavaScript objects."],
    ["DOM Basics", "Select HTML elements and change their content."],
    ["Events", "Use click and input events to make pages interactive."],
    ["Form Validation", "Check form input and display helpful messages."],
    ["Mini JavaScript Project", "Combine HTML, CSS and JavaScript in a project."],
    ["Git & GitHub", "Learn repositories, commits and sharing your code."],
    ["Portfolio Website", "Build a portfolio to present your skills and projects."],
    ["Web Fundamentals Revision", "Revise HTML, CSS and JavaScript basics."],
    ["C Programming Revision", "Practice variables, conditions, loops and arrays in C."],
    ["Problem Solving", "Solve beginner number problems and logic exercises."],
    ["DSA Introduction", "Understand arrays, algorithms and linear search."],
    ["Searching & Sorting", "Practice searching and basic sorting algorithms."],
    ["Project Improvement", "Improve the design and functionality of an old project."],
    ["Communication Basics", "Practice everyday English and self-introduction."],
    ["Speaking Practice", "Explain familiar topics in simple English."],
    ["Presentation Skills", "Prepare a clear presentation about one project."],
    ["Interview Foundations", "Practice basic technical and personal questions."],
    ["Useful Website Project", "Build a website that solves a practical problem."],
    ["Website Finishing", "Test links, mobile layout and website readability."],
    ["Debugging Skills", "Learn to read errors and fix common coding mistakes."],
    ["Code Quality", "Organize files and make code easier to understand."],
    ["GitHub Portfolio", "Improve repository descriptions and project READMEs."],
    ["Internship Research", "Research beginner opportunities and required skills."],
    ["Resume Basics", "Create a truthful resume featuring your real skills."],
    ["Mock Interview", "Practice explaining projects and answering questions."],
    ["Final Project Planning", "Plan a project that combines your learning."],
    ["Final Project Building", "Build, test and present your final project."],
    ["Final Review & Next Steps", "Review your progress and plan the next three months."]
];

const taskTemplates = [
    "Study the main concepts for this week's topic.",
    "Write and test at least 3 small practice examples.",
    "Build one small exercise or practical example.",
    "Revise your notes and correct earlier mistakes.",
    "Explain what you learned aloud for 2–3 minutes.",
    "Review your work and note what to improve next."
];

function localDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function loadData() {
    try {
        const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return value && typeof value === "object"
            ? value
            : { weeks: {}, days: {} };
    } catch {
        return { weeks: {}, days: {} };
    }
}

let appData = loadData();
appData.weeks ||= {};
appData.days ||= {};

let currentWeek = 1;
let timerSeconds = 25 * 60;
let timerInterval = null;
let timerRunning = false;
let timerMode = "Focus session";
let selectedMinutes = 25;

const $ = id => document.getElementById(id);

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
        $("saveStatus").textContent = "✓ Saved in your browser";
        $("footerStatus").textContent = "✓ Progress saved locally";
    } catch {
        $("saveStatus").textContent = "Unable to save. Browser storage may be full.";
        $("footerStatus").textContent = "Saving failed";
    }
}

function getWeekDates(weekNumber) {
    const start = new Date(START_DATE);
    start.setDate(start.getDate() + (weekNumber - 1) * 7);

    const end = new Date(start);
    end.setDate(end.getDate() + 6);

    const format = date => date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    return { start, end, label: `${format(start)} – ${format(end)}` };
}

function getWeekData(weekNumber) {
    const key = String(weekNumber);

    if (!appData.weeks[key]) {
        appData.weeks[key] = { tasks: {}, notes: "" };
    }

    appData.weeks[key].tasks ||= {};
    return appData.weeks[key];
}

function getTasks(weekNumber) {
    const [title, description] = plans[weekNumber - 1];

    return [
        `Study ${title}: ${description}`,
        taskTemplates[1],
        taskTemplates[2],
        taskTemplates[3],
        taskTemplates[4],
        taskTemplates[5]
    ];
}

function completedInWeek(weekNumber) {
    const data = getWeekData(weekNumber);
    return Object.values(data.tasks).filter(Boolean).length;
}

function weekPercent(weekNumber) {
    return Math.round(completedInWeek(weekNumber) / TASKS_PER_WEEK * 100);
}

function overallPercent() {
    let total = 0;

    for (let week = 1; week <= TOTAL_WEEKS; week++) {
        total += completedInWeek(week);
    }

    return Math.round(total / (TOTAL_WEEKS * TASKS_PER_WEEK) * 100);
}

function populateWeekSelect() {
    $("weekSelect").innerHTML = "";

    for (let week = 1; week <= TOTAL_WEEKS; week++) {
        const dates = getWeekDates(week);
        const option = document.createElement("option");

        option.value = week;
        option.textContent = `Week ${week} — ${dates.label}`;
        $("weekSelect").appendChild(option);
    }
}

function renderTasks() {
    const data = getWeekData(currentWeek);
    const tasks = getTasks(currentWeek);
    const list = $("taskList");

    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const label = document.createElement("label");
        label.className = "task-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = data.tasks[index] === true;

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task;

        if (checkbox.checked) label.classList.add("done");

        checkbox.addEventListener("change", () => {
            data.tasks[index] = checkbox.checked;
            label.classList.toggle("done", checkbox.checked);

            saveData();
            renderStats();
            renderRoadmap();
            renderAnalytics();
        });

        label.append(checkbox, text);
        list.appendChild(label);
    });
}

function renderStats() {
    const completed = completedInWeek(currentWeek);
    const weekly = weekPercent(currentWeek);
    const overall = overallPercent();

    $("weeklyProgress").textContent = `${weekly}%`;
    $("weeklyBar").style.width = `${weekly}%`;
    $("tasksCompleted").textContent = `${completed}/6`;
    $("taskCount").textContent = `${completed}/6`;
    $("overallProgress").textContent = `${overall}%`;
    $("overallBar").style.width = `${overall}%`;

    const message = $("completionMessage");
    message.classList.toggle("complete", completed === TASKS_PER_WEEK);
    message.textContent = completed === TASKS_PER_WEEK
        ? "Amazing! You completed every goal this week. Keep it up!"
        : `${TASKS_PER_WEEK - completed} tasks left. Keep going, one step at a time!`;
}

function renderDashboard() {
    const [title, description] = plans[currentWeek - 1];
    const dates = getWeekDates(currentWeek);
    const data = getWeekData(currentWeek);

    $("weekTitle").textContent = `Week ${currentWeek}: ${title}`;
    $("weekDates").textContent = dates.label;
    $("weekDescription").textContent = description;
    $("weekSelect").value = String(currentWeek);
    $("weekNotes").value = data.notes || "";

    renderTasks();
    renderStats();
    renderRoadmap();
    renderAnalytics();
}

function selectWeek(week) {
    currentWeek = Math.max(1, Math.min(TOTAL_WEEKS, Number(week) || 1));
    renderDashboard();
}

$("weekSelect").addEventListener("change", event => {
    selectWeek(event.target.value);
});

$("weekNotes").addEventListener("input", () => {
    getWeekData(currentWeek).notes = $("weekNotes").value;
    saveData();
});

$("clearNotes").addEventListener("click", () => {
    if (!confirm("Clear notes for this week?")) return;

    getWeekData(currentWeek).notes = "";
    $("weekNotes").value = "";
    saveData();
});

function renderRoadmap() {
    const roadmap = $("roadmap");
    roadmap.innerHTML = "";

    for (let week = 1; week <= TOTAL_WEEKS; week++) {
        const [title] = plans[week - 1];
        const dates = getWeekDates(week);
        const percent = weekPercent(week);
        const button = document.createElement("button");

        button.type = "button";
        button.className = "roadmap-week";
        if (week === currentWeek) button.classList.add("selected");
        if (percent === 100) button.classList.add("complete");

        const name = document.createElement("strong");
        name.textContent = `Week ${week}: ${title}`;

        const date = document.createElement("span");
        date.textContent = dates.label;

        const progress = document.createElement("span");
        progress.textContent = `${percent}% complete`;

        const track = document.createElement("div");
        track.className = "mini-progress";

        const fill = document.createElement("div");
        fill.style.width = `${percent}%`;
        track.appendChild(fill);

        button.append(name, date, progress, track);
        button.addEventListener("click", () => {
            selectWeek(week);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        roadmap.appendChild(button);
    }
}

// Daily focus and streak

const dailyTaskLabels = [
    "Complete today's coding practice",
    "Practice English speaking",
    "Revise what I learned"
];

function getTodayData() {
    const key = localDateKey();
    if (!appData.days[key]) appData.days[key] = { tasks: [false, false, false] };

    const data = appData.days[key];
    if (!Array.isArray(data.tasks)) data.tasks = [false, false, false];

    while (data.tasks.length < 3) data.tasks.push(false);
    return data;
}

function isDayComplete(key) {
    const day = appData.days[key];
    return Boolean(day && Array.isArray(day.tasks) && day.tasks.length >= 3
        && day.tasks.slice(0, 3).every(Boolean));
}

function calculateStreak() {
    let streak = 0;
    const today = new Date();

    // If today isn't complete yet, count the completed streak ending yesterday.
    if (!isDayComplete(localDateKey(today))) {
        today.setDate(today.getDate() - 1);
    }

    for (let i = 0; i < 366; i++) {
        const key = localDateKey(today);

        if (!isDayComplete(key)) break;

        streak++;
        today.setDate(today.getDate() - 1);
    }

    return streak;
}

function renderDailyTasks() {
    const today = new Date();
    $("todayDate").textContent = today.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const data = getTodayData();
    const container = $("dailyTasks");
    container.innerHTML = "";

    dailyTaskLabels.forEach((task, index) => {
        const label = document.createElement("label");
        label.className = "daily-task";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = data.tasks[index] === true;

        const text = document.createElement("span");
        text.textContent = task;

        if (checkbox.checked) label.classList.add("done");

        checkbox.addEventListener("change", () => {
            data.tasks[index] = checkbox.checked;
            label.classList.toggle("done", checkbox.checked);
            saveData();
            updateStreak();
            renderDailyStatus();
        });

        label.append(checkbox, text);
        container.appendChild(label);
    });

    renderDailyStatus();
    updateStreak();
}

function renderDailyStatus() {
    const count = getTodayData().tasks.filter(Boolean).length;

    $("dailyStatus").textContent = count === 3
        ? "✓ All daily goals complete!"
        : `${count}/3 daily habits complete`;
}

function updateStreak() {
    $("streakCount").textContent = calculateStreak();
}

// Progress chart: each bar opens its corresponding week.

function renderAnalytics() {
    const container = $("analytics");
    if (!container) return;

    container.innerHTML = "";

    for (let week = 1; week <= TOTAL_WEEKS; week++) {
        const percent = weekPercent(week);
        const button = document.createElement("button");

        button.type = "button";
        button.className = "chart-week";
        button.title = `Week ${week}: ${percent}% complete`;

        if (week === currentWeek) button.classList.add("selected");

        const area = document.createElement("span");
        area.className = "chart-bar-area";

        const bar = document.createElement("span");
        bar.className = "chart-bar";
        bar.style.height = `${percent}%`;
        area.appendChild(bar);

        const number = document.createElement("strong");
        number.textContent = `W${week}`;

        const value = document.createElement("small");
        value.textContent = `${percent}%`;

        button.append(area, number, value);
        button.addEventListener("click", () => {
            selectWeek(week);
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        container.appendChild(button);
    }
}

// Study timer

function updateTimerDisplay() {
    const minutes = Math.floor(timerSeconds / 60);
    const seconds = timerSeconds % 60;

    $("timerDisplay").textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function stopTimer() {
    if (timerInterval !== null) clearInterval(timerInterval);
    timerInterval = null;
    timerRunning = false;
}

function chooseTimer(minutes, mode, button) {
    stopTimer();
    selectedMinutes = minutes;
    timerSeconds = minutes * 60;
    timerMode = mode;

    $("timerMode").textContent = mode;
    $("timerMessage").textContent = "Ready when you are. Let's focus!";
    document.querySelectorAll(".mode-button").forEach(item => {
        item.classList.toggle("active", item === button);
    });

    updateTimerDisplay();
    $("startTimer").textContent = "Start";
}

$("startTimer").addEventListener("click", () => {
    if (timerRunning) return;

    if (timerSeconds <= 0) timerSeconds = selectedMinutes * 60;

    timerRunning = true;
    $("startTimer").textContent = "Running...";
    $("timerMessage").textContent = `${timerMode} in progress. Keep going!`;

    timerInterval = setInterval(() => {
        timerSeconds--;
        updateTimerDisplay();

        if (timerSeconds <= 0) {
            stopTimer();
            $("startTimer").textContent = "Start";
            $("timerMessage").textContent = `${timerMode} finished! Take a moment to reset.`;

            // Browser may block notifications or sound, so the page message is reliable.
            alert(`${timerMode} finished!`);
        }
    }, 1000);
});

$("pauseTimer").addEventListener("click", () => {
    stopTimer();
    $("startTimer").textContent = "Resume";
    $("timerMessage").textContent = "Timer paused.";
});

$("resetTimer").addEventListener("click", () => {
    stopTimer();
    timerSeconds = selectedMinutes * 60;
    $("startTimer").textContent = "Start";
    $("timerMessage").textContent = "Timer reset. Ready when you are!";
    updateTimerDisplay();
});

document.querySelectorAll(".mode-button").forEach(button => {
    button.addEventListener("click", () => {
        chooseTimer(
            Number(button.dataset.minutes),
            button.dataset.mode,
            button
        );
    });
});

// Export all saved progress as a JSON backup.

$("exportBtn").addEventListener("click", () => {
    const backup = {
        exportedAt: new Date().toISOString(),
        startDate: "2026-10-26",
        totalWeeks: TOTAL_WEEKS,
        plans,
        progress: appData
    };

    const blob = new Blob([JSON.stringify(backup, null, 2)], {
        type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `weekly-checker-backup-${localDateKey()}.json`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    $("footerStatus").textContent = "Progress backup exported.";
});

// Start the app.

populateWeekSelect();
renderDashboard();
renderDailyTasks();
updateTimerDisplay();
