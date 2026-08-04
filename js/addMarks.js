const marksForm = document.getElementById("marksForm");

const admissionNo = document.getElementById("admissionNo");
const studentName = document.getElementById("studentName");
const studentClass = document.getElementById("studentClass");
const subject = document.getElementById("subject");
const marks = document.getElementById("marks");
const grade = document.getElementById("grade");

// =======================
// Check Edit Mode
// =======================

const params = new URLSearchParams(window.location.search);
const marksId = params.get("id");

// =======================
// Load Marks By Id
// =======================

async function loadMarks() {

    const response = await fetch(
        BASE_URL + "/marks/" + marksId,
        {
            headers: {
                "Authorization": "Bearer " + getToken()
            }
        }
    );

    const data = await response.json();

    admissionNo.value = data.admissionNo;
    studentName.value = data.studentName;
    studentClass.value = data.studentClass;
    subject.value = data.subject;
    marks.value = data.marks;
    grade.value = data.grade;

}

// =======================
// Save / Update
// =======================

marksForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const mark = {

        admissionNo: admissionNo.value,
        studentName: studentName.value,
        studentClass: Number(studentClass.value),
        subject: subject.value,
        marks: Number(marks.value),
        grade: grade.value

    };

    let url = BASE_URL + "/marks";
    let method = "POST";

    if (marksId != null) {

        url = BASE_URL + "/marks/" + marksId;
        method = "PUT";

    }

    const response = await fetch(url, {

        method: method,

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },

        body: JSON.stringify(mark)

    });

    if (response.ok) {

        if (marksId == null) {

            alert("Marks Added Successfully");

        } else {

            alert("Marks Updated Successfully");

        }

        window.location.href = "marks.html";

    } else {

        alert("Something went wrong!");

    }

});

// =======================
// Load Edit Data
// =======================

if (marksId != null) {

    loadMarks();

}
