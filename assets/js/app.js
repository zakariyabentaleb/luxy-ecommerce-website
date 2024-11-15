
const userNameSpan = document.getElementById("username-span");
const user = JSON.parse(localStorage.getItem("user"));
if (user) {
  userNameSpan.textContent = user.username;
}
// DOM Variables for nav
const leftLinks = document.querySelector("#left-links");
const cards = document.querySelector("#cards");
const menu = document.querySelector("#menu");
const cartBtn = document.querySelector("#card-btn");

// events for nav
cartBtn.addEventListener("click", () => {
  cards.classList.toggle("w-0");
  cards.classList.toggle("w-3/4");
});
menu.addEventListener("click", () => {
  leftLinks.classList.toggle("left-[-800px]");
  leftLinks.classList.toggle("left-[12.5%]");
});
