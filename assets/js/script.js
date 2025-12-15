'use strict';

// --- ELEMENT TOGGLE FUNCTION ---
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// --- SIDEBAR TOGGLE (Mobile) ---
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if(sidebarBtn) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}


// --- PAGE NAVIGATION ---
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    
    // 1. Remove active class from all
    for (let j = 0; j < navigationLinks.length; j++) {
      navigationLinks[j].classList.remove("active");
    }
    for (let j = 0; j < pages.length; j++) {
      pages[j].classList.remove("active");
    }
    
    // 2. Add active class to clicked
    this.classList.add("active");
    
    // 3. Show corresponding page
    const pageName = this.innerHTML.toLowerCase();
    
    for (let j = 0; j < pages.length; j++) {
      if (pageName === pages[j].dataset.page) {
        pages[j].classList.add("active");
        window.scrollTo(0, 0);
      }
    }
  });
}
// --- PORTFOLIO FILTERING ---
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

    for (let k = 0; k < filterItems.length; k++) {
      if (selectedValue === "all") {
        filterItems[k].classList.add("active");
      } else if (selectedValue === filterItems[k].dataset.category) {
        filterItems[k].classList.add("active");
      } else {
        filterItems[k].classList.remove("active");
      }
    }
  });
}