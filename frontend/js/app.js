const API_URL = "http://localhost:5000/api/auth"; // Backend API URL
const tokenKey = "authToken"; // Local storage key for JWT

// Toggle between login and register
document.getElementById("toggle-register").addEventListener("click", () => {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("register-section").style.display = "block";
});

document.getElementById("toggle-login").addEventListener("click", () => {
  document.getElementById("register-section").style.display = "none";
  document.getElementById("login-section").style.display = "block";
});

// Register User
document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registration successful! Please log in.");
      document.getElementById("toggle-login").click();
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (err) {
    alert("An error occurred");
  }
});

// Login User
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem(tokenKey, data.token);
      loadTaskSection();
    } else {
      alert(data.message || "Login failed");
    }
  } catch (err) {
    alert("An error occurred");
  }
});

// Load Task Section
function loadTaskSection() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("register-section").style.display = "none";
  document.getElementById("task-section").style.display = "block";
}

// Logout
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem(tokenKey);
  document.getElementById("task-section").style.display = "none";
  document.getElementById("login-section").style.display = "block";
});

// Add Task (Frontend only, backend logic not included yet)
document.getElementById("task-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const taskTitle = document.getElementById("task-title").value;
  const taskDesc = document.getElementById("task-desc").value;
  const taskPriority = document.getElementById("task-priority").value;
  const taskDeadline = document.getElementById("task-deadline").value;

  const taskList = document.getElementById("task-list");
  const taskItem = document.createElement("div");
  taskItem.innerHTML = `<h3>${taskTitle}</h3><p>${taskDesc}</p><p>Priority: ${taskPriority}</p><p>Deadline: ${taskDeadline}</p>`;
  taskList.appendChild(taskItem);

  alert("Task added!");
});
