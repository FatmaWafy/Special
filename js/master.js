//check local is empty colors?
let maincolor = localStorage.getItem("color-option");
if (maincolor !== null) {
  document.documentElement.style.setProperty("--main-color", maincolor);

  document.querySelectorAll(".colors li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === maincolor) {
      element.classList.add("active");
    }
  });
}
//-----------------------------------------------------------------------------
//setting box
document.querySelector(".toggle i").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};
//------------------------------------------------------------------------------
//colors
let colorlis = document.querySelectorAll(".colors li");
colorlis.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    hanleactive(e);
  });
});
//------------------------------------------------------------------------------
//skills

const ourskills = document.querySelector(".skills");
let allskills = document.querySelectorAll(".skills-box .skill-progress span");

window.onscroll = function () {
  let skillsofsettop = ourskills.offsetTop;
  let skillsouterheight = ourskills.offsetHeight;
  let windowheight = this.innerHeight;
  let windowscrolltop = this.pageYOffset;

  if (
    windowscrolltop >
    skillsofsettop + skillsouterheight - windowheight - 300
  ) {
    allskills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};
//popop for image
let gallery = document.querySelectorAll(".gallery img");
gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //create overlay
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    //create box
    let box = document.createElement("div");
    box.className = "popup-box";

    //show alternate text
    if (img.alt !== null) {
      let imghead = document.createElement("h3");
      let imgtext = document.createTextNode(img.alt);
      imghead.appendChild(imgtext);
      box.appendChild(imghead);
    }

    //create img and  change src
    let popupimg = document.createElement("img");
    popupimg.src = img.src;

    // add image inside box
    box.appendChild(popupimg);

    //add all inside body
    document.body.appendChild(box);

    //create close span
    let closespan = document.createElement("span");
    let closespantext = document.createTextNode("X");
    closespan.className = "close-span";
    closespan.appendChild(closespantext);
    box.appendChild(closespan);
  });
});
//close popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-span") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// function for scrolling to somewhere
let allbullets = document.querySelectorAll(".nav-bullets .bullets");
let alllinks = document.querySelectorAll(".links a");

function scrolling(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrolling(allbullets);
scrolling(alllinks);

//handle active state
function hanleactive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
}
//bullets options
let bulletsspan = document.querySelectorAll(".bullets-option span");
let bulletscontainer = document.querySelectorAll(".nav-bullets");

bulletsspan.forEach((span) => {
  span.addEventListener("click", (e) => {
    e.stopPropagation();
    if (span.dataset.bullets === "yes") {
      bulletscontainer.style.display = "block";
    } else {
      bulletscontainer.style.display = "none";
    }
  });
});
//toggle menu
let togglemenu = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

togglemenu.onclick = function () {
  this.classList.toggle("menu-active");
  tlinks.classList.toggle("open");
};

//click aanywhere on screen to toggle menu
document.addEventListener("click", (e) => {
  if (e.target !== togglemenu && e.target !== tlinks) {
    if (tlinks.classList.contains("open")) {
      togglemenu.classList.toggle("menu-active");
      tlinks.classList.toggle("open");
    }
  }
});
tlinks.onclick = function () {
  e.stopPropagation();
};
