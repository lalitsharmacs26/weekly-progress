
const STORAGE_KEY = "weeklyChecker_v2";

const $ = id => document.getElementById(id);

const plans = [
    {
        milestone: "HTML Foundation",
        coding: "HTML document structure aur headings ki practice kar",
        concept: "Semantic HTML, headings aur paragraphs explain kar",
        project: "Personal profile page bana",
        speaking: "English mein apna introduction 1 minute bol",
        recording: "Apni introduction recording sun aur 3 improvements note kar",
        revision: "HTML tags revise kar aur next week ka CSS plan bana"
    },
    {
        milestone: "CSS Foundation",
        coding: "Selectors, colors, fonts aur CSS units ki practice kar",
        concept: "Margin, padding, border aur box model explain kar",
        project: "Profile page ko CSS se style kar",
        speaking: "Apne profile page ko English mein explain kar",
        recording: "Pronunciation aur unnecessary pauses check kar",
        revision: "Selectors revise kar aur Flexbox ke examples likh"
    },
    {
        milestone: "Responsive Design",
        coding: "Flexbox, Grid aur media queries practice kar",
        concept: "Responsive design aur mobile-first layout explain kar",
        project: "Portfolio ko mobile-friendly bana",
        speaking: "Responsive website par 2 minute bol",
        recording: "Apni clarity aur sentence completion check kar",
        revision: "Portfolio phone aur laptop par test kar"
    },
    {
        milestone: "JavaScript Basics",
        coding: "Variables, data types, operators aur type conversion practice kar",
        concept: "let, const aur data types explain kar",
        project: "JavaScript-based basic calculator bana",
        speaking: "Calculator ka logic English mein explain kar",
        recording: "Technical words ki pronunciation check kar",
        revision: "Variables aur operators par 10 practice questions kar"
    },
    {
        milestone: "Conditions and Loops",
        coding: "if-else, switch, for aur while ki problems solve kar",
        concept: "Conditions aur loops mein difference explain kar",
        project: "Number guessing game bana",
        speaking: "Game ke rules aur logic explain kar",
        recording: "Check kar ki explanation step-by-step thi ya nahi",
        revision: "Loops aur conditions ke 10 programs revise kar"
    },
    {
        milestone: "Functions",
        coding: "Parameters, return values aur arrow functions practice kar",
        concept: "Function call aur return statement explain kar",
        project: "Function-based calculator bana",
        speaking: "Functions ko real-life example se explain kar",
        recording: "Filler words jaise 'umm' aur 'actually' note kar",
        revision: "Functions ke 8 programs likh"
    },
    {
        milestone: "Arrays and Objects",
        coding: "Arrays, objects aur basic array methods practice kar",
        concept: "Array aur object ke use cases explain kar",
        project: "Student marks summary program bana",
        speaking: "Student marks program ko explain kar",
        recording: "Explanation ko concise banane ki practice kar",
        revision: "Arrays aur objects par practice questions solve kar"
    },
    {
        milestone: "JavaScript Mini Project",
        coding: "DOM selection aur click events practice kar",
        concept: "DOM aur event listeners explain kar",
        project: "Interactive to-do list bana",
        speaking: "To-do list ka demo English mein de",
        recording: "Demo ke dauran confidence aur clarity check kar",
        revision: "Month 1–2 ke concepts revise kar"
    },
    {
        milestone: "DOM Fundamentals",
        coding: "querySelector, textContent aur classList practice kar",
        concept: "HTML aur DOM ke relationship ko explain kar",
        project: "Interactive quiz interface bana",
        speaking: "Quiz ke features explain kar",
        recording: "Apni explanation ki speed review kar",
        revision: "DOM methods ka short reference note bana"
    },
    {
        milestone: "Events and Forms",
        coding: "Form submit, input events aur validation practice kar",
        concept: "Event handling aur preventDefault explain kar",
        project: "Registration form with validation bana",
        speaking: "Form validation ka process explain kar",
        recording: "Difficult words ko dobara bolne ki practice kar",
        revision: "Invalid input ke 5 test cases likh"
    },
    {
        milestone: "Array Methods",
        coding: "map, filter, find aur forEach practice kar",
        concept: "map aur filter ke differences explain kar",
        project: "Searchable student list bana",
        speaking: "Search feature ka logic explain kar",
        recording: "Sentence structure aur grammar review kar",
        revision: "Array methods par 10 small exercises kar"
    },
    {
        milestone: "Async JavaScript",
        coding: "Promises, async/await aur try/catch practice kar",
        concept: "Synchronous aur asynchronous code explain kar",
        project: "Loading aur error states wala demo bana",
        speaking: "Asynchronous code ko simple English mein explain kar",
        recording: "Concept ko bina technical jargon ke explain kar",
        revision: "Promise aur async/await examples revise kar"
    },
    {
        milestone: "Working with APIs",
        coding: "fetch aur JSON response handle kar",
        concept: "API request aur response explain kar",
        project: "Public API se data dikhane wali app bana",
        speaking: "API se data kaise aata hai, explain kar",
        recording: "Apne explanation mein logical sequence check kar",
        revision: "Loading, success aur error states test kar"
    },
    {
        milestone: "Weather App",
        coding: "Search input aur API data rendering practice kar",
        concept: "API error handling aur HTTP status basics explain kar",
        project: "Searchable Weather App complete kar",
        speaking: "Weather App ka 2-minute demo record kar",
        recording: "Demo mein features aur limitations clearly bol",
        revision: "Weather App ke bugs fix kar"
    },
    {
        milestone: "Git and GitHub",
        coding: "git init, add, commit, status aur push practice kar",
        concept: "Git aur GitHub ka difference explain kar",
        project: "Apne projects ko GitHub repositories mein upload kar",
        speaking: "Apne GitHub portfolio ka overview de",
        recording: "Apna introduction aur project summary compare kar",
        revision: "README mein setup steps aur screenshots add kar"
    },
    {
        milestone: "Deployment and Portfolio",
        coding: "Deployment aur browser console errors fix kar",
        concept: "Repository, hosting aur deployment explain kar",
        project: "Portfolio aur mini-projects ko live publish kar",
        speaking: "Portfolio ka 2-minute presentation de",
        recording: "Broken links aur unclear sentences identify kar",
        revision: "Resume ke liye apne projects ke points likh"
    },
    {
        milestone: "Internship Preparation",
        coding: "JavaScript fundamentals ke interview questions solve kar",
        concept: "Apne strongest project ka technical explanation de",
        project: "Portfolio mein project descriptions aur live links improve kar",
        speaking: "Common interview questions ke answers practice kar",
        recording: "Mock interview record karke review kar",
        revision: "Eligible frontend internships ki shortlist bana"
    },
    {
        milestone: "JavaScript Revision",
        coding: "Functions, arrays aur objects ke mixed problems solve kar",
        concept: "var, let aur const explain kar",
        project: "JavaScript mini-project ka code refactor kar",
        speaking: "Apne code mein ek difficult bug kaise solve kiya, explain kar",
        recording: "Answer ko structured aur concise bana",
        revision: "Weak JavaScript topics ki list bana"
    },
    {
        milestone: "React Introduction",
        coding: "React setup, JSX aur components practice kar",
        concept: "Components aur reusable UI explain kar",
        project: "Portfolio ka simple React version start kar",
        speaking: "React choose karne ka reason explain kar",
        recording: "React terms ki pronunciation practice kar",
        revision: "JSX aur components ka revision note bana"
    },
    {
        milestone: "React Props and State",
        coding: "Props, useState aur click events practice kar",
        concept: "Props aur state ka difference explain kar",
        project: "React counter aur reusable card components bana",
        speaking: "State update kaise hoti hai, explain kar",
        recording: "Technical answer ko example ke saath improve kar",
        revision: "React components ko independently test kar"
    },
    {
        milestone: "React Forms and Effects",
        coding: "Controlled forms aur useEffect practice kar",
        concept: "React mein effects aur state explain kar",
        project: "React task list bana",
        speaking: "Task list ka user flow explain kar",
        recording: "Demo mein problem aur solution clearly bol",
        revision: "Form validation aur state bugs fix kar"
    },
    {
        milestone: "React API Integration",
        coding: "React mein fetch, loading aur error states practice kar",
        concept: "API data ko components mein render karna explain kar",
        project: "React mein searchable API-based app bana",
        speaking: "Data fetching ka flow explain kar",
        recording: "2-minute project presentation improve kar",
        revision: "React aur JavaScript concepts revise kar"
    },
    {
        milestone: "React Routing and UI",
        coding: "Multi-page navigation aur reusable layouts practice kar",
        concept: "Client-side routing explain kar",
        project: "Home, Projects aur About pages wala React site bana",
        speaking: "Website ke pages aur navigation explain kar",
        recording: "Presentation mein clear transitions practice kar",
        revision: "All links aur responsive layouts test kar"
    },
    {
        milestone: "React Project Polish",
        coding: "Component structure aur error handling improve kar",
        concept: "Reusable components aur maintainable code explain kar",
        project: "React project ko deploy kar aur README likh",
        speaking: "Project demo bina notes padhe de",
        recording: "Mock interview ke 5 answers review kar",
        revision: "Backend learning ke prerequisites check kar"
    },
    {
        milestone: "Node.js Fundamentals",
        coding: "Node.js, modules, npm aur basic scripts practice kar",
        concept: "Browser JavaScript aur Node.js explain kar",
        project: "Node.js command-line notes app bana",
        speaking: "Node.js ka use kyun hota hai, explain kar",
        recording: "Technical explanation ki clarity check kar",
        revision: "npm scripts aur modules revise kar"
    },
    {
        milestone: "Express.js Server",
        coding: "Express app aur GET/POST routes practice kar",
        concept: "Request, response aur middleware explain kar",
        project: "Basic Express API bana",
        speaking: "API endpoint kaise kaam karta hai, explain kar",
        recording: "HTTP methods ko clearly pronounce kar",
        revision: "Routes ko Postman ya equivalent tool se test kar"
    },
    {
        milestone: "REST APIs and Validation",
        coding: "GET, POST, PATCH aur DELETE endpoints implement kar",
        concept: "REST API aur input validation explain kar",
        project: "In-memory task management API bana",
        speaking: "CRUD operations ka demo de",
        recording: "Interview-style API questions answer kar",
        revision: "Invalid requests aur error responses test kar"
    },
    {
        milestone: "SQL and Database",
        coding: "SELECT, INSERT, UPDATE, DELETE aur basic JOIN practice kar",
        concept: "Tables, primary keys aur relationships explain kar",
        project: "Study tasks ke liye database schema bana",
        speaking: "Database mein task data kaise store hoga, explain kar",
        recording: "SQL concepts ko simple words mein samjha",
        revision: "SQL ke 10 queries solve kar"
    },
    {
        milestone: "Backend Database Integration",
        coding: "Express API ko database se connect kar",
        concept: "CRUD operations aur persistent storage explain kar",
        project: "Database-backed task API bana",
        speaking: "Frontend se database tak data flow explain kar",
        recording: "Project explanation ka flow improve kar",
        revision: "Connection errors aur invalid data test kar"
    },
    {
        milestone: "Authentication Basics",
        coding: "Signup/login flow aur password hashing concepts practice kar",
        concept: "Authentication aur authorization ka difference explain kar",
        project: "Secure authentication demo ka backend plan kar",
        speaking: "Login flow ka high-level overview de",
        recording: "Security concepts ko accurately explain kar",
        revision: "Secrets ko environment variables mein rakhne ka practice kar"
    },
    {
        milestone: "Full-Stack Integration",
        coding: "React se Express API calls practice kar",
        concept: "Frontend, backend aur database ka relationship explain kar",
        project: "React frontend ko task API se connect kar",
        speaking: "Full-stack architecture ka diagram explain kar",
        recording: "Project architecture ka mock interview answer de",
        revision: "API integration aur errors test kar"
    },
    {
        milestone: "Main Project Planning",
        coding: "Study Planner ki features aur data model define kar",
        concept: "Project scope aur user stories explain kar",
        project: "Study Planner ka UI aur task list plan kar",
        speaking: "Project ka problem statement pitch kar",
        recording: "Pitch ko short aur understandable bana",
        revision: "Project ke must-have aur optional features decide kar"
    },
    {
        milestone: "Main Project Frontend",
        coding: "Responsive dashboard, forms aur task components build kar",
        concept: "Component reuse aur state management explain kar",
        project: "Study Planner frontend ka main flow complete kar",
        speaking: "Frontend ka user journey demo kar",
        recording: "UI demo ko 2 minutes mein complete kar",
        revision: "Mobile layout aur form validation test kar"
    },
    {
        milestone: "Main Project Backend",
        coding: "Study Planner API routes aur validation build kar",
        concept: "CRUD endpoints aur error handling explain kar",
        project: "Backend aur database operations implement kar",
        speaking: "Ek API request ka end-to-end flow explain kar",
        recording: "Backend concepts ke interview answers practice kar",
        revision: "Routes aur database records verify kar"
    },
    {
        milestone: "Full-Stack Testing",
        coding: "Frontend/backend integration bugs fix kar",
        concept: "Testing, validation aur secure data handling explain kar",
        project: "Study Planner ka create/edit/delete flow test kar",
        speaking: "Project ki ek problem aur uska solution explain kar",
        recording: "Answer ko situation, action aur result mein structure kar",
        revision: "Known bugs aur fixes document kar"
    },
    {
        milestone: "Deployment and Documentation",
        coding: "Frontend aur backend deployment setup practice kar",
        concept: "Environment variables aur production deployment explain kar",
        project: "Study Planner deploy kar aur README complete kar",
        speaking: "Live project ka complete demo record kar",
        recording: "README aur demo mein missing information note kar",
        revision: "Deployment errors fix kar aur live links test kar"
    },
    {
        milestone: "Resume and Portfolio",
        coding: "Projects ka code review aur cleanup kar",
        concept: "Resume mein projects aur measurable outcomes explain kar",
        project: "One-page resume aur portfolio update kar",
        speaking: "60-second professional introduction practice kar",
        recording: "Introduction ko confident aur natural bana",
        revision: "GitHub repositories, READMEs aur links verify kar"
    },
    {
        milestone: "Technical Interview Practice",
        coding: "JavaScript, arrays, functions aur basic problem-solving practice kar",
        concept: "Apne project ki architecture aur trade-offs explain kar",
        project: "Ek project feature improve karke code commit kar",
        speaking: "10 common interview questions ke answers bol",
        recording: "Mock interview mein weak answers identify kar",
        revision: "Weak technical topics ko dobara revise kar"
    },
    {
        milestone: "Internship Applications",
        coding: "Targeted job descriptions ke required skills revise kar",
        concept: "Apne skills ko internship requirements se map kar",
        project: "Portfolio aur application materials final check kar",
        speaking: "Recruiter introduction aur project pitch practice kar",
        recording: "Interview answers ko clear aur concise bana",
        revision: "Suitable openings apply kar aur follow-ups track kar"
    },
    {
        milestone: "Final Review and Next Steps",
        coding: "Apne strongest project ko bina tutorial ke explain kar",
        concept: "Apni strengths aur learning gaps identify kar",
        project: "Portfolio ke final bugs aur presentation improve kar",
        speaking: "Full mock interview aur project demo complete kar",
        recording: "Month 1 ki recording se compare karke improvement note kar",
        revision: "Next 30 days ke learning aur application goals set kar"
    }
];

const taskMeta = [
    { id: "coding", category: "Coding", tag: "" },
    { id: "concept", category: "Learning", tag: "tag-learning" },
    { id: "project", category: "Project", tag: "tag-project" },
    { id: "speaking", category: "Communication", tag: "tag-communication" },
    { id: "recording", category: "Communication", tag: "tag-communication" },
    { id: "revision", category: "Planning", tag: "tag-planning" }
];

const defaultState = { selectedWeek: 1, weeks: {} };

function loadState() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return { ...defaultState, weeks: {} };

        const parsed = JSON.parse(saved);

        return {
            selectedWeek: Math.min(39, Math.max(1, Number(parsed.selectedWeek) || 1)),
            weeks: parsed.weeks && typeof parsed.weeks === "object"
                ? parsed.weeks : {}
        };
    } catch (error) {
        console.error("Unable to load progress:", error);
        return { ...defaultState, weeks: {} };
    }
}

let state = loadState();

function getWeekData(week = state.selectedWeek) {
    const key = String(week);

    if (!state.weeks[key] || typeof state.weeks[key] !== "object") {
        state.weeks[key] = { completed: [], notes: "" };
    }

    const data = state.weeks[key];

    if (!Array.isArray(data.completed)) data.completed = [];
    if (typeof data.notes !== "string") data.notes = "";

    return data;
}

function saveState(message = "✓ Progress saved in your browser.") {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        $("savedMessage").textContent = message;
    } catch (error) {
        console.error("Unable to save progress:", error);
        $("savedMessage").textContent =
            "Save failed. Check your browser storage settings.";
    }
}

function setupWeekSelector() {
    $("weekSelect").innerHTML = "";

    for (let week = 1; week <= plans.length; week++) {
        const option = document.createElement("option");
        option.value = week;
        option.textContent = `Week ${week} — ${plans[week - 1].milestone}`;
        $("weekSelect").appendChild(option);
    }

    $("weekSelect").value = state.selectedWeek;

    $("weekSelect").addEventListener("change", () => {
        state.selectedWeek = Number($("weekSelect").value);
        saveState();
        renderDashboard();
    });
}

function renderChecklist() {
    const plan = plans[state.selectedWeek - 1];
    const data = getWeekData();

    $("checklistTitle").textContent = `Week ${state.selectedWeek} Checklist`;
    $("weekIntro").innerHTML =
        `<strong>Goal:</strong> ${plan.milestone}. Complete these six tasks at your own pace.`;

    const taskDescriptions = [
        plan.coding,
        plan.concept,
        plan.project,
        plan.speaking,
        plan.recording,
        plan.revision
    ];

    $("checklist").innerHTML = taskMeta.map((task, index) => {
        const checked = data.completed.includes(task.id);

        const row = document.createElement("label");
        row.className = `task-item ${checked ? "is-done" : ""}`;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.dataset.taskId = task.id;
        checkbox.checked = checked;
        checkbox.setAttribute("aria-label", taskDescriptions[index]);

        const textBox = document.createElement("div");
        textBox.className = "task-text";

        const title = document.createElement("strong");
        title.textContent = taskDescriptions[index];

        const description = document.createElement("p");
        description.textContent = [
            "Weekly technical practice",
            "Learn it and explain it in your own words",
            "Build, test and document your progress",
            "Speak aloud for at least a few minutes",
            "Listen again and note one improvement",
            "Revise and plan the next step"
        ][index];

        textBox.append(title, description);

        const tag = document.createElement("span");
        tag.className = `task-tag ${task.tag}`;
        tag.textContent = task.category;

        row.append(checkbox, textBox, tag);
        return row.outerHTML;
    }).join("");

    $("checklist").querySelectorAll(".task-checkbox").forEach(input => {
        input.addEventListener("change", event => {
            const data = getWeekData();
            const id = event.target.dataset.taskId;

            if (event.target.checked) {
                if (!data.completed.includes(id)) data.completed.push(id);
            } else {
                data.completed = data.completed.filter(item => item !== id);
            }

            saveState();
            renderDashboard();
        });
    });
}

function setProgress(id, value) {
    $(id).style.width = `${Math.min(100, Math.max(0, value))}%`;
}

function renderStats() {
    const data = getWeekData();
    const count = data.completed.length;
    const total = taskMeta.length;
    const percent = Math.round(count / total * 100);

    $("codingCount").textContent =
        `${data.completed.includes("coding") ? 1 : 0} / 1`;
    $("speakingCount").textContent =
        `${data.completed.includes("speaking") ? 1 : 0} / 1`;
    $("taskCount").textContent = `${count} / ${total}`;
    $("overallPercent").textContent = `${percent}%`;

    setProgress("codingBar", data.completed.includes("coding") ? 100 : 0);
    setProgress("speakingBar", data.completed.includes("speaking") ? 100 : 0);
    setProgress("taskBar", percent);
    setProgress("overallBar", allWeeksPercent());
}

function allWeeksPercent() {
    let completed = 0;
    const total = plans.length * taskMeta.length;

    for (let week = 1; week <= plans.length; week++) {
        const data = getWeekData(week);
        completed += taskMeta.filter(task =>
            data.completed.includes(task.id)
        ).length;
    }

    return Math.round(completed / total * 100);
}

function renderHeader() {
    $("weekBadge").textContent = `Week ${state.selectedWeek}`;
    $("milestone").textContent = plans[state.selectedWeek - 1].milestone;
}

function renderNotes() {
    $("weeklyNotes").value = getWeekData().notes;
}

function renderDashboard() {
    renderHeader();
    renderChecklist();
    renderStats();
    renderNotes();
}

$("weeklyNotes").addEventListener("input", () => {
    getWeekData().notes = $("weeklyNotes").value;
    saveState("✓ Notes saved.");
});

$("resetWeek").addEventListener("click", () => {
    if (!confirm(`Reset Week ${state.selectedWeek} and delete its notes?`)) return;

    state.weeks[String(state.selectedWeek)] = { completed: [], notes: "" };
    saveState("Week reset successfully.");
    renderDashboard();
});

$("completeWeek").addEventListener("click", () => {
    getWeekData().completed = taskMeta.map(task => task.id);
    saveState("🎉 All goals for this week are complete!");
    renderDashboard();
});

$("clearAll").addEventListener("click", () => {
    if (!confirm("Delete saved progress and notes for all 39 weeks? This cannot be undone.")) return;

    state = { selectedWeek: 1, weeks: {} };
    saveState("All progress cleared.");
    $("weekSelect").value = 1;
    renderDashboard();
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelectorAll(".nav-link").forEach(item =>
            item.classList.remove("active")
        );
        link.classList.add("active");
    });
});

setupWeekSelector();
renderDashboard();
