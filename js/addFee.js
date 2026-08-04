const feeForm = document.getElementById("feeForm");

const admissionNo = document.getElementById("admissionNo");
const studentName = document.getElementById("studentName");
const studentClass = document.getElementById("studentClass");
const totalFee = document.getElementById("totalFee");
const paidAmount = document.getElementById("paidAmount");

// =======================
// Check Edit Mode
// =======================

const params = new URLSearchParams(window.location.search);
const feeId = params.get("id");

// =======================
// Load Fee By Id
// =======================

async function loadFee() {

    const response = await fetch(
        BASE_URL + "/fees/" + feeId,
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
    totalFee.value = data.totalFee;
    paidAmount.value = data.paidAmount;

}

// =======================
// Save / Update Fee
// =======================

feeForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const fee = {

        admissionNo: admissionNo.value,
        studentName: studentName.value,
        studentClass: Number(studentClass.value),
        totalFee: Number(totalFee.value),
        paidAmount: Number(paidAmount.value)

    };

    let url = BASE_URL + "/fees";
    let method = "POST";

    if (feeId != null) {

        url = BASE_URL + "/fees/" + feeId;
        method = "PUT";

    }

    const response = await fetch(url, {

        method: method,

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },

        body: JSON.stringify(fee)

    });

    if (response.ok) {

        if (feeId == null) {

            alert("Fee Added Successfully");

        } else {

            alert("Fee Updated Successfully");

        }

        window.location.href = "fees.html";

    } else {

        alert("Something went wrong!");

    }

});

// =======================
// Load Existing Data
// =======================

if (feeId != null) {

    loadFee();

}
