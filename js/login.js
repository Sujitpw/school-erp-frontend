// ============================
// Password Show / Hide
// ============================

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

// ============================
// Login
// ============================

const loginForm = document.getElementById("loginForm");
const loadingPopup = document.getElementById("loadingPopup");
const loadingTitle = document.getElementById("loadingTitle");
const loadingMessage = document.getElementById("loadingMessage");

loginForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    const requestBody = {

        username,
        password

    };

    // ===========================
    // Show Loading Popup
    // ===========================

    loadingPopup.classList.add("show");

    loadingTitle.innerText = "Starting the server...";
    loadingMessage.innerText =
        "Please wait while we wake up the server.";

    // Dynamic Messages

    const msg1 = setTimeout(() => {

        loadingTitle.innerText = "Connecting securely...";
        loadingMessage.innerText =
            "Establishing a secure connection with the server.";

    }, 4000);

    const msg2 = setTimeout(() => {

        loadingTitle.innerText = "Preparing your dashboard...";
        loadingMessage.innerText =
            "Loading your data and personal workspace.";

    }, 9000);

    const msg3 = setTimeout(() => {

        loadingTitle.innerText = "Almost there...";
        loadingMessage.innerText =
            "Finalizing everything for you.";

    }, 14000);

    try {

        const response = await fetch(BASE_URL + "/api/users/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(requestBody)

        });

        const data = await response.json();

        clearTimeout(msg1);
        clearTimeout(msg2);
        clearTimeout(msg3);

        if (response.ok) {

            localStorage.setItem("token", data.token);

            // Show success message

            loadingTitle.innerText = "Welcome!";
            loadingMessage.innerText =
                "Login successful. Redirecting...";

            setTimeout(() => {

                loadingPopup.classList.remove("show");
                window.location.href = "dashboard.html";

            }, 1200);

        } else {

            loadingPopup.classList.remove("show");

            alert("Invalid Username or Password");

        }

    } catch (error) {

        clearTimeout(msg1);
        clearTimeout(msg2);
        clearTimeout(msg3);

        loadingPopup.classList.remove("show");

        alert(
            "Unable to connect to the server.\n\nPlease try again in a few moments."
        );

    }

});