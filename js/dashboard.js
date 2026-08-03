// Dashboard Cards
async function loadDashboard() {

    const response = await fetch(
        BASE_URL + "/dashboard",
        {
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
    );

    const data = await response.json();

    document.getElementById("totalStudents").innerText =
        data.totalStudents;

    document.getElementById("totalClasses").innerText =
        data.totalClasses;

    document.getElementById("presentToday").innerText =
        data.presentToday;

    document.getElementById("absentToday").innerText =
        data.absentToday + " Absent";

    document.getElementById("feesCollected").innerText =
        "₹" + (data.totalFeesCollected ?? 0);

    document.getElementById("pendingFees").innerText =
        "₹" + (data.totalPendingFees ?? 0) + " Pending";
}


async function loadRecentStudents() {

    const response = await fetch(
        BASE_URL + "/students/recent",
        {
            headers: {
                Authorization: "Bearer " + getToken()
            }
        }
    );

    const students = await response.json();

    const tbody = document.getElementById("recentStudentsBody");

    tbody.innerHTML = "";

    students.forEach(student => {

        tbody.innerHTML += `
            <tr>
    <td>${student.admissionNo}</td>
    <td>${student.name}</td>
    <td>${student.studentClass}</td>
    <td>${student.rollNo}</td>
           </tr>
        `;

    });

}

loadDashboard();
loadRecentStudents();
// ===========================
// Sidebar Toggle
// ===========================

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");

if (menuToggle && sidebar && mainContent) {

    menuToggle.addEventListener("click", function () {

        sidebar.classList.toggle("hide");
        mainContent.classList.toggle("full");

    });

}