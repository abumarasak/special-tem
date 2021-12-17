/////////////////// Variable //////////////////

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Get Array Of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
// Select Skills Selector
let ourSkills = document.querySelector(".skills");
// Create Popup With Image
let OurGallery = document.querySelectorAll(".gallery  img");
// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Select All Header Links
const allLinks = document.querySelectorAll(".links  a");
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

//////////////////////////////////////////////////

///////////////////// Colors Root ////////////////////
let mainColor = localStorage.getItem("color_option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  // Remove Active Class From All Colors List Item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // Add Active Class On Element With Data-Color === Local Storage Item
    if (element.dataset.color === mainColor) {
      // Add class active
      element.classList.add("active");
    }
  });
}
// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
// Loop On All List Item
colorsLi.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color on Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});
/////////////// Random Background ////////////////////////////////////////////////////

// Random Background Option
let backgroundOption = true;

// variable To Control the Interval
let backgroundInterval;

// check if there's local storage random background  item
let backgroundLocalItem = localStorage.getItem("background-option");

// Remove active class from all spans
if (localStorage.getItem("background-option") !== null) {
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
}

// Check if random background local storage not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}
// Switch random Background
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// Loop On All List spans
randomBackEl.forEach((span) => {
  // Click On Every span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});
// Function To Randomize Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // Change Background Image Url
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
    }, 5000);
  }
}
randomizeImgs();
////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////// Settings Page ////////////////////////

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings i").onclick = function () {
  // Toggle Class fa-spin for Rotation on Self
  this.classList.toggle("fa-spin");
  //Toggle Class Open on Main Setting  box
  document.querySelector(".settings-box").classList.toggle("open");
};

//////////////////////////////////////////////////////////////////

//////////////////////// Skills Animation ////////////////////////////////

window.onscroll = function () {
  // Skills of Set Top
  let skillsOfSetTop = ourSkills.offsetTop;

  //Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOfSetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//////////////////////////////////////////////////////

//////////////////////// Gallery Page ////////////////////

OurGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");
    // add class To overlay
    overlay.className = "popup-overlay";

    // Append Overlay To The Body
    document.body.appendChild(overlay);

    // create The Popup
    let popupBox = document.createElement("div");

    // Add Class To The Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);

      // Append the Text To heading
      imgHeading.appendChild(imgText);

      // Append The Heading To Popup Box
      popupBox.appendChild(imgHeading);
    }
    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;
    console.log(popupImage.src);

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Add Popup Box To Body
    document.body.appendChild(popupBox);

    // Create The CloseSpan
    let closeButton = document.createElement("span");

    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);
    // Add Class TO Button
    closeButton.className = "close-button";

    // Add Close Button To popup Box
    popupBox.appendChild(closeButton);
  });
});
// Close popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentElement.remove();
    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

//////////////////////////////////////////////////////////////////

////////////////// Scroll Function//////////////////

function scrollToSomewhere(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);
///////////////////////////////////////////////////

/////////////////////// Handle Active State /////////////////////////

function handleActive(ev) {
  // Remove Active Class From All span
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // Add active class on self
  ev.target.classList.add("active");
}

//////////////////////////////////////////////////////////////////////

////////////////////// NAV Bullets //////////////////////

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

///////////////////////////////////////////

///////////// Reset Settins //////////////////
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("background-option");

  // Relode Window
  window.location.reload();
};

////////////////////////////////////////////////////

/////////////// Toggle Menu //////////////////////

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

// Click Anywhere outside Menu And Toggle Button

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.remove("menu-active");
      tLinks.classList.remove("open");
    }
  }
});

// Stop Propagation on Links
tLinks.onclick = function (e) {
  e.stopPropagation();
};
