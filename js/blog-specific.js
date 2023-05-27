let detailsContainer = document.querySelector(".detailsContainer");

function getParameter(paramenter) {
  let parameters = new URLSearchParams(window.location.search);
  return parameters.get(paramenter);
}

async function displayDetails() {
  let id = getParameter("id");
  try {
    const response = await fetch(
      "https://www.idanhu.com/wp-json/wp/v2/posts/" + id
    );
    const results = await response.json();

    let uriMedia =
      "https://www.idanhu.com/wp-json/wp/v2/media/" + results.featured_media;
    const responseMedia = await fetch(uriMedia);
    const resultsMedia = await responseMedia.json();
    let details = `
        <div class="details">
         <div>
           <h1 class="details-header-mobil">${results.title.rendered}</h1>
           <img src="${resultsMedia.guid.rendered}" alt="${resultsMedia.alt_text}">
         </div>
         <div>
           <h1 class="details-header-desktop">${results.title.rendered}</h1>
            <p>${results.content.rendered}</p>
            <img src="images/logo.png" alt="" class="logo logo-details" />
         </div>
        </div>
    `;

    detailsContainer.innerHTML = details;
  } catch (error) {
    alert(error);
  }
}

displayDetails();
