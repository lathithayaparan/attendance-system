document.addEventListener("DOMContentLoaded", function () {
    let loggedInUser = localStorage.getItem("loggedInUser");

    if (!loggedInUser) {
        window.location.href = "login.html";
    } else {
        document.getElementById("username").textContent = loggedInUser;
    }

    let today = new Date().toISOString().split("T")[0];
    document.getElementById("attendance-date").value = today;
    loadStudents(today);
});

document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
});

document.getElementById("attendance-date").addEventListener("change", function () {
    let selectedDate = this.value;
    loadStudents(selectedDate);
});

document.getElementById("student-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let studentName = document.getElementById("student-name").value.trim();
    let studentID = document.getElementById("student-id").value.trim();
    let studentClass = document.getElementById("class").value.trim();
    let contact = document.getElementById("contact").value.trim();

    let studentList = JSON.parse(localStorage.getItem("students")) || [];

    if (studentList.some(student => student.id === studentID)) {
        alert("This student is already added.");
        return;
    }

    studentList.push({ name: studentName, id: studentID, class: studentClass, contact: contact });
    localStorage.setItem("students", JSON.stringify(studentList));

    alert("Student added successfully!");
    document.getElementById("student-form").reset();

    let selectedDate = document.getElementById("attendance-date").value;
    loadStudents(selectedDate);
});

function loadStudents(date) {
    let table = document.getElementById("attendance-table");
    let studentList = JSON.parse(localStorage.getItem("students")) || [];
    let attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || {};

    let attendanceForDate = attendanceRecords[date] || {};

    table.innerHTML = "";

    studentList.forEach((student, index) => {
        let attendanceStatus = attendanceForDate[student.id] || "";

        let row = table.insertRow();
        let attendanceCell = document.createElement("td");

        if (attendanceStatus) {
            // If already marked, display status with color
            let statusSpan = document.createElement("span");
            statusSpan.textContent = attendanceStatus;
            statusSpan.classList.add("attendance-status");

            if (attendanceStatus === "Present") {
                statusSpan.classList.add("status-present");
            } else if (attendanceStatus === "Absent") {
                statusSpan.classList.add("status-absent");
            }

            attendanceCell.appendChild(statusSpan);
        } else {
            // If not marked, show buttons
            let presentBtn = document.createElement("button");
            presentBtn.textContent = "Present";
            presentBtn.classList.add("attendance-btn", "present");
            presentBtn.onclick = () => confirmAndMarkAttendance(student.id, date, "Present");

            let absentBtn = document.createElement("button");
            absentBtn.textContent = "Absent";
            absentBtn.classList.add("attendance-btn", "absent");
            absentBtn.onclick = () => confirmAndMarkAttendance(student.id, date, "Absent");

            attendanceCell.appendChild(presentBtn);
            attendanceCell.appendChild(absentBtn);
        }

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.class}</td>
        `;

        row.appendChild(attendanceCell);
        table.appendChild(row);
    });
}

function confirmAndMarkAttendance(studentID, date, status) {
    let confirmation = confirm("Are you sure!\nConfirm once before making attendance");
    if (confirmation) {
        markAttendance(studentID, date, status);
    }
}

function markAttendance(studentID, date, status) {
    let attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || {};

    if (!attendanceRecords[date]) {
        attendanceRecords[date] = {};
    }

    attendanceRecords[date][studentID] = status;
    localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));

    loadStudents(date);
}
