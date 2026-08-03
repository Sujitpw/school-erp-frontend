const params = new URLSearchParams(window.location.search);

const admissionNo = params.get("admissionNo");

console.log(admissionNo);
if (admissionNo) {
    loadStudent();
}

async function loadStudent() {

    const response = await fetch(BASE_URL + "/students/" + admissionNo, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    });

    const student = await response.json();

    console.log(student);
    document.getElementById("admissionNo").value = student.admissionNo;
document.getElementById("rollNo").value = student.rollNo;
document.getElementById("name").value = student.name;
document.getElementById("studentClass").value = student.studentClass;
document.getElementById("section").value = student.section;
document.getElementById("gender").value = student.gender;
document.getElementById("dateOfBirth").value = student.dateOfBirth;

document.getElementById("fatherName").value = student.fatherName;
document.getElementById("fatherPhone").value = student.fatherPhone;
document.getElementById("fatherOccupation").value = student.fatherOccupation;

document.getElementById("motherName").value = student.motherName;
document.getElementById("motherPhone").value = student.motherPhone;
document.getElementById("motherOccupation").value = student.motherOccupation;

document.getElementById("address").value = student.address;
document.getElementById("city").value = student.city;
document.getElementById("state").value = student.state;
document.getElementById("pincode").value = student.pincode;

}
const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", saveStudent);

async function saveStudent(event) {

    event.preventDefault();

    const student = {

    admissionNo: document.getElementById("admissionNo").value,
    rollNo: document.getElementById("rollNo").value,
    name: document.getElementById("name").value,
    gender: document.getElementById("gender").value,
    dateOfBirth: document.getElementById("dateOfBirth").value,

    studentClass: document.getElementById("studentClass").value,
    section: document.getElementById("section").value,

    fatherName: document.getElementById("fatherName").value,
    fatherPhone: document.getElementById("fatherPhone").value,
    fatherOccupation: document.getElementById("fatherOccupation").value,

    motherName: document.getElementById("motherName").value,
    motherPhone: document.getElementById("motherPhone").value,
    motherOccupation: document.getElementById("motherOccupation").value,

    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    pincode: document.getElementById("pincode").value

};

console.log(student);
if (admissionNo) {

    const response = await fetch(BASE_URL + "/students/" + admissionNo, {

    method: "PUT",

    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getToken()
    },

    body: JSON.stringify(student)

});

if (response.ok) {

    alert("Student Updated Successfully");

    window.location.href = "students.html";

}

} else {

   const response = await fetch(BASE_URL + "/students", {

    method: "POST",

    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getToken()
    },

    body: JSON.stringify(student)

});

if (response.ok) {

    alert("Student Added Successfully");

    window.location.href = "students.html";

}

}
}