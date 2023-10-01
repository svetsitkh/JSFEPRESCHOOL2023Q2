const urlDefault = 'https://api.unsplash.com/search/photos?query=waterfall&per_page=30&orientation=landscape&client_id=ys_OSYX6mtTO91uGO1x_cMkDNKeJb0Z8OdYs_PI07_g';
const body = document.querySelector('body');
const searchBtn = document.querySelector('.search_btn');
const searchInput = document.querySelector('.search_input');
const gridContainer = document.querySelector('.grid_container');
const form = document.querySelector('form');
const containerFullImage = document.querySelector('.container_full_image');
const fullImage = document.querySelector('.full_image');

let arrayOfImages = [];

async function fetchImages (url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log(error);
        return [];
    }
}

function onClickImage (elImg) {
    fullImage.src = '';
    containerFullImage?.classList.add('_active');
    body.classList.add('no_scroll');
    const currentImage = arrayOfImages.find(el => el.id === elImg.id);
    if (currentImage !== undefined) {
        fullImage.src = currentImage.full;
    }
}

function displayImages(arrayImg) {
    arrayOfImages = arrayImg.map(el => {
        const imgSrc = el.urls.regular;
        const img = document.createElement('img');
        img.classList.add('image');
        img.src = imgSrc;
        img.alt = 'Picture';
        img.id = el.id;
        gridContainer.append(img);

        img.addEventListener('click', () => {onClickImage(img)});

        return {
            id: el.id,
            full: el.urls.full,
            regular: el.urls.regular
        }
    });
}

async function fetchDisplayImages () {
    let actualUrl = '';
    const requestText = searchInput.value;
    console.log(requestText);
    if (requestText.trim() == '') {
        actualUrl = urlDefault;
    } else {
        actualUrl = `https://api.unsplash.com/search/photos?query=${requestText}&per_page=30&orientation=landscape&client_id=ys_OSYX6mtTO91uGO1x_cMkDNKeJb0Z8OdYs_PI07_g`;
    }

    const fetchedImages = await fetchImages(actualUrl);
    displayImages(fetchedImages);

    console.log(arrayOfImages);
}

function removeImages() {
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

function onClickSearchBtn () {
    removeImages();
    fetchDisplayImages();
}

function closeContainerFullImage () {
    containerFullImage?.classList.remove('_active');
    body.classList.remove('no_scroll');
}

document.addEventListener("DOMContentLoaded", fetchDisplayImages);

searchBtn.addEventListener('click', onClickSearchBtn);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    onClickSearchBtn();
})

containerFullImage.addEventListener('click', closeContainerFullImage);
document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
        closeContainerFullImage();
    }
})