// Unsplash API
const count = 30;
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded= 0;
let totalImages =0;

let photosArray = [];
// Normally, don't store API Keys like this, but an exception made here because it is free, and the data is publicly available!
const apiKey='nrOru4u7DfaHy3YYRNWbgamEUXVgKC7CUxCUNJ_xPTY';
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imgLoaded(){
    
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}
// Helper Function to set attributes on DOM element
function setAttributes(element,attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// Create elements for links & photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        //  Create <a>(anchor element) to link to UNsplash 
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        });
        // create <img> for photo
        const img =document.createElement('img');
        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event listeners, check when each is finished loading
        img.addEventListener('load',imgLoaded);
        // PUt <img> inside <a>, then both inside of image_container
        item.appendChild(img);
        imageContainer.appendChild(item); 
    });
}


// Get Photos
async function getPhotos(){
    try{
        const response= await fetch(apiUrl);
        photosArray  = await response.json();
        displayPhotos();
    }catch(error){

    }
}

// check to see if scrolling newar bottom, loads more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready = false;
        getPhotos();
    }
})
// on load 
getPhotos();

