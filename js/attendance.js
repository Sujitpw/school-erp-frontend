const searchInput = document.getElementById("searchInput");
const classFilter = document.getElementById("classFilter");
const tableBody = document.getElementById("attendanceTableBody");

// =======================
// Load All Attendance
// =======================

async function loadAttendance() {

    const response = await fetch(BASE_URL + "/attendance", {
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });

    const data = await response.json();

    renderTable(data);

}

// =======================
// Render Table
// =======================

function renderTable(data) {

    tableBody.innerHTML = "";

    data.forEach(attendance => {

        tableBody.innerHTML += `
            <tr>
                <td>${attendance.admissionNo}</td>
                <td>${attendance.studentName}</td>
                <td>${attendance.studentClass}</td>
                <td>${attendance.attendanceDate}</td>
                <td>${attendance.status}</td>
                <td>
                    <button onclick="editAttendance(${attendance.id})">
                        Edit
                    </button>

                    <button onclick="deleteAttendance(${attendance.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

}

// =======================
// Search Attendance
// =======================

async function searchAttendance(studentName) {

    const response = await fetch(
        BASE_URL + "/attendance/search?studentName=" + studentName,
        {
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        }
    );

    const data = await response.json();

    renderTable(data);

}

// =======================
// Filter By Class
// =======================

async function filterAttendance(studentClass) {

    const response = await fetch(
        BASE_URL + "/attendance/class?studentClass=" + studentClass,
        {
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        }
    );

    const data = await response.json();

    renderTable(data);

}

// =======================
// Delete Attendance
// =======================

async function deleteAttendance(id) {

    if (!confirm("Delete this attendance?")) {
        return;
    }

    const response = await fetch(
        BASE_URL + "/attendance/" + id,
        {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        }
    );

    if (response.ok) {

        alert("Attendance Deleted Successfully");

        loadAttendance();

    }

}

// =======================
// Edit Attendance
// =======================

function editAttendance(id) {

    window.location.href =
        "add-attendance_page.html?id=" + id;

}

// =======================
// Search Event
// =======================

searchInput.addEventListener("keyup", function () {

    const value = searchInput.value.trim();

    if (value === "") {

        if (classFilter.value === "") {

            loadAttendance();

        } else {

            filterAttendance(classFilter.value);

        }

    } else {

        searchAttendance(value);

    }

});

// =======================
// Filter Event
// =======================

classFilter.addEventListener("change", function () {

    if (classFilter.value === "") {

        loadAttendance();

    } else {

        filterAttendance(classFilter.value);

    }

});

// =======================
// Initial Load
// =======================

loadAttendance();
