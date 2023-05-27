const uri = "https://www.idanhu.com/wp-json/wp/v2/posts?per_page=12";

let postContainer = document.querySelector(".postContainer");

async function getPosts(uri) {
  try {
    const response = await fetch(uri);
    const results = await response.json();
    let blogs = ``;

    postContainer.innerHTML = "";

    for (let i = 0; i < results.length; i++) {
      blogs += `
        <div class="blog">
         <div>
         <a href="blog-specific.html?id=${results[i].id}"><img src="${results[i].jetpack_featured_media_url}"></a>
         </div>
         <div>
          <a href="blog-specific.html?id=${results[i].id}" class="cta">READ MORE</a>
          <h2>${results[i].title.rendered}</h2>
          <p>${results[i].excerpt.rendered}</p>
         </div>
        </div>
        `;
    }
    postContainer.innerHTML = blogs;
  } catch (error) {
    alert(error);
  }
}

getPosts(uri);
