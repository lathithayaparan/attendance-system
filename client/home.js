// Retrieve the logged-in username from localStorage
document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = localStorage.getItem("loggedInUser");

    // If no user is logged in, redirect to login page
    if (!loggedInUser) {
        window.location.href = "login.html";
    } else {
        // Display the username in the welcome message
        document.getElementById("username").textContent = loggedInUser;
    }
});

// Logout Function - Clears user data and redirects to login page
document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("loggedInUser"); // Remove user session
    window.location.href = "login.html"; // Redirect to login page
});

// Add Student Functionality
document.getElementById("student-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let studentName = document.getElementById("student-name").value;
    let studentID = document.getElementById("student-id").value;
    let studentClass = document.getElementById("class").value;
    let contact = document.getElementById("contact").value;

    if (!studentName || !studentID || !studentClass || !contact) {
        alert("Please fill in all fields.");
        return;
    }

    let table = document.getElementById("attendance-table");
    let rowCount = table.rows.length;
    let row = table.insertRow();

    row.innerHTML = `
        <td>${rowCount + 1}</td>
        <td>${studentName}</td>
        <td>${studentID}</td>
        <td>${studentClass}</td>
        <td>
            <button class="attendance-btn present" onclick="markAttendance(this, 'Present')">Present</button>
            <button class="attendance-btn absent" onclick="markAttendance(this, 'Absent')">Absent</button>
        </td>
    `;

    document.getElementById("student-form").reset();
});

// Mark Attendance Function
function markAttendance(button, status) {
    let row = button.parentElement.parentElement;
    let buttons = row.querySelectorAll(".attendance-btn");

    buttons.forEach(btn => btn.disabled = false);
    button.disabled = true;
}
