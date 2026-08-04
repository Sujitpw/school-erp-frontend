const searchInput = document.getElementById("searchInput");
const classFilter = document.getElementById("classFilter");
const tableBody = document.getElementById("studentTableBody");
console.log(window.location.href);
console.log(document.title);
console.log(document.getElementById("classFilter"));
console.log(searchInput);
console.log(classFilter);
console.log(document.body.innerHTML);
// =======================
// Load All Students
// =======================
async function loadStudents() {

    const response = await fetch(BASE_URL + "/students", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });

    const data = await response.json();

    tableBody.innerHTML = "";

    data.content.forEach(student => {

        tableBody.innerHTML += `
            <tr>
                <td>${student.admissionNo}</td>
                <td>${student.name}</td>
                <td>${student.studentClass}</td>
                <td>${student.section}</td>
                <td>${student.rollNo}</td>
                <td>
                    <button onclick="editStudent('${student.admissionNo}')">
                        Edit
                    </button>

                    <button onclick="deleteStudent('${student.admissionNo}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

}

// =======================
// Search Student
// =======================
async function searchStudents(name) {

    const response = await fetch(
        BASE_URL + "/students/search?name=" + name,
        {
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        }
    );

    const data = await response.json();

    tableBody.innerHTML = "";

    data.forEach(student => {

        tableBody.innerHTML += `
            <tr>
                <td>${student.admissionNo}</td>
                <td>${student.name}</td>
                <td>${student.studentClass}</td>
                <td>${student.section}</td>
                <td>${student.rollNo}</td>
                <td>
                    <button onclick="editStudent('${student.admissionNo}')">
                        Edit
                    </button>

                    <button onclick="deleteStudent('${student.admissionNo}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

}

// =======================
// Filter By Class
// =======================
async function filterStudents(studentClass) {

    const response = await fetch(
        BASE_URL + "/students/class?studentClass=" + studentClass,
        {
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        }
    );

    const data = await response.json();

    tableBody.innerHTML = "";

    data.forEach(student => {

        tableBody.innerHTML += `
            <tr>
                <td>${student.admissionNo}</td>
                <td>${student.name}</td>
                <td>${student.studentClass}</td>
                <td>${student.section}</td>
                <td>${student.rollNo}</td>
                <td>
                    <button onclick="editStudent('${student.admissionNo}')">
                        Edit
                    </button>

                    <button onclick="deleteStudent('${student.admissionNo}')">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });

}

// =======================
// Initial Load
// =======================
loadStudents();

// =======================
// Delete Student
// =======================
async function deleteStudent(admissionNo) {

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    const response = await fetch(BASE_URL + "/students/" + admissionNo, {

        method: "DELETE",

        headers: {
            "Authorization": "Bearer " + getToken()
        }

    });

    if (response.ok) {

        alert("Student Deleted Successfully");

        loadStudents();

    }

}

// =======================
// Edit Student
// =======================
function editStudent(admissionNo) {

    window.location.href =
        "add-student.html?admissionNo=" + admissionNo;

}

// =======================
// Search Event
// =======================
searchInput.addEventListener("keyup", function () {

    if (searchInput.value.trim() === "") {

        if (classFilter.value === "") {
            loadStudents();
        } else {
            filterStudents(classFilter.value);
        }

    } else {

        searchStudents(searchInput.value);

    }

});

// =======================
// Filter Event
// =======================
classFilter.addEventListener("change", function () {

    if (classFilter.value === "") {

        if (searchInput.value.trim() === "") {
            loadStudents();
        } else {
            searchStudents(searchInput.value);
        }

    } else {

        filterStudents(classFilter.value);

    }

});
