// Password Show/Hide

const eye = document.querySelector(".eye");
const password = document.getElementById("password");

eye.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";
        eye.classList.replace("fa-eye", "fa-eye-slash");

    } else {

        password.type = "password";
        eye.classList.replace("fa-eye-slash", "fa-eye");

    }

});

// Login API

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const requestBody = {
        username: username,
        password: password
    };

    const response = await fetch(BASE_URL + "/api/users/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(requestBody)

    });

    const data = await response.json();

    console.log("Response:", data);

    if (response.ok) {

        console.log("Token =", data.token);

        localStorage.setItem("token", data.token);

        console.log("Saved =", localStorage.getItem("token"));

        window.location.href = "dashboard.html";

    } else {

        alert("Invalid Username or Password");

    }

});
