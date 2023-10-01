const urlDefault = 'https://api.unsplash.com/search/photos?query=waterfall&per_page=30&orientation=landscape&client_id=ys_OSYX6mtTO91uGO1x_cMkDNKeJb0Z8OdYs_PI07_g';
const searchBtn = document.querySelector('.search_btn');
const searchInput = document.querySelector('.search_input');
const gridContainer = document.querySelector('.grid_container');
const form = document.querySelector('form');

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

function displayImages(arrayImg) {
    arrayOfImages = arrayImg.map(el => {
        const imgSrc = el.urls.regular;
        const img = document.createElement('img');
        img.classList.add('image');
        img.src = imgSrc;
        img.alt = 'Picture';
        gridContainer.append(img);

        return {
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

document.addEventListener("DOMContentLoaded", fetchDisplayImages);

searchBtn.addEventListener('click', onClickSearchBtn);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    onClickSearchBtn();
})