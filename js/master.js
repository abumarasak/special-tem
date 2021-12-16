// Check if there's Local Storage Color Option
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  //   console.log("Local Storage Is Not Empty");
  //   console.log(localStorage.getItem("color_option"));
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

// Random Background Option
let backgroundOption = true;

// variable To Control the Interval
let backgroundInterval;

// check if there's local storage random background  item
let backgroundLocalItem = localStorage.getItem("background-option");

// Check if random background local storage not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }
  // Remove active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings i").onclick = function () {
  // Toggle Class fa-spin for Rotation on Self
  this.classList.toggle("fa-spin");
  //Toggle Class Open on Main Setting  box
  document.querySelector(".settings-box").classList.toggle("open");
};
/////////////////////////////////////////////////

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

    // Remove Active Class From All children
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    // Add active class on self
    e.target.classList.add("active");
  });
});
// Switch random Background
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// Loop On All List spans
randomBackEl.forEach((span) => {
  // Click On Every span
  span.addEventListener("click", (e) => {
    // Remove Active Class From All span
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    // Add active class on self
    e.target.classList.add("active");
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

///////////////////////////////////////////////////
// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
// Get Array Of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function To Randomize Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      // Change Background Image Url
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
    }, 10000);
  }
}
randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

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

// Create Popup With Image
let OurGallery = document.querySelectorAll(".gallery  img");

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
