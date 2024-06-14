let backgroundOptions = true;
let backgroundInterval;

let maincolorLocalItem = localStorage.getItem("color-option");
let backgroundLocalItem = localStorage.getItem("background-option");
let bulletLocalItem = localStorage.getItem("bullets-option");

let navBullets = document.querySelector(".nav-bullets");
let bulletsOptionsSpans = document.querySelectorAll(".bullets-options span");

// local storge //
if (maincolorLocalItem !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    maincolorLocalItem
  );

  document.querySelectorAll(".colors li").forEach((li) => {
    li.classList.remove("active");

    if (li.dataset.color === maincolorLocalItem) {
      li.classList.add("active");
    }
  });
}

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOptions = true;
  } else {
    backgroundOptions = false;
  }

  document.querySelectorAll(".random-background span").forEach((span) => {
    span.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

if (bulletLocalItem !== null) {
  bulletsOptionsSpans.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    navBullets.style.display = "block";
    document.querySelector(".bullets-options .yes").classList.add("active");
  } else {
    navBullets.style.display = "none";
    document.querySelector(".bullets-options .no").classList.add("active");
  }
}

// Handle Scroll //
let h1 = document.querySelector(".introduction-text h1");
let p = document.querySelector(".introduction-text p");
window.addEventListener("load", () => {
  h1.classList.add("animate");
  p.classList.add("animate");
});

let skills = document.querySelector(".skills");
let spans = document.querySelectorAll(".skills-box .skill-progress span");
window.addEventListener("scroll", () => {
  let offsetTop = skills.offsetTop;
  let offsetHeight = skills.offsetHeight;
  let windowHeight = window.innerHeight;
  let scroll = window.scrollY;

  if (scroll > offsetTop + offsetHeight - windowHeight - 300) {
    spans.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
});

let gallerySection = document.querySelector(".gallery");
let imgs = document.querySelectorAll(".images-box img");
window.addEventListener("scroll", () => {
  let offsetTop = skills.offsetTop;
  let offsetHeight = skills.offsetHeight;
  let windowHeight = window.innerHeight;
  let scroll = window.scrollY;

  if (scroll > offsetTop + offsetHeight - windowHeight - 300) {
    imgs.forEach((imgs, index) => {
      setTimeout(() => {
        imgs.classList.add("animate");
      }, index * 500);
    });
  }
});

let timeLineSection = document.querySelector(".timeline");
let leftElements = document.querySelectorAll(".left");
let rightElements = document.querySelectorAll(".right");
window.addEventListener("scroll", () => {
  let offsetTop = gallerySection.offsetTop;
  let offsetHeight = gallerySection.offsetHeight;
  let windowHeight = window.innerHeight;
  let scroll = window.scrollY;

  if (scroll > offsetTop + offsetHeight - windowHeight + 300) {
    leftElements.forEach((left, index) => {
      setTimeout(() => {
        left.classList.add("animate");
      }, index * 1000);
    });

    rightElements.forEach((right, index) => {
      setTimeout(() => {
        right.classList.add("animate");
      }, index * 1000);
    });
  }
});

let featuresSection = document.querySelector(".features");
let featBox = document.querySelectorAll(".feat-box");
window.addEventListener("scroll", () => {
  let offsetTop = timeLineSection.offsetTop;
  let offsetHeight = timeLineSection.offsetHeight;
  let windowHeight = window.innerHeight;
  let scroll = window.scrollY;

  if (scroll > offsetTop + offsetHeight - windowHeight - 300) {
    featBox.forEach((left, index) => {
      setTimeout(() => {
        left.classList.add("animate");
      }, index * 500);
    });
  }
});

let toTop = document.querySelector(".toTop");
window.addEventListener("scroll", () => {
  let offsetTop = gallerySection.offsetTop;
  let offsetHeight = gallerySection.offsetHeight;
  let windowHeight = window.innerHeight;
  let scroll = window.scrollY;

  if (scroll > offsetTop + offsetHeight - windowHeight - 300) {
    toTop.classList.add("show");
  } else {
    toTop.classList.remove("show");
  }
});
toTop.addEventListener("click", () => {
  document.querySelector(".landing").scrollIntoView({
    behavior: "smooth",
  });
});

// image popup  //
let images = document.querySelectorAll(".gallery img");
images.forEach((img) => {
  img.addEventListener("click", (e) => {
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup-overlay";
    document.body.appendChild(popupOverlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    let popupH3 = document.createElement("h3");
    let popupH3Text = document.createTextNode(img.alt);
    popupH3.appendChild(popupH3Text);
    popupBox.appendChild(popupH3);

    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);

    let closeSpan = document.createElement("span");
    closeSpan.className = "close-span";
    let closeSpanText = document.createTextNode("X");
    closeSpan.appendChild(closeSpanText);
    popupBox.appendChild(closeSpan);

    document.body.appendChild(popupBox);

    document.body.style.overflow = "hidden";

    closeSpan.addEventListener("click", () => {
      closeSpan.parentElement.remove();
      popupOverlay.remove();
      document.body.style.overflow = "auto";
    });
  });
});

// scrolling by Bullets  //
let Bullets = document.querySelectorAll(".nav-bullets .bullets");
let Links = document.querySelectorAll(".links a");
function scrolling(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrolling(Bullets);
scrolling(Links);

// sitting box
document.querySelector(".toggle i").onclick = (e) => {
  e.target.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

// color options
document.querySelectorAll(".colors li").forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    handleEvent(e);

    localStorage.setItem("color-option", e.target.dataset.color);
  });
});

// background options
let landing = document.querySelector(".landing");
let imgArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
function randomizeImages() {
  if (backgroundOptions) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgArray.length);
      landing.style.backgroundImage = `url("./imgs/${imgArray[randomNumber]}")`;
    }, 8000);
  }
}
randomizeImages();

document.querySelectorAll(".random-background span").forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.background === "yes") {
      backgroundOptions = true;
      randomizeImages();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOptions = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }

    handleEvent(e);
  });
});

function handleEvent(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  e.target.classList.add("active");
}

// Bullets options
bulletsOptionsSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    bulletsOptionsSpans.forEach((span) => {
      span.classList.remove("active");
    });

    e.target.classList.add("active");

    if (e.target.dataset.bullet === "yes") {
      navBullets.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      navBullets.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
  });
});

// toggle menu //
let togglemenu = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

togglemenu.addEventListener("click", (e) => {
  e.stopPropagation();

  togglemenu.classList.toggle("menu-active");
  tlinks.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!togglemenu.contains(e.target) && !tlinks.contains(e.target)) {
    togglemenu.classList.remove("menu-active");
    tlinks.classList.remove("open");
  }
});

tlinks.addEventListener("click", (e) => {
  e.stopPropagation();
});
