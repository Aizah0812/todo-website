// const usernameInput = document.getElementById("usernameInput");
// const saveUserBtn = document.getElementById("saveUserBtn");
// const welcomeText = document.getElementById("welcomeText");

// const taskInput = document.getElementById("taskInput");
// const dueDateInput = document.getElementById("dueDateInput");
// const priorityInput = document.getElementById("priorityInput");
// const categoryInput = document.getElementById("categoryInput");
// const addTaskBtn = document.getElementById("addTaskBtn");
// const taskList = document.getElementById("taskList");

// const searchInput = document.getElementById("searchInput");
// const filterButtons = document.querySelectorAll(".filter-btn");
// const taskCount = document.getElementById("taskCount");
// const clearCompletedBtn = document.getElementById("clearCompletedBtn");
// const emptyState = document.getElementById("emptyState");
// const themeToggleBtn = document.getElementById("themeToggleBtn");
// const progressFill = document.getElementById("progressFill");
// const progressText = document.getElementById("progressText");

// const notesInput = document.getElementById("notesInput");
// const sortSelect = document.getElementById("sortSelect");
// const markAllCompleteBtn = document.getElementById("markAllCompleteBtn");
// const markAllPendingBtn = document.getElementById("markAllPendingBtn");
// const exportTasksBtn = document.getElementById("exportTasksBtn");
// const importTasksInput = document.getElementById("importTasksInput");

// let currentFilter = "all";
// let currentSearch = "";
// let currentSort = localStorage.getItem("taskflow_sort") || "newest";
// let tasks = [];

// function getLoggedInUser() {
//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   const userEmail = localStorage.getItem("userEmail");
//   const currentUser = localStorage.getItem("currentUser");

//   if (isLoggedIn !== "true") return null;

//   return {
//     email: userEmail || "",
//     name: currentUser || userEmail || "User",
//   };
// }

// let loggedInUser = getLoggedInUser();

// function protectPage() {
//   if (!loggedInUser || !loggedInUser.email) {
//     alert("Please login first.");
//     window.location.href = "login.html";
//   }
// }

// protectPage();

// function getDraftStorageKey() {
//   return `draft_${loggedInUser.email}`;
// }

// async function fetchTasks() {
//   try {
//     const res = await fetch(
//       `http://localhost:5000/todos/${loggedInUser.email}`,
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch tasks");
//     }

//     tasks = await res.json();
//     renderTasks();
//   } catch (error) {
//     console.log("Error fetching tasks:", error);
//     alert("Could not load tasks.");
//   }
// }

// function updateWelcomeMessage() {
//   if (welcomeText) {
//     welcomeText.textContent = `Welcome, ${loggedInUser.name}! Manage your tasks here.`;
//   }

//   if (usernameInput) {
//     usernameInput.value = loggedInUser.name;
//     usernameInput.setAttribute("readonly", true);
//   }

//   if (saveUserBtn) {
//     saveUserBtn.style.display = "none";
//   }
// }

// /* ------------------------------
//    THEME + STARTUP
// -------------------------------- */

// loadTheme();
// requestNotificationPermission();
// updateWelcomeMessage();
// loadDraft();
// if (sortSelect) sortSelect.value = currentSort;
// fetchTasks();

// /* ------------------------------
//    HELPERS
// -------------------------------- */

// function formatDate(dateString) {
//   if (!dateString) return "No due date";

//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// }

// function isOverdue(task) {
//   if (!task.dueDate || task.completed) return false;

//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const due = new Date(task.dueDate);
//   due.setHours(0, 0, 0, 0);

//   return due < today;
// }

// function isDueToday(task) {
//   if (!task.dueDate || task.completed) return false;

//   const today = new Date();
//   const due = new Date(task.dueDate);

//   return (
//     today.getFullYear() === due.getFullYear() &&
//     today.getMonth() === due.getMonth() &&
//     today.getDate() === due.getDate()
//   );
// }

// function getPriorityClass(priority) {
//   if (priority === "High") return "priority-high";
//   if (priority === "Medium") return "priority-medium";
//   return "priority-low";
// }

// function getPriorityRank(priority) {
//   if (priority === "High") return 3;
//   if (priority === "Medium") return 2;
//   return 1;
// }

// function escapeHTML(str) {
//   return String(str).replace(/[&<>"']/g, function (match) {
//     const map = {
//       "&": "&amp;",
//       "<": "&lt;",
//       ">": "&gt;",
//       '"': "&quot;",
//       "'": "&#39;",
//     };
//     return map[match];
//   });
// }

// function sortTasks(taskArray) {
//   const sorted = [...taskArray];

//   if (currentSort === "oldest") {
//     sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//   } else if (currentSort === "priorityHigh") {
//     sorted.sort(
//       (a, b) => getPriorityRank(b.priority) - getPriorityRank(a.priority),
//     );
//   } else if (currentSort === "priorityLow") {
//     sorted.sort(
//       (a, b) => getPriorityRank(a.priority) - getPriorityRank(b.priority),
//     );
//   } else if (currentSort === "dueSoon") {
//     sorted.sort((a, b) => {
//       if (!a.dueDate && !b.dueDate) return 0;
//       if (!a.dueDate) return 1;
//       if (!b.dueDate) return -1;
//       return new Date(a.dueDate) - new Date(b.dueDate);
//     });
//   } else if (currentSort === "alphabetical") {
//     sorted.sort((a, b) => a.text.localeCompare(b.text));
//   } else {
//     sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//   }

//   return sorted;
// }

// /* ------------------------------
//    DRAFT SAVE FEATURE
// -------------------------------- */

// function saveDraft() {
//   const draft = {
//     text: taskInput ? taskInput.value : "",
//     dueDate: dueDateInput ? dueDateInput.value : "",
//     priority: priorityInput ? priorityInput.value : "Medium",
//     category: categoryInput ? categoryInput.value : "Study",
//     notes: notesInput ? notesInput.value : "",
//   };

//   localStorage.setItem(getDraftStorageKey(), JSON.stringify(draft));
// }

// function loadDraft() {
//   const draft = JSON.parse(localStorage.getItem(getDraftStorageKey())) || {};

//   if (taskInput) taskInput.value = draft.text || "";
//   if (dueDateInput) dueDateInput.value = draft.dueDate || "";
//   if (priorityInput) priorityInput.value = draft.priority || "Medium";
//   if (categoryInput) categoryInput.value = draft.category || "Study";
//   if (notesInput) notesInput.value = draft.notes || "";
// }

// function clearDraft() {
//   localStorage.removeItem(getDraftStorageKey());

//   if (taskInput) taskInput.value = "";
//   if (dueDateInput) dueDateInput.value = "";
//   if (priorityInput) priorityInput.value = "Medium";
//   if (categoryInput) categoryInput.value = "Study";
//   if (notesInput) notesInput.value = "";
// }

// /* ------------------------------
//    RENDER TASKS
// -------------------------------- */

// function renderTasks() {
//   const allTasks = tasks;
//   taskList.innerHTML = "";

//   let filteredTasks = [...allTasks];

//   if (currentFilter === "pending") {
//     filteredTasks = filteredTasks.filter((task) => !task.completed);
//   } else if (currentFilter === "completed") {
//     filteredTasks = filteredTasks.filter((task) => task.completed);
//   } else if (currentFilter === "overdue") {
//     filteredTasks = filteredTasks.filter((task) => isOverdue(task));
//   } else if (currentFilter === "today") {
//     filteredTasks = filteredTasks.filter((task) => isDueToday(task));
//   }

//   if (currentSearch.trim() !== "") {
//     filteredTasks = filteredTasks.filter(
//       (task) =>
//         task.text.toLowerCase().includes(currentSearch.toLowerCase()) ||
//         (task.category || "")
//           .toLowerCase()
//           .includes(currentSearch.toLowerCase()) ||
//         (task.notes || "").toLowerCase().includes(currentSearch.toLowerCase()),
//     );
//   }

//   filteredTasks = sortTasks(filteredTasks);

//   if (filteredTasks.length === 0) {
//     emptyState.style.display = "block";
//   } else {
//     emptyState.style.display = "none";
//   }

//   filteredTasks.forEach((task) => {
//     const li = document.createElement("li");
//     li.className = "task-item";

//     li.innerHTML = `
//       <div class="task-left">
//         <input type="checkbox" ${task.completed ? "checked" : ""} />
//         <div class="task-content">
//           <div class="task-main-row">
//             <span class="task-text ${task.completed ? "completed" : ""}">
//               ${escapeHTML(task.text)}
//             </span>
//           </div>

//           ${
//             task.notes
//               ? `<div class="task-notes" style="color: var(--text-soft); font-size: 0.9rem; line-height: 1.5;">
//                   ${escapeHTML(task.notes)}
//                  </div>`
//               : ""
//           }

//           <div class="task-meta">
//             <span class="due-date ${isOverdue(task) ? "overdue" : ""}">
//               ${isOverdue(task) ? "Overdue: " : "Due: "}${formatDate(task.dueDate)}
//             </span>
//             <span class="priority-badge ${getPriorityClass(task.priority)}">
//               ${task.priority || "Low"} Priority
//             </span>
//             <span class="category-badge">
//               ${escapeHTML(task.category || "General")}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div class="task-actions">
//         <button class="edit-btn">Edit</button>
//         <button class="delete-btn">Delete</button>
//       </div>
//     `;

//     const checkbox = li.querySelector('input[type="checkbox"]');
//     const editBtn = li.querySelector(".edit-btn");
//     const deleteBtn = li.querySelector(".delete-btn");

//     checkbox.addEventListener("change", () => toggleTask(task._id));
//     deleteBtn.addEventListener("click", () => deleteTask(task._id));
//     editBtn.addEventListener("click", () => editTask(li, task));

//     taskList.appendChild(li);
//   });

//   updateTaskCount(allTasks);
//   updateProgress(allTasks);
//   showDueNotifications(allTasks);
// }

// function updateTaskCount(taskArray) {
//   const total = taskArray.length;
//   const completed = taskArray.filter((task) => task.completed).length;
//   const pending = total - completed;

//   taskCount.textContent = `${total} total | ${pending} pending | ${completed} completed`;
// }

// function updateProgress(taskArray) {
//   const total = taskArray.length;
//   const completed = taskArray.filter((task) => task.completed).length;
//   const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

//   progressFill.style.width = `${percentage}%`;
//   progressText.textContent = `${percentage}% Completed`;
// }

// /* ------------------------------
//    TASK ACTIONS
// -------------------------------- */

// async function addTask() {
//   const text = taskInput.value.trim();
//   const dueDate = dueDateInput.value;
//   const priority = priorityInput.value;
//   const category = categoryInput.value;
//   const notes = notesInput ? notesInput.value.trim() : "";

//   if (text === "") {
//     alert("Please enter a task.");
//     return;
//   }

//   const newTask = {
//     text,
//     dueDate,
//     priority,
//     category,
//     notes,
//     completed: false,
//     userEmail: loggedInUser.email,
//   };

//   try {
//     const res = await fetch("http://localhost:5000/todos", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newTask),
//     });

//     if (!res.ok) {
//       throw new Error("Failed to add task");
//     }

//     clearDraft();
//     await fetchTasks();
//   } catch (error) {
//     console.log("Error adding task:", error);
//     alert("Could not add task.");
//   }
// }

// async function toggleTask(id) {
//   const task = tasks.find((t) => t._id === id);

//   if (!task) return;

//   try {
//     const res = await fetch(`http://localhost:5000/todos/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         completed: !task.completed,
//       }),
//     });

//     if (!res.ok) {
//       throw new Error("Failed to update task");
//     }

//     await fetchTasks();
//   } catch (error) {
//     console.log("Error updating task:", error);
//     alert("Could not update task.");
//   }
// }

// async function deleteTask(id) {
//   const confirmed = confirm("Do you want to delete this task?");
//   if (!confirmed) return;

//   try {
//     const res = await fetch(`http://localhost:5000/todos/${id}`, {
//       method: "DELETE",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to delete task");
//     }

//     await fetchTasks();
//   } catch (error) {
//     console.log("Error deleting task:", error);
//     alert("Could not delete task.");
//   }
// }

// function editTask(li, task) {
//   li.innerHTML = `
//     <div class="edit-grid">
//       <input type="text" class="edit-input" value="${escapeHTML(task.text)}" />
//       <input type="date" class="edit-date-input" value="${task.dueDate || ""}" />
//       <select class="edit-priority-input">
//         <option value="Low" ${task.priority === "Low" ? "selected" : ""}>Low</option>
//         <option value="Medium" ${task.priority === "Medium" ? "selected" : ""}>Medium</option>
//         <option value="High" ${task.priority === "High" ? "selected" : ""}>High</option>
//       </select>
//       <select class="edit-category-input">
//         <option value="Study" ${task.category === "Study" ? "selected" : ""}>Study</option>
//         <option value="Work" ${task.category === "Work" ? "selected" : ""}>Work</option>
//         <option value="Personal" ${task.category === "Personal" ? "selected" : ""}>Personal</option>
//       </select>
//       <input type="text" class="edit-notes-input" placeholder="Notes" value="${escapeHTML(task.notes || "")}" />
//       <button class="save-btn">Save</button>
//       <button class="cancel-btn">Cancel</button>
//     </div>
//   `;

//   const editInput = li.querySelector(".edit-input");
//   const editDateInput = li.querySelector(".edit-date-input");
//   const editPriorityInput = li.querySelector(".edit-priority-input");
//   const editCategoryInput = li.querySelector(".edit-category-input");
//   const editNotesInput = li.querySelector(".edit-notes-input");
//   const saveBtn = li.querySelector(".save-btn");
//   const cancelBtn = li.querySelector(".cancel-btn");

//   saveBtn.addEventListener("click", async () => {
//     const newText = editInput.value.trim();
//     const newDate = editDateInput.value;
//     const newPriority = editPriorityInput.value;
//     const newCategory = editCategoryInput.value;
//     const newNotes = editNotesInput.value.trim();

//     if (newText === "") {
//       alert("Task cannot be empty.");
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:5000/todos/${task._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           text: newText,
//           dueDate: newDate,
//           priority: newPriority,
//           category: newCategory,
//           notes: newNotes,
//         }),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to update task");
//       }

//       await fetchTasks();
//     } catch (error) {
//       console.log("Error editing task:", error);
//       alert("Could not update task.");
//     }
//   });

//   cancelBtn.addEventListener("click", renderTasks);
// }

// async function clearCompletedTasks() {
//   const completedTasks = tasks.filter((task) => task.completed);

//   if (completedTasks.length === 0) {
//     alert("No completed tasks to clear.");
//     return;
//   }

//   try {
//     await Promise.all(
//       completedTasks.map((task) =>
//         fetch(`http://localhost:5000/todos/${task._id}`, {
//           method: "DELETE",
//         }),
//       ),
//     );

//     await fetchTasks();
//   } catch (error) {
//     console.log("Error clearing completed tasks:", error);
//     alert("Could not clear completed tasks.");
//   }
// }

// /* ------------------------------
//    MARK ALL COMPLETE / PENDING
// -------------------------------- */

// async function markAllTasksComplete() {
//   try {
//     await Promise.all(
//       tasks.map((task) =>
//         fetch(`http://localhost:5000/todos/${task._id}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             completed: true,
//           }),
//         }),
//       ),
//     );

//     await fetchTasks();
//   } catch (error) {
//     console.log("Error marking all complete:", error);
//     alert("Could not update tasks.");
//   }
// }

// async function markAllTasksPending() {
//   try {
//     await Promise.all(
//       tasks.map((task) =>
//         fetch(`http://localhost:5000/todos/${task._id}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             completed: false,
//           }),
//         }),
//       ),
//     );

//     await fetchTasks();
//   } catch (error) {
//     console.log("Error marking all pending:", error);
//     alert("Could not update tasks.");
//   }
// }

// /* ------------------------------
//    EXPORT / IMPORT TASKS
// -------------------------------- */

// function exportTasks() {
//   if (tasks.length === 0) {
//     alert("No tasks available to export.");
//     return;
//   }

//   const dataStr = JSON.stringify(tasks, null, 2);
//   const blob = new Blob([dataStr], { type: "application/json" });
//   const url = URL.createObjectURL(blob);

//   const a = document.createElement("a");
//   a.href = url;
//   a.download = `${loggedInUser.name || "user"}-tasks.json`;
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);

//   URL.revokeObjectURL(url);
// }

// async function importTasks(event) {
//   const file = event.target.files[0];
//   if (!file) return;

//   const reader = new FileReader();

//   reader.onload = async function (e) {
//     try {
//       const importedTasks = JSON.parse(e.target.result);

//       if (!Array.isArray(importedTasks)) {
//         alert("Invalid file format.");
//         return;
//       }

//       const cleanedTasks = importedTasks.map((task) => ({
//         text: task.text || "Untitled Task",
//         dueDate: task.dueDate || "",
//         priority: task.priority || "Medium",
//         category: task.category || "General",
//         notes: task.notes || "",
//         completed: Boolean(task.completed),
//         userEmail: loggedInUser.email,
//       }));

//       await Promise.all(
//         cleanedTasks.map((task) =>
//           fetch("http://localhost:5000/todos", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(task),
//           }),
//         ),
//       );

//       await fetchTasks();
//       alert("Tasks imported successfully.");
//     } catch (error) {
//       console.log("Import error:", error);
//       alert("Could not import tasks. Please select a valid JSON file.");
//     } finally {
//       event.target.value = "";
//     }
//   };

//   reader.readAsText(file);
// }

// /* ------------------------------
//    THEME
// -------------------------------- */

// function loadTheme() {
//   const savedTheme = localStorage.getItem("taskflow_theme") || "dark";

//   if (savedTheme === "light") {
//     document.body.classList.add("light-mode");
//   } else {
//     document.body.classList.remove("light-mode");
//   }
// }

// function toggleTheme() {
//   document.body.classList.toggle("light-mode");

//   const currentTheme = document.body.classList.contains("light-mode")
//     ? "light"
//     : "dark";

//   localStorage.setItem("taskflow_theme", currentTheme);
// }

// /* ------------------------------
//    NOTIFICATIONS
// -------------------------------- */

// function requestNotificationPermission() {
//   if ("Notification" in window && Notification.permission === "default") {
//     Notification.requestPermission();
//   }
// }

// function showDueNotifications(taskArray) {
//   if (!("Notification" in window) || Notification.permission !== "granted") {
//     return;
//   }

//   taskArray.forEach((task) => {
//     if (isDueToday(task) && !task.completed) {
//       new Notification("Task Reminder", {
//         body: `${task.text} is due today.`,
//       });
//     }
//   });
// }

// /* ------------------------------
//    EVENTS
// -------------------------------- */

// addTaskBtn.addEventListener("click", addTask);

// taskInput.addEventListener("keydown", (e) => {
//   if (e.key === "Enter") {
//     addTask();
//   }
// });

// taskInput.addEventListener("input", saveDraft);
// dueDateInput.addEventListener("input", saveDraft);
// priorityInput.addEventListener("change", saveDraft);
// categoryInput.addEventListener("change", saveDraft);

// if (notesInput) {
//   notesInput.addEventListener("input", saveDraft);
// }

// searchInput.addEventListener("input", (e) => {
//   currentSearch = e.target.value;
//   renderTasks();
// });

// filterButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     filterButtons.forEach((btn) => btn.classList.remove("active"));
//     button.classList.add("active");
//     currentFilter = button.dataset.filter;
//     renderTasks();
//   });
// });

// clearCompletedBtn.addEventListener("click", clearCompletedTasks);
// themeToggleBtn.addEventListener("click", toggleTheme);

// if (sortSelect) {
//   sortSelect.addEventListener("change", (e) => {
//     currentSort = e.target.value;
//     localStorage.setItem("taskflow_sort", currentSort);
//     renderTasks();
//   });
// }

// if (markAllCompleteBtn) {
//   markAllCompleteBtn.addEventListener("click", markAllTasksComplete);
// }

// if (markAllPendingBtn) {
//   markAllPendingBtn.addEventListener("click", markAllTasksPending);
// }

// if (exportTasksBtn) {
//   exportTasksBtn.addEventListener("click", exportTasks);
// }

// if (importTasksInput) {
//   importTasksInput.addEventListener("change", importTasks);
// }

// /* ------------------------------
//    LOGOUT
// -------------------------------- */

// const logoutBtn = document.getElementById("logoutBtn");

// if (logoutBtn) {
//   logoutBtn.addEventListener("click", () => {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("userEmail");
//     localStorage.removeItem("currentUser");
//     window.location.href = "login.html";
//   });
// }


const usernameInput = document.getElementById("usernameInput");
const saveUserBtn = document.getElementById("saveUserBtn");
const welcomeText = document.getElementById("welcomeText");

const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const priorityInput = document.getElementById("priorityInput");
const categoryInput = document.getElementById("categoryInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const taskCount = document.getElementById("taskCount");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const emptyState = document.getElementById("emptyState");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

const notesInput = document.getElementById("notesInput");
const sortSelect = document.getElementById("sortSelect");
const markAllCompleteBtn = document.getElementById("markAllCompleteBtn");
const markAllPendingBtn = document.getElementById("markAllPendingBtn");
const exportTasksBtn = document.getElementById("exportTasksBtn");
const importTasksInput = document.getElementById("importTasksInput");

const API_BASE_URL = "http://localhost:5000";

let currentFilter = "all";
let currentSearch = "";
let currentSort = localStorage.getItem("taskflow_sort") || "newest";
let tasks = [];

/* ------------------------------
   JWT / AUTH HELPERS
-------------------------------- */

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders(includeJson = false) {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };

  if (includeJson) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

function logoutUser(message = "Session expired. Please login again.") {
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("currentUser");

  alert(message);
  window.location.href = "login.html";
}

function getLoggedInUser() {
  const token = getToken();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userEmail = localStorage.getItem("userEmail");
  const currentUser = localStorage.getItem("currentUser");

  if (isLoggedIn !== "true" || !token) return null;

  return {
    email: userEmail || "",
    name: currentUser || userEmail || "User",
  };
}

let loggedInUser = getLoggedInUser();

function protectPage() {
  if (!loggedInUser || !loggedInUser.email || !getToken()) {
    alert("Please login first.");
    window.location.href = "login.html";
  }
}

protectPage();

function getDraftStorageKey() {
  return `draft_${loggedInUser.email}`;
}

async function fetchTasks() {
  try {
    const res = await fetch(`${API_BASE_URL}/todos/${loggedInUser.email}`, {
      headers: authHeaders(),
    });

    if (res.status === 401) {
      logoutUser();
      return;
    }

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    tasks = await res.json();
    renderTasks();
  } catch (error) {
    console.log("Error fetching tasks:", error);
    alert("Could not load tasks.");
  }
}

function updateWelcomeMessage() {
  if (welcomeText) {
    welcomeText.textContent = `Welcome, ${loggedInUser.name}! Manage your tasks here.`;
  }

  if (usernameInput) {
    usernameInput.value = loggedInUser.name;
    usernameInput.setAttribute("readonly", true);
  }

  if (saveUserBtn) {
    saveUserBtn.style.display = "none";
  }
}

/* ------------------------------
   THEME + STARTUP
-------------------------------- */

loadTheme();
requestNotificationPermission();
updateWelcomeMessage();
loadDraft();
if (sortSelect) sortSelect.value = currentSort;
fetchTasks();

/* ------------------------------
   HELPERS
-------------------------------- */

function formatDate(dateString) {
  if (!dateString) return "No due date";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(task.dueDate);
  due.setHours(0, 0, 0, 0);

  return due < today;
}

function isDueToday(task) {
  if (!task.dueDate || task.completed) return false;

  const today = new Date();
  const due = new Date(task.dueDate);

  return (
    today.getFullYear() === due.getFullYear() &&
    today.getMonth() === due.getMonth() &&
    today.getDate() === due.getDate()
  );
}

function getPriorityClass(priority) {
  if (priority === "High") return "priority-high";
  if (priority === "Medium") return "priority-medium";
  return "priority-low";
}

function getPriorityRank(priority) {
  if (priority === "High") return 3;
  if (priority === "Medium") return 2;
  return 1;
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, function (match) {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[match];
  });
}

function sortTasks(taskArray) {
  const sorted = [...taskArray];

  if (currentSort === "oldest") {
    sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (currentSort === "priorityHigh") {
    sorted.sort(
      (a, b) => getPriorityRank(b.priority) - getPriorityRank(a.priority),
    );
  } else if (currentSort === "priorityLow") {
    sorted.sort(
      (a, b) => getPriorityRank(a.priority) - getPriorityRank(b.priority),
    );
  } else if (currentSort === "dueSoon") {
    sorted.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  } else if (currentSort === "alphabetical") {
    sorted.sort((a, b) => a.text.localeCompare(b.text));
  } else {
    sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return sorted;
}

/* ------------------------------
   DRAFT SAVE FEATURE
-------------------------------- */

function saveDraft() {
  const draft = {
    text: taskInput ? taskInput.value : "",
    dueDate: dueDateInput ? dueDateInput.value : "",
    priority: priorityInput ? priorityInput.value : "Medium",
    category: categoryInput ? categoryInput.value : "Study",
    notes: notesInput ? notesInput.value : "",
  };

  localStorage.setItem(getDraftStorageKey(), JSON.stringify(draft));
}

function loadDraft() {
  const draft = JSON.parse(localStorage.getItem(getDraftStorageKey())) || {};

  if (taskInput) taskInput.value = draft.text || "";
  if (dueDateInput) dueDateInput.value = draft.dueDate || "";
  if (priorityInput) priorityInput.value = draft.priority || "Medium";
  if (categoryInput) categoryInput.value = draft.category || "Study";
  if (notesInput) notesInput.value = draft.notes || "";
}

function clearDraft() {
  localStorage.removeItem(getDraftStorageKey());

  if (taskInput) taskInput.value = "";
  if (dueDateInput) dueDateInput.value = "";
  if (priorityInput) priorityInput.value = "Medium";
  if (categoryInput) categoryInput.value = "Study";
  if (notesInput) notesInput.value = "";
}

/* ------------------------------
   RENDER TASKS
-------------------------------- */

function renderTasks() {
  const allTasks = tasks;
  taskList.innerHTML = "";

  let filteredTasks = [...allTasks];

  if (currentFilter === "pending") {
    filteredTasks = filteredTasks.filter((task) => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = filteredTasks.filter((task) => task.completed);
  } else if (currentFilter === "overdue") {
    filteredTasks = filteredTasks.filter((task) => isOverdue(task));
  } else if (currentFilter === "today") {
    filteredTasks = filteredTasks.filter((task) => isDueToday(task));
  }

  if (currentSearch.trim() !== "") {
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.text.toLowerCase().includes(currentSearch.toLowerCase()) ||
        (task.category || "")
          .toLowerCase()
          .includes(currentSearch.toLowerCase()) ||
        (task.notes || "").toLowerCase().includes(currentSearch.toLowerCase()),
    );
  }

  filteredTasks = sortTasks(filteredTasks);

  emptyState.style.display = filteredTasks.length === 0 ? "block" : "none";

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.completed ? "checked" : ""} />
        <div class="task-content">
          <div class="task-main-row">
            <span class="task-text ${task.completed ? "completed" : ""}">
              ${escapeHTML(task.text)}
            </span>
          </div>

          ${
            task.notes
              ? `<div class="task-notes" style="color: var(--text-soft); font-size: 0.9rem; line-height: 1.5;">
                  ${escapeHTML(task.notes)}
                 </div>`
              : ""
          }

          <div class="task-meta">
            <span class="due-date ${isOverdue(task) ? "overdue" : ""}">
              ${isOverdue(task) ? "Overdue: " : "Due: "}${formatDate(task.dueDate)}
            </span>
            <span class="priority-badge ${getPriorityClass(task.priority)}">
              ${task.priority || "Low"} Priority
            </span>
            <span class="category-badge">
              ${escapeHTML(task.category || "General")}
            </span>
          </div>
        </div>
      </div>

      <div class="task-actions">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;

    const checkbox = li.querySelector('input[type="checkbox"]');
    const editBtn = li.querySelector(".edit-btn");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("change", () => toggleTask(task._id));
    deleteBtn.addEventListener("click", () => deleteTask(task._id));
    editBtn.addEventListener("click", () => editTask(li, task));

    taskList.appendChild(li);
  });

  updateTaskCount(allTasks);
  updateProgress(allTasks);
  showDueNotifications(allTasks);
}

function updateTaskCount(taskArray) {
  const total = taskArray.length;
  const completed = taskArray.filter((task) => task.completed).length;
  const pending = total - completed;

  taskCount.textContent = `${total} total | ${pending} pending | ${completed} completed`;
}

function updateProgress(taskArray) {
  const total = taskArray.length;
  const completed = taskArray.filter((task) => task.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}% Completed`;
}

/* ------------------------------
   TASK ACTIONS
-------------------------------- */

async function addTask() {
  const text = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;
  const category = categoryInput.value;
  const notes = notesInput ? notesInput.value.trim() : "";

  if (text === "") {
    alert("Please enter a task.");
    return;
  }

  const newTask = {
    text,
    dueDate,
    priority,
    category,
    notes,
    completed: false,
    userEmail: loggedInUser.email,
  };

  try {
    const res = await fetch(`${API_BASE_URL}/todos`, {
      method: "POST",
      headers: authHeaders(true),
      body: JSON.stringify(newTask),
    });

    if (res.status === 401) {
      logoutUser();
      return;
    }

    if (!res.ok) {
      throw new Error("Failed to add task");
    }

    clearDraft();
    await fetchTasks();
  } catch (error) {
    console.log("Error adding task:", error);
    alert("Could not add task.");
  }
}

async function toggleTask(id) {
  const task = tasks.find((t) => t._id === id);
  if (!task) return;

  try {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "PUT",
      headers: authHeaders(true),
      body: JSON.stringify({
        completed: !task.completed,
      }),
    });

    if (res.status === 401) {
      logoutUser();
      return;
    }

    if (!res.ok) {
      throw new Error("Failed to update task");
    }

    await fetchTasks();
  } catch (error) {
    console.log("Error updating task:", error);
    alert("Could not update task.");
  }
}

async function deleteTask(id) {
  const confirmed = confirm("Do you want to delete this task?");
  if (!confirmed) return;

  try {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    });

    if (res.status === 401) {
      logoutUser();
      return;
    }

    if (!res.ok) {
      throw new Error("Failed to delete task");
    }

    await fetchTasks();
  } catch (error) {
    console.log("Error deleting task:", error);
    alert("Could not delete task.");
  }
}

function editTask(li, task) {
  li.innerHTML = `
    <div class="edit-grid">
      <input type="text" class="edit-input" value="${escapeHTML(task.text)}" />
      <input type="date" class="edit-date-input" value="${task.dueDate || ""}" />
      <select class="edit-priority-input">
        <option value="Low" ${task.priority === "Low" ? "selected" : ""}>Low</option>
        <option value="Medium" ${task.priority === "Medium" ? "selected" : ""}>Medium</option>
        <option value="High" ${task.priority === "High" ? "selected" : ""}>High</option>
      </select>
      <select class="edit-category-input">
        <option value="Study" ${task.category === "Study" ? "selected" : ""}>Study</option>
        <option value="Work" ${task.category === "Work" ? "selected" : ""}>Work</option>
        <option value="Personal" ${task.category === "Personal" ? "selected" : ""}>Personal</option>
      </select>
      <input type="text" class="edit-notes-input" placeholder="Notes" value="${escapeHTML(task.notes || "")}" />
      <button class="save-btn">Save</button>
      <button class="cancel-btn">Cancel</button>
    </div>
  `;

  const editInput = li.querySelector(".edit-input");
  const editDateInput = li.querySelector(".edit-date-input");
  const editPriorityInput = li.querySelector(".edit-priority-input");
  const editCategoryInput = li.querySelector(".edit-category-input");
  const editNotesInput = li.querySelector(".edit-notes-input");
  const saveBtn = li.querySelector(".save-btn");
  const cancelBtn = li.querySelector(".cancel-btn");

  saveBtn.addEventListener("click", async () => {
    const newText = editInput.value.trim();
    const newDate = editDateInput.value;
    const newPriority = editPriorityInput.value;
    const newCategory = editCategoryInput.value;
    const newNotes = editNotesInput.value.trim();

    if (newText === "") {
      alert("Task cannot be empty.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/todos/${task._id}`, {
        method: "PUT",
        headers: authHeaders(true),
        body: JSON.stringify({
          text: newText,
          dueDate: newDate,
          priority: newPriority,
          category: newCategory,
          notes: newNotes,
        }),
      });

      if (res.status === 401) {
        logoutUser();
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      await fetchTasks();
    } catch (error) {
      console.log("Error editing task:", error);
      alert("Could not update task.");
    }
  });

  cancelBtn.addEventListener("click", renderTasks);
}

async function clearCompletedTasks() {
  const completedTasks = tasks.filter((task) => task.completed);

  if (completedTasks.length === 0) {
    alert("No completed tasks to clear.");
    return;
  }

  try {
    await Promise.all(
      completedTasks.map((task) =>
        fetch(`${API_BASE_URL}/todos/${task._id}`, {
          method: "DELETE",
          headers: authHeaders(),
        }),
      ),
    );

    await fetchTasks();
  } catch (error) {
    console.log("Error clearing completed tasks:", error);
    alert("Could not clear completed tasks.");
  }
}

/* ------------------------------
   MARK ALL COMPLETE / PENDING
-------------------------------- */

async function markAllTasksComplete() {
  try {
    await Promise.all(
      tasks.map((task) =>
        fetch(`${API_BASE_URL}/todos/${task._id}`, {
          method: "PUT",
          headers: authHeaders(true),
          body: JSON.stringify({ completed: true }),
        }),
      ),
    );

    await fetchTasks();
  } catch (error) {
    console.log("Error marking all complete:", error);
    alert("Could not update tasks.");
  }
}

async function markAllTasksPending() {
  try {
    await Promise.all(
      tasks.map((task) =>
        fetch(`${API_BASE_URL}/todos/${task._id}`, {
          method: "PUT",
          headers: authHeaders(true),
          body: JSON.stringify({ completed: false }),
        }),
      ),
    );

    await fetchTasks();
  } catch (error) {
    console.log("Error marking all pending:", error);
    alert("Could not update tasks.");
  }
}

/* ------------------------------
   EXPORT / IMPORT TASKS
-------------------------------- */

function exportTasks() {
  if (tasks.length === 0) {
    alert("No tasks available to export.");
    return;
  }

  const dataStr = JSON.stringify(tasks, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `${loggedInUser.name || "user"}-tasks.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}

async function importTasks(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async function (e) {
    try {
      const importedTasks = JSON.parse(e.target.result);

      if (!Array.isArray(importedTasks)) {
        alert("Invalid file format.");
        return;
      }

      const cleanedTasks = importedTasks.map((task) => ({
        text: task.text || "Untitled Task",
        dueDate: task.dueDate || "",
        priority: task.priority || "Medium",
        category: task.category || "General",
        notes: task.notes || "",
        completed: Boolean(task.completed),
        userEmail: loggedInUser.email,
      }));

      await Promise.all(
        cleanedTasks.map((task) =>
          fetch(`${API_BASE_URL}/todos`, {
            method: "POST",
            headers: authHeaders(true),
            body: JSON.stringify(task),
          }),
        ),
      );

      await fetchTasks();
      alert("Tasks imported successfully.");
    } catch (error) {
      console.log("Import error:", error);
      alert("Could not import tasks. Please select a valid JSON file.");
    } finally {
      event.target.value = "";
    }
  };

  reader.readAsText(file);
}

/* ------------------------------
   THEME
-------------------------------- */

function loadTheme() {
  const savedTheme = localStorage.getItem("taskflow_theme") || "dark";

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  } else {
    document.body.classList.remove("light-mode");
  }
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");

  const currentTheme = document.body.classList.contains("light-mode")
    ? "light"
    : "dark";

  localStorage.setItem("taskflow_theme", currentTheme);
}

/* ------------------------------
   NOTIFICATIONS
-------------------------------- */

function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}

function showDueNotifications(taskArray) {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  taskArray.forEach((task) => {
    if (isDueToday(task) && !task.completed) {
      new Notification("Task Reminder", {
        body: `${task.text} is due today.`,
      });
    }
  });
}

/* ------------------------------
   EVENTS
-------------------------------- */

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

taskInput.addEventListener("input", saveDraft);
dueDateInput.addEventListener("input", saveDraft);
priorityInput.addEventListener("change", saveDraft);
categoryInput.addEventListener("change", saveDraft);

if (notesInput) {
  notesInput.addEventListener("input", saveDraft);
}

searchInput.addEventListener("input", (e) => {
  currentSearch = e.target.value;
  renderTasks();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

clearCompletedBtn.addEventListener("click", clearCompletedTasks);
themeToggleBtn.addEventListener("click", toggleTheme);

if (sortSelect) {
  sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    localStorage.setItem("taskflow_sort", currentSort);
    renderTasks();
  });
}

if (markAllCompleteBtn) {
  markAllCompleteBtn.addEventListener("click", markAllTasksComplete);
}

if (markAllPendingBtn) {
  markAllPendingBtn.addEventListener("click", markAllTasksPending);
}

if (exportTasksBtn) {
  exportTasksBtn.addEventListener("click", exportTasks);
}

if (importTasksInput) {
  importTasksInput.addEventListener("change", importTasks);
}

/* ------------------------------
   LOGOUT
-------------------------------- */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
  });
}
