const expandBtn = document.querySelector(".hamburger");
const primaryNav = document.querySelector(".primary-nav");
const itemsNav = document.querySelectorAll(".menu-item");
const body = document.querySelector("body");

expandBtn.addEventListener("click", () => {
  if (expandBtn.getAttribute("data-visible") === "false") {
    expandBtn.setAttribute("data-visible", true);
    expandBtn.setAttribute("aria-expanded", true);
    primaryNav.classList.toggle("expand");
  } else {
    expandBtn.setAttribute("data-visible", false);
    expandBtn.setAttribute("aria-expanded", false);
    primaryNav.classList.toggle("expand");
  }
});

itemsNav.forEach(item => {
  item.addEventListener("click", () => {
    expandBtn.setAttribute("data-visible", false);
    expandBtn.setAttribute("aria-expanded", false);
    primaryNav.classList.toggle("expand");
  })
});