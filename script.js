// Local storage key
const STORAGE_KEY = "studentsData";

// DOM elements
const form = document.getElementById("studentForm");
const tableBody = document.getElementById("studentTable");

// Load existing data on refresh
document.addEventListener("DOMContentLoaded", loadStudents);

/* ==========================
   FORM SUBMISSION HANDLER
========================== */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const id = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();

    if (!validateInputs(name, id, email, contact)) {
        return;
    }

    const student = { name, id, email, contact };
    const students = getStudents();

    students.push(student);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));

    form.reset();
    loadStudents();
});

/* ==========================
   VALIDATION LOGIC
========================== */
function validateInputs(name, id, email, contact) {

    const namePattern = /^[A-Za-z ]+$/;
    const numberPattern = /^[0-9]+$/;

    if (!name || !id || !email || !contact) {
        alert("Empty fields are not allowed");
        return false;
    }

    if (!namePattern.test(name)) {
        alert("Student name must contain only characters");
        return false;
    }

    if (!numberPattern.test(id)) {
        alert("Student ID must be numeric");
        return false;
    }

    if (!numberPattern.test(contact) || contact.length < 10) {
        alert("Contact number must be at least 10 digits");
        return false;
    }

    return true;
}

/* ==========================
   DISPLAY & CRUD OPERATIONS
========================== */
function loadStudents() {
    tableBody.innerHTML = "";
    const students = getStudents();

    students.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="action-btn" onclick="editStudent(${index})">Edit</button>
                <button class="action-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

/* ==========================
   EDIT STUDENT
========================== */
function editStudent(index) {
    const students = getStudents();
    const student = students[index];

    document.getElementById("studentName").value = student.name;
    document.getElementById("studentId").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("contact").value = student.contact;

    deleteStudent(index);
}

/* ==========================
   DELETE STUDENT
========================== */
function deleteStudent(index) {
    const students = getStudents();
    students.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    loadStudents();
}

/* ==========================
   GET STORAGE DATA
========================== */
function getStudents() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}
