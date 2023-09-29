let url = 'https://api.unsplash.com/search/photos?query=waterfall&per_page=30&orientation=landscape&client_id=ys_OSYX6mtTO91uGO1x_cMkDNKeJb0Z8OdYs_PI07_g';
const searchBtn = document.querySelector('.search_btn');
const gridContainer = document.querySelector('.grid_container');

async function fetchImages () {
    try {
        const response = await fetch(url);
        const data = await response.json();
        data.results.forEach(el => {
            const imgSrc = el.urls.regular;
            console.log(imgSrc);
            const img = document.createElement('img');
            img.classList.add('image');
            img.src = imgSrc;
            img.alt = 'Picture';
            gridContainer.append(img);
        });
    } catch (error) {
        console.log(error);
    }
}

fetchImages();

searchBtn.addEventListener('click', fetchImages);