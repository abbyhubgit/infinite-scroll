const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];
let readyToLoad = true; 

// unsplash api 
const count = 5;
const apiKey = 'tpth-t4SXCa9t903I-JhFzesiMRBhPSkgnKKMx8GWGU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
    console.log('image loaded');
}

function setAttributes(element, attributes){
    // use for/in loop to loop through properties of attributes object 
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// display photos
function displayPhotos() {
    photosArray.forEach((photo) => {
        // create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        //  item.setAttribute('target','_blank');
        setAttributes(item, {
            href:photo.links.html, 
            target:'_blank'
        })
        // create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src:photo.urls.regular, 
            alt:photo.alt_description, 
            title:photo.alt_description
        })
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a>, put <a> inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// get photos from unsplash api
async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray);
        displayPhotos();
        readyToLoad = true; 
    }catch(error){

    }
}

// if scroll near bottom of page, load more pix 
// window - document - body
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 && readyToLoad === true){
        getPhotos();
        readyToLoad = false; 
    }
})
getPhotos();