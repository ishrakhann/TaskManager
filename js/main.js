// Handle Login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    localStorage.setItem("loggedInUser", username);
    window.location.href = "dashboard.html";
  });
}

// Handle Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
  });
}

// Task Handling
const taskForm = document.getElementById("taskForm");
const taskContainer = document.getElementById("taskContainer");

function renderTasks() {
  if (!taskContainer) return;
  taskContainer.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <div>
        <strong>${task.title}</strong><br>
        <small>${task.desc}</small>
      </div>
      <div class="task-actions">
        <button onclick="toggleComplete(${index})">${task.completed ? "Undo" : "Complete"}</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskContainer.appendChild(li);
  });
}

if (taskForm) {
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("taskTitle").value;
    const desc = document.getElementById("taskDesc").value;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ title, desc, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    taskForm.reset();
  });
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleComplete(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function editTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const newTitle = prompt("Edit Task Title:", tasks[index].title);
  const newDesc = prompt("Edit Task Description:", tasks[index].desc);
  if (newTitle !== null && newTitle.trim() !== "") {
    tasks[index].title = newTitle;
    tasks[index].desc = newDesc;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

renderTasks();
