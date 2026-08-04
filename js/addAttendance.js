const params = new URLSearchParams(window.location.search);
const attendanceId = params.get("id");

const form = document.getElementById("attendanceForm");

// ======================
// Load Attendance By Id
// ======================

if (attendanceId) {
    loadAttendance(attendanceId);
}

async function loadAttendance(id) {

    const response = await fetch(
        BASE_URL + "/attendance/" + id,
        {
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        }
    );

    const attendance = await response.json();

    document.getElementById("admissionNo").value = attendance.admissionNo;
    document.getElementById("studentName").value = attendance.studentName;
    document.getElementById("studentClass").value = attendance.studentClass;
    document.getElementById("attendanceDate").value = attendance.attendanceDate;
    document.getElementById("status").value = attendance.status;

}

// ======================
// Save / Update
// ======================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const attendance = {

        admissionNo: document.getElementById("admissionNo").value,
        studentName: document.getElementById("studentName").value,
        studentClass: Number(document.getElementById("studentClass").value),
        attendanceDate: document.getElementById("attendanceDate").value,
        status: document.getElementById("status").value

    };

    let url = BASE_URL + "/attendance";
    let method = "POST";

    if (attendanceId) {

        url = BASE_URL + "/attendance/" + attendanceId;
        method = "PUT";

    }

    const response = await fetch(url, {

        method: method,

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },

        body: JSON.stringify(attendance)

    });

    if (response.ok) {

        alert(attendanceId
            ? "Attendance Updated Successfully"
            : "Attendance Saved Successfully");

        window.location.href = "attendance_page.html";

    } else {

        alert("Something went wrong.");

    }

});
