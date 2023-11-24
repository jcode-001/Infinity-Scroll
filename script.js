const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// Unsplah API
const count = 10;
const apiKey = "IXzGoNHxCNWKzE6VHiUDo7td60QQuKjw4yNPDgb_c70";
const apiURl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//  Helper Function to SEt Atrributes on DOM Elments
function setAttributes(element, atrributes) {
  for (const key in atrributes) {
    element.setAttribute(key, atrributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to lik to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> Photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Put <img> inside <a>, then put both inside imageContainer ELement
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from UNsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiURl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch error here
    console.log("Error");
  }
}

// On Load
getPhotos();
