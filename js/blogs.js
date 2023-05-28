/** The loader class was taken from:
 * https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_loader
 * */

const maxLength = 12;
const uri = "https://www.idanhu.com/wp-json/wp/v2/posts?per_page=" + maxLength;
const catUri = "https://www.idanhu.com/wp-json/wp/v2/categories";

let postContainer = document.querySelector(".postContainer");
let categoryContainer = document.querySelector(".categoryContainer");
let blogs = [];
let categories = [];
let displayAmount = 10;

async function getCategories(uri) {
  try {
    const response = await fetch(uri);
    const results = await response.json();

    for (let i = 0; i < results.length; i++) {
      categories.push([results[i].name, results[i].id]);
    }
  } catch (error) {
    console.log(error);
  }
}

function createCategoryBtns() {
  let buttons = ``;
  for (let i = 0; i < categories.length; i++) {
    buttons += `
    <button id=${categories[i][0]} onclick="updateBlogs(${categories[i][1]})">${categories[i][0]}</button>
    `;
  }
  buttons += `<button id=allPostsBtn onclick="updateBlogs(999)">All Posts</button>`;
  categoryContainer.innerHTML = buttons;
}

async function getPosts(uri) {
  try {
    const response = await fetch(uri);
    const results = await response.json();
    displayAmount = 10;
    blogs = [];

    let loading = `<div class="loader"></div>`;

    postContainer.innerHTML = loading;

    for (let i = 0; i < results.length; i++) {
      let uriMedia =
        "https://www.idanhu.com/wp-json/wp/v2/media/" +
        results[i].featured_media;
      const responseMedia = await fetch(uriMedia);
      const resultsMedia = await responseMedia.json();

      blogs.push(`
        <div class="blog">
         <div>
         <a href="blog-specific.html?id=${results[i].id}"><img src="${resultsMedia.guid.rendered}" alt="${resultsMedia.alt_text}"></a>
         </div>
         <div>
          <a href="blog-specific.html?id=${results[i].id}" class="cta">READ MORE</a>
          <h2>${results[i].title.rendered}</h2>
          <p>${results[i].excerpt.rendered}</p>
         </div>
        </div>
        `);
    }
    if (results.length > displayAmount) {
      displayAmount = 10;
    } else {
      displayAmount = results.length;
    }
    postContainer.innerHTML = ``;
    for (let i = 0; i < displayAmount; i++) {
      postContainer.innerHTML += blogs[i];
    }
    let button = ``;
    if (results.length > displayAmount) {
      button = `<button class="cta blog-more" id="read-more" onclick="increaseSize()">VIEW MORE </button>`;
    }
    postContainer.innerHTML += button;
  } catch (error) {
    alert(error);
  }
}

function increaseSize() {
  document.getElementById("read-more").style.display = "none";
  for (let i = displayAmount; i < maxLength; i++) {
    postContainer.innerHTML += blogs[i];
  }
}

function updateBlogs(id) {
  if (id == 999) {
    getPosts(uri);
  } else {
    let newUri = uri + "&categories=" + id;
    getPosts(newUri);
  }
}

getCategories(catUri).then(createCategoryBtns);

getPosts(uri);
