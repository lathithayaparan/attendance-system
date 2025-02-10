document.addEventListener("DOMContentLoaded", function () {
    let urlParams = new URLSearchParams(window.location.search);
    let selectedDate = urlParams.get("date") || new Date().toISOString().split("T")[0];

    document.getElementById("attendance-date").value = selectedDate;
    loadStudentList();
});

function loadStudentList() {
    let selectedDate = document.getElementById("attendance-date").value;
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords")) || {};
    let attendanceForDate = attendanceRecords[selectedDate] || {};

    let tableBody = document.getElementById("student-list");
    tableBody.innerHTML = "";

    students.forEach((student, index) => {
        let attendanceStatus = attendanceForDate[student.id] || "Not Marked";

        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.class}</td>
            <td>${student.contact}</td>
            <td>${attendanceStatus}</td>
        `;
        tableBody.appendChild(row);
    });
}

function goBack() {
    window.location.href = "home.html";
}
