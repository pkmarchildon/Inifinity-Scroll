let imageCount = 5;
const apiKey = 'EtVt3SaHwk0tSJlllLfpEP17s9d89S1fNXY8CVqm9Rw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}&collections=11649432`;
let photosArray = [];
let readyToDisplayImages = false;
let initialLoad = true;
let imagesLoaded = 0;
let totalImagesLoaded = 0;
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Check if all images are loaded
function imageLoaded() {
   imagesLoaded++;
   if (imagesLoaded === totalImagesLoaded) {
      // We loaded all the images and ready to display
      readyToDisplayImages = true;
      loader.hidden = true;
      imageCount = 30;
      apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${imageCount}&collections=11649432`;
   }
}

// Get photos from Unsplash API
async function getPhotos() {
   try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
   } catch (err) {
      console.error(err);
   }
}

function setAttributes(element, attributes) {
   for (attribute in attributes) {
      element.setAttribute(attribute, attributes[attribute]);
   }
}

function displayPhotos() {
   imagesLoaded = 0;
   totalImagesLoaded = photosArray.length;
   photosArray.forEach((photo) => {
      //Create <a> to link to unplash
      const anker = document.createElement('a');
      //Create <img> for picture
      setAttributes(anker, {
         href: photo.links.html,
         target: '_blank'
      });
      const imageElement = document.createElement('img');
      // Set img in anker and anker in imageContainer
      setAttributes(imageElement, {
         src: photo.urls.regular,
         alt: photo.alt_description,
         title: photo.alt_description
      });
      imageElement.addEventListener('load', imageLoaded);
      anker.appendChild(imageElement);
      imageContainer.appendChild(anker);
   });
}

// Check if scrolling is near the end of the page
window.addEventListener('scroll', () => {
   if (
      window.innerHeight + window.scrollY >=
         document.body.offsetHeight - 1000 &&
      readyToDisplayImages
   ) {
      readyToDisplayImages = false;
      getPhotos();
   }
});

// On load
getPhotos();
