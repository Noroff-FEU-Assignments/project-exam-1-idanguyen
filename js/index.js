/** The loader class was taken from:
 * https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_loader
 *
 * The dots were inspired from:
 * https://www.w3schools.com/howto/howto_css_circles.asp and
 * https://jsfiddle.net/Hatchet/s6tn4o43/
 *
 * Creating arrows:
 * https://icons8.com/icons/set/arrow
 */

const uriPosts = "https://www.idanhu.com/wp-json/wp/v2/posts?per_page=20";
let length = 1;

let blogContainer = document.querySelector(".blogContainer");
const backButton = document.getElementById("back");
backButton.style.display = "none";
const forwardButton = document.getElementById("forward");
const rightArrow = document.getElementById("rightArrow");
const rightArrowMobile = document.getElementById("rightArrowMobile");
const leftArrow = document.getElementById("leftArrow");
const leftArrowMobile = document.getElementById("leftArrowMobile");
leftArrow.style.display = "none";
leftArrowMobile.style.display = "none";
const dots = document.getElementsByClassName("dot");
let dotInt = document.getElementById("1");
dotInt.classList.add("active");

for (var i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", updateList);
}

function updateList(e) {
  var prev = document.querySelector(".dot.active");
  if (prev) prev.classList.remove("active");
  e.target.classList.add("active");

  length = e.target.id;
  checkButtons();
  updateDots(length);
  getPosts(uriPosts, length);
}

function updateDots(length) {
  if (length == 1) {
    document.getElementById("1").classList.add("active");
    document.getElementById("2").classList.remove("active");
    document.getElementById("3").classList.remove("active");
  }
  if (length == 2) {
    document.getElementById("2").classList.add("active");
    document.getElementById("1").classList.remove("active");
    document.getElementById("3").classList.remove("active");
  }
  if (length == 3) {
    document.getElementById("3").classList.add("active");
    document.getElementById("1").classList.remove("active");
    document.getElementById("2").classList.remove("active");
  }
}

function decreaseLength() {
  length = length - 1;
  checkButtons();
  updateDots(length);
  if (length <= 1) {
    length = 1;
  }
  getPosts(uriPosts, length);
}

function increaseLength() {
  length = length - 1;
  length = length + 2;
  checkButtons();
  updateDots(length);
  if (length >= 3) {
    length = 3;
  }
  getPosts(uriPosts, length);
}

function checkButtons() {
  forwardButton.disabled = false;
  backButton.disabled = false;
  forwardButton.style.display = "block";
  backButton.style.display = "block";
  leftArrow.style.display = "block";
  rightArrow.style.display = "block";
  leftArrowMobile.style.display = "block";
  rightArrowMobile.style.display = "block";

  if (length == 1) {
    backButton.disabled = true;
    backButton.style.display = "none";
    leftArrow.style.display = "none";
    leftArrowMobile.style.display = "none";
  }

  if (length == 3) {
    forwardButton.disabled = true;
    forwardButton.style.display = "none";
    rightArrow.style.display = "none";
    rightArrowMobile.style.display = "none";
  }
}

async function getPosts(uriPosts, length) {
  try {
    let loading = `<div class="loader"></div>`;
    blogContainer.innerHTML = loading;
    const responsePosts = await fetch(uriPosts);
    const resultsPosts = await responsePosts.json();

    let carouselLength = 4;
    let finalIndex = length * carouselLength;

    let carousel = ``;
    for (let i = finalIndex - carouselLength; i < finalIndex; i++) {
      let uriMedia =
        "https://www.idanhu.com/wp-json/wp/v2/media/" +
        resultsPosts[i].featured_media;
      const responseMedia = await fetch(uriMedia);
      const resultsMedia = await responseMedia.json();

      carousel += `
      <div class="slider">
       <div class="slide">
         <a href="blog-specific.html?id=${resultsPosts[i].id}"><img src="${resultsMedia.guid.rendered}" alt="${resultsMedia.alt_text}"></a>
         <div> <p>${resultsPosts[i].title.rendered}</p></div>
        </div>
      </div>`;
    }
    blogContainer.innerHTML = carousel;
  } catch (error) {
    alert(error);
  }
}

getPosts(uriPosts, length);
