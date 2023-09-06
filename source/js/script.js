let header = document.querySelector(".header");
let navList = document.querySelector(".site-list");
let navToggle = document.querySelector(".navigation__toggle");
let navClue = document.querySelector(".navigation__clue");

navList.classList.remove("site-list--nojs");
navToggle.classList.remove("navigation__toggle--nojs");

navToggle.addEventListener("click", function () {
  if (navList.classList.contains("site-list--closed")) {
    navList.classList.remove("site-list--closed");
    navToggle.classList.add("navigation__toggle--closed");
    navClue.textContent = "Закрыть меню.";
  } else {
    navList.classList.add("site-list--closed");
    navToggle.classList.remove("navigation__toggle--closed");
    navClue.textContent = "Открыть меню.";
  }
});

window.addEventListener('resize', (e) => {
  navList.style.top = header.offsetHeight + "px";
});
