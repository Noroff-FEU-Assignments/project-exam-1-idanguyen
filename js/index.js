const uriPosts = "https://www.idanhu.com/wp-json/wp/v2/posts?per_page=20";
let length = 0;

let blogContainer = document.querySelector(".blogContainer");

function decreaseLength() {
  length = length - 4;
  getPosts(uriPosts, length);
}

function increaseLength() {
  length = length + 4;
  getPosts(uriPosts, length);
}

async function getPosts(uriPosts, length) {
  try {
    const responsePosts = await fetch(uriPosts);
    const resultsPosts = await responsePosts.json();

    if (length > resultsPosts.length) {
      length = resultsPosts.length;
    }

    if (length < 0) {
      length = 0;
    }

    let carousel = ``;
    for (let i = length; i < length + 4; i++) {
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
