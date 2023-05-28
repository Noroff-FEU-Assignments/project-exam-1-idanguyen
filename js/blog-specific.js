/* References used:
Modals: 
https://www.w3schools.com/howto/howto_css_modal_images.asp
https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_modal_close
to learn how to close the modal by pressing anywhere. The window event was key here when modal was open.

GetParameter was used in a previous project by me for YR.no API
 */

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
           <img id="myImg" src="${resultsMedia.guid.rendered}" alt="${resultsMedia.alt_text}">
           <div id="myModal" class="modal">
           <span class="close">&times;</span>
           <img class="modal-content" id="img01">
           </div>
         </div>
         <div>
           <h1 class="details-header-desktop">${results.title.rendered}</h1>
            <p>${results.content.rendered}</p>
            <img src="images/logo.png" alt="" class="logo logo-details" />
         </div>
        </div>
    `;

    detailsContainer.innerHTML = details;

    var modal = document.getElementById("myModal");

    var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    img.onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt;
    };

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  } catch (error) {
    alert(error);
  }
}

displayDetails();
