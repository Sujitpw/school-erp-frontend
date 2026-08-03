const searchInput = document.getElementById("searchInput");
const classFilter = document.getElementById("classFilter");
const tableBody = document.getElementById("feeTableBody");

// =======================
// Load All Fees
// =======================

async function loadFees() {

    const response = await fetch(BASE_URL + "/fees", {
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

    data.forEach(fee => {

        tableBody.innerHTML += `
            <tr>
                <td>${fee.admissionNo}</td>
                <td>${fee.studentName}</td>
                <td>${fee.studentClass}</td>
                <td>₹${fee.totalFee}</td>
                <td>₹${fee.paidAmount}</td>
                <td>₹${fee.remainingFee}</td>
                <td>${fee.paymentStatus}</td>
                <td>
                    <button onclick="editFee(${fee.id})">
                        Edit
                    </button>

                    <button onclick="deleteFee(${fee.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;

    });

}

// =======================
// Search Fee
// =======================

async function searchFee(studentName) {

    const response = await fetch(
        BASE_URL + "/fees/search?studentName=" + studentName,
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

async function filterFee(studentClass) {

    const response = await fetch(
        BASE_URL + "/fees/class?studentClass=" + studentClass,
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
// Delete Fee
// =======================

async function deleteFee(id) {

    if (!confirm("Delete this fee record?")) {
        return;
    }

    const response = await fetch(
        BASE_URL + "/fees/" + id,
        {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        }
    );

    if (response.ok) {

        alert("Fee Deleted Successfully");

        loadFees();

    } else {

        alert("Failed to Delete Fee");

    }

}

// =======================
// Edit Fee
// =======================

function editFee(id) {

    window.location.href =
        "add-fee.html?id=" + id;

}

// =======================
// Search Event
// =======================

searchInput.addEventListener("keyup", function () {

    const value = searchInput.value.trim();

    if (value === "") {

        if (classFilter.value === "") {

            loadFees();

        } else {

            filterFee(classFilter.value);

        }

    } else {

        searchFee(value);

    }

});

// =======================
// Filter Event
// =======================

classFilter.addEventListener("change", function () {

    if (classFilter.value === "") {

        if (searchInput.value.trim() === "") {

            loadFees();

        } else {

            searchFee(searchInput.value);

        }

    } else {

        filterFee(classFilter.value);

    }

});

// =======================
// Initial Load
// =======================

loadFees();