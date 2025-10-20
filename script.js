// --- Page Navigation ---
const pages = document.querySelectorAll(".page");
const nextBtn = document.querySelector(".nextBtn");
const backBtn = document.querySelector(".backBtn");
let currentPage = 0;

function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.toggle("active", i === index);
  });
  updateButtons();
}

function updateButtons() {
  backBtn.style.display = currentPage === 0 ? "none" : "block";
  nextBtn.style.display = pages[currentPage].id === "logoutPage" ? "none" : "block";
}

// --- Next & Back Buttons ---
nextBtn.addEventListener("click", () => {
  if (pages[currentPage].id === "logoutPage") return; // Stop on logout page
  currentPage = (currentPage + 1) % pages.length;
  showPage(currentPage);
});

backBtn.addEventListener("click", () => {
  if (currentPage > 0) currentPage--;
  showPage(currentPage);
});

updateButtons();


// --- LOGOUT PAGE ---
document.getElementById("logoutBtn").addEventListener("click", () => {
  alert("You have logged out safely.");

  // Hide dashboard completely
  document.getElementById("dashboardPage").style.display = "none";

  // Hide any open subpages
  document.querySelectorAll(".subPage").forEach(sp => sp.classList.remove("active"));

  // Show logout page only
  currentPage = Array.from(pages).findIndex(p => p.id === "logoutPage");
  pages.forEach(p => p.classList.remove("active"));
  pages[currentPage].classList.add("active");

  updateButtons();
});
// --- Go Home from Logout Page ---
document.getElementById("homeBtn").addEventListener("click", () => {
  // Hide logout page
  document.getElementById("logoutPage").classList.remove("active");

  // Reset all pages and go to first (login/home)
  pages.forEach(p => p.classList.remove("active"));
  currentPage = 0;
  pages[currentPage].classList.add("active");

  // Show the main dashboard container again
  document.querySelector(".dashboard-container").style.display = "flex";

  // Update navigation buttons
  updateButtons();
});

// --- DASHBOARD FUNCTIONALITY ---
const subPages = document.querySelectorAll(".subPage");
const dashboardPage = document.getElementById("dashboardPage");

function showSubPage(id) {
  dashboardPage.style.display = "none";
  subPages.forEach(sp => sp.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function backToDashboard() {
  subPages.forEach(sp => sp.classList.remove("active"));
  dashboardPage.style.display = "flex";
}

document.querySelectorAll(".backDashboard").forEach(btn => {
  btn.addEventListener("click", backToDashboard);
});

// --- Dashboard Buttons ---
document.getElementById("safeZoneBtn").addEventListener("click", () => showSubPage("safeZonesPage"));
document.getElementById("safeTipsBtn").addEventListener("click", () => showSubPage("safeTipsPage"));
document.getElementById("sendMsgBtn").addEventListener("click", () => showSubPage("sendMessagePage"));
document.getElementById("callPoliceBtn").addEventListener("click", () => showSubPage("callPolicePage"));

// --- Share Location Button ---
document.getElementById("shareLocationBtn").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const mapLink = `https://www.google.com/maps?q=${lat},${lon}`;
        alert("Location shared successfully!");
        window.open(mapLink, "_blank");
      },
      () => {
        alert("Unable to access location. Please allow permission.");
      }
    );
  } else {
    alert("Geolocation not supported by your browser.");
  }
});

// --- Add Contact Button ---
document.getElementById("addContactBtn").addEventListener("click", () => {
  const name = prompt("Enter contact name:");
  const number = prompt("Enter contact number:");
  if (name && number) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push({ name, number });
    localStorage.setItem("contacts", JSON.stringify(contacts));
    alert(`Contact ${name} added successfully!`);
  } else {
    alert("Contact not saved. Please enter valid details.");
  }
});

// --- SOS Button ---
document.getElementById("sosBtn").addEventListener("click", () => {
  const output = document.getElementById("dashboardOutput");
  output.textContent =
    "Nearby Safe Zones: Police Station, Hospital, Women's Help Center.";
});
// --- LOGIN VALIDATION ---
document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  
  const savedUser = localStorage.getItem("username");
  const savedPass = localStorage.getItem("password");

  if (username === "" || password === "") {
    alert("⚠️ Please enter both username and password!");
    return;
  }

  if (username === savedUser && password === savedPass) {
    alert("✅ Login successful!");
    document.getElementById("loginPage").classList.remove("active");
    document.getElementById("dashboardPage").classList.add("active");
  } else {
    alert("❌ Invalid username or password!");
  }
});


// --- REGISTER VALIDATION ---
document.getElementById("registerBtn").addEventListener("click", () => {
  const name = document.querySelector("#registerPage input[placeholder='Full Name']").value.trim();
  const email = document.querySelector("#registerPage input[placeholder='Email']").value.trim();
  const pass = document.querySelector("#registerPage input[placeholder='Create Password']").value.trim();

  if (name === "" || email === "" || pass === "") {
    alert("⚠️ Please fill all fields before registering!");
    return;
  }

  
  localStorage.setItem("username", name);
  localStorage.setItem("password", pass);

  alert("✅ Registered successfully! You can now log in.");

  
  document.getElementById("registerPage").classList.remove("active");
  document.getElementById("loginPage").classList.add("active");
});

