
const STORAGE_KEY = "weeklyChecker_v1";

const defaultState = {
    selectedWeek: 1,
    weeks: {}
};

const tasks = [
    {
        id: "coding",
        title: "5–6 coding sessions complete kiye",
        description: "Har session: 60 min coding + 20 min speaking + 10 min review",
        category: "Coding",
        tag: ""
    },
    {
        id: "concept",
        title: "Ek concept bina tutorial ke explain kiya",
        description: "Kisi topic ko apne words mein samjho aur explain karo",
        category: "Learning",
        tag: "tag-learning"
    },
    {
        id: "project",
        title: "Project mein measurable progress ki",
        description: "Portfolio / JavaScript project / Backend setup",
        category: "Project",
        tag: "tag-project"
    },
    {
        id: "speaking",
        title: "English speaking practice 5 din ki",
        description: "Speaking exercises aur short recordings",
        category: "Communication",
        tag: "tag-communication"
    },
    {
        id: "recording",
        title: "Ek recording sun kar improvement note ki",
        description: "Apni clarity, hesitation aur fluency review karo",
        category: "Communication",
        tag: "tag-communication"
    },
    {
        id: "revision",
        title: "Weekly revision aur next-week planning ki",
        description: "Kya seekha, kya difficult tha aur agle week ka plan",
        category: "Planning",
        tag: "tag-planning"
    }
];

const milestones = [
    "HTML & CSS Foundation",
    "JavaScript Fundamentals",
    "Functions, Arrays & Objects",
    "DOM, APIs & GitHub",
    "React Fundamentals",
    "Node.js & Database Basics",
    "Full-Stack Integration",
    "Main Portfolio Project",
    "Internship Applications & Interviews"
];

let state = loadState();

const weekSelect = document.getElementById("weekSelect");
const checklist = document.getElementById("checklist");
const weeklyNotes = document.getElementById("weeklyNotes");
const savedMessage = document.getElementById("savedMessage");

function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            const parsed = JSON.parse(saved);

            if (parsed && typeof parsed === "object") {
                return {
                    selectedWeek: Math.min(
                        39,
                        Math.max(1, Number(parsed.selectedWeek) || 1)
                    ),
                    weeks: parsed.weeks && typeof parsed.weeks === "object"
                        ? parsed.weeks
                        : {}
                };
            }
        }
    } catch (error) {
        console.error("Could not load saved progress:", error);
    }

    return {
        selectedWeek: 1,
        weeks: {}
    };
}

function saveState(message = "✓ Progress saved in your browser.") {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        savedMessage.textContent = message;
    } catch (error) {
        console.error("Could not save progress:", error);
        savedMessage.textContent =
            "Could not save data. Check your browser storage settings.";
    }
}

function getWeekData(week = state.selectedWeek) {
    const key = String(week);

    if (!state.weeks[key]) {
        state.weeks[key] = {
            completed: [],
            notes: ""
        };
    }

    if (!Array.isArray(state.weeks[key].completed)) {
        state.weeks[key].completed = [];
    }

    if (typeof state.weeks[key].notes !== "string") {
        state.weeks[key].notes = "";
    }

    return state.weeks[key];
}

function setupWeekSelector() {
    weekSelect.innerHTML = "";

    for (let week = 1; week <= 39; week++) {
        const option = document.createElement("option");

        option.value = week;
        option.textContent = `Week ${week}`;

        weekSelect.appendChild(option);
    }

    weekSelect.value = state.selectedWeek;

    weekSelect.addEventListener("change", () => {
        state.selectedWeek = Number(weekSelect.value);
        saveState();
        renderDashboard();
    });
}

function getTaskStatus(taskId) {
    return getWeekData().completed.includes(taskId);
}

function renderChecklist() {
    const weekData = getWeekData();

    checklist.innerHTML = tasks.map(task => {
        const checked = weekData.completed.includes(task.id);

        return `
            <label class="task-item ${checked ? "is-done" : ""}">
                <input
                    type="checkbox"
                    class="task-checkbox"
                    data-task-id="${task.id}"
                    ${checked ? "checked" : ""}
                    aria-label="${task.title}"
                >

                <div class="task-text">
                    <strong>${task.title}</strong>
                    <p>${task.description}</p>
                </div>

                <span class="task-tag ${task.tag}">
                    ${task.category}
                </span>
            </label>
        `;
    }).join("");

    checklist.querySelectorAll(".task-checkbox").forEach(input => {
        input.addEventListener("change", event => {
            const taskId = event.target.dataset.taskId;
            const currentData = getWeekData();

            if (event.target.checked) {
                if (!currentData.completed.includes(taskId)) {
                    currentData.completed.push(taskId);
                }
            } else {
                currentData.completed =
                    currentData.completed.filter(id => id !== taskId);
            }

            saveState();
            renderDashboard();
        });
    });
}

function setProgress(elementId, value) {
    const element = document.getElementById(elementId);
    element.style.width = `${Math.max(0, Math.min(100, value))}%`;
}

function renderStats() {
    const completed = getWeekData().completed;

    const codingDone = completed.includes("coding") ? 1 : 0;
    const speakingDone = completed.includes("speaking") ? 1 : 0;
    const completedCount = tasks.filter(task =>
        completed.includes(task.id)
    ).length;

    const percent = Math.round(
        (completedCount / tasks.length) * 100
    );

    document.getElementById("codingCount").textContent =
        `${codingDone} / 1 goal`;

    document.getElementById("speakingCount").textContent =
        `${speakingDone} / 1 goal`;

    document.getElementById("taskCount").textContent =
        `${completedCount} / ${tasks.length}`;

    document.getElementById("overallPercent").textContent =
        `${percent}%`;

    setProgress("codingBar", codingDone * 100);
    setProgress("speakingBar", speakingDone * 100);
    setProgress("taskBar", percent);
    setProgress("overallBar", percent);
}

function renderHeader() {
    const week = state.selectedWeek;

    document.getElementById("weekBadge").textContent = `Week ${week}`;

    const month = Math.ceil(week / 4.33);

    let milestoneIndex;

    if (week <= 4) {
        milestoneIndex = 0;
    } else if (week <= 8) {
        milestoneIndex = 1;
    } else if (week <= 12) {
        milestoneIndex = 2;
    } else if (week <= 16) {
        milestoneIndex = 3;
    } else if (week <= 20) {
        milestoneIndex = 4;
    } else if (week <= 24) {
        milestoneIndex = 5;
    } else if (week <= 28) {
        milestoneIndex = 6;
    } else if (week <= 32) {
        milestoneIndex = 7;
    } else {
        milestoneIndex = 8;
    }

    document.getElementById("milestone").textContent =
        milestones[milestoneIndex];
}

function renderNotes() {
    weeklyNotes.value = getWeekData().notes;
}

function renderDashboard() {
    renderChecklist();
    renderStats();
    renderHeader();
    renderNotes();
}

document.getElementById("resetWeek").addEventListener("click", () => {
    const confirmed = confirm(
        `Week ${state.selectedWeek} ki checklist aur notes reset karne hain?`
    );

    if (!confirmed) return;

    state.weeks[String(state.selectedWeek)] = {
        completed: [],
        notes: ""
    };

    saveState("Week reset ho gaya.");
    renderDashboard();
});

document.getElementById("completeWeek").addEventListener("click", () => {
    getWeekData().completed = tasks.map(task => task.id);

    saveState("🎉 Great job! Is week ke saare goals complete hain.");
    renderDashboard();
});

weeklyNotes.addEventListener("input", () => {
    getWeekData().notes = weeklyNotes.value;
    saveState("✓ Notes saved.");
});

document.getElementById("clearAll").addEventListener("click", () => {
    const confirmed = confirm(
        "Kya tum saare 39 weeks ka saved progress aur notes delete karna chahte ho? Yeh action undo nahi hoga."
    );

    if (!confirmed) return;

    state = {
        selectedWeek: 1,
        weeks: {}
    };

    saveState("All progress cleared.");
    weekSelect.value = 1;
    renderDashboard();
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelectorAll(".nav-link").forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});

setupWeekSelector();
renderDashboard();
