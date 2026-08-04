const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");
const mainContent = document.querySelector(".main-content");

if (menuToggle && sidebar && mainContent) {

    menuToggle.addEventListener("click", function () {

        sidebar.classList.toggle("hide");
        mainContent.classList.toggle("full");

    });

    document.addEventListener("click", function (e) {

        if (
            window.innerWidth <= 768 &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {

            sidebar.classList.add("hide");
            mainContent.classList.add("full");

        }

    });

}