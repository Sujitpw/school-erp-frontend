const searchInput = document.getElementById("searchInput");
const classFilter = document.getElementById("classFilter");
const tableBody = document.getElementById("marksTableBody");

// =======================
// Load All Marks
// =======================

async function loadMarks() {

    const response = await fetch(BASE_URL + "/marks", {
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

    data.forEach(mark => {

        tableBody.innerHTML += `
            <tr>
                <td>${mark.admissionNo}</td>
                <td>${mark.studentName}</td>
                <td>${mark.studentClass}</td>
                <td>${mark.subject}</td>
                <td>${mark.marks}</td>
                <td>${mark.grade}</td>
                <td>
                    <button onclick="editMarks(${mark.id})">
                        Edit
                    </button>

                    <button onclick="deleteMarks(${mark.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

}

// =======================
// Search Marks
// =======================

async function searchMarks(studentName) {

    const response = await fetch(
        BASE_URL + "/marks/search?studentName=" + studentName,
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

async function filterMarks(studentClass) {

    const response = await fetch(
        BASE_URL + "/marks/class?studentClass=" + studentClass,
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
// Delete Marks
// =======================

async function deleteMarks(id) {

    if (!confirm("Delete this marks record?")) {
        return;
    }

    const response = await fetch(
        BASE_URL + "/marks/" + id,
        {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        }
    );

    if (response.ok) {

        alert("Marks Deleted Successfully");

        loadMarks();

    } else {

        alert("Failed to Delete Marks");

    }

}

// =======================
// Edit Marks
// =======================

function editMarks(id) {

    window.location.href =
        "add-marks.html?id=" + id;

}

// =======================
// Search Event
// =======================

searchInput.addEventListener("keyup", function () {

    const value = searchInput.value.trim();

    if (value === "") {

        if (classFilter.value === "") {

            loadMarks();

        } else {

            filterMarks(classFilter.value);

        }

    } else {

        searchMarks(value);

    }

});

// =======================
// Filter Event
// =======================

classFilter.addEventListener("change", function () {

    if (classFilter.value === "") {

        if (searchInput.value.trim() === "") {

            loadMarks();

        } else {

            searchMarks(searchInput.value);

        }

    } else {

        filterMarks(classFilter.value);

    }

});

// =======================
// Initial Load
// =======================

loadMarks();
