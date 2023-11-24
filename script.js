const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplah API
const count = 30;
const apiKey = "IXzGoNHxCNWKzE6VHiUDo7td60QQuKjw4yNPDgb_c70";
const apiURl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  console.log("image loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    console.log("ready =", ready);
  }
}

//  Helper Function to Set Atrributes on DOM Elments
function setAttributes(element, atrributes) {
  for (const key in atrributes) {
    element.setAttribute(key, atrributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  totalImages = photosArray.length;
  console.log("total images", totalImages);
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
    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
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
    console.log("Error", error);
  }
}

//  Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000 && ready
  ) {
      ready= false;
    getPhotos();
  }
});

// On Load
getPhotos();
