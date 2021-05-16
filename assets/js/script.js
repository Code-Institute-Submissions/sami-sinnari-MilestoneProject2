
// Navbar

const navbarToggler = document.querySelector (".hamburger_menu");

const navbar = document.querySelector(".navbar");

navbarToggler.addEventListener("click", () => {
  navbar.classList.toggle("close");
});