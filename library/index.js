console.log('Library#3 \n Общая оценка 50 баллов!\n Этап 1:\n - Ограниченная карусель в блоке About +25;\n - Слайдер в блоке Favorites +25.');

// ----------

const burger = document.querySelector('.burger-menu-icon');
const nav = document.querySelector('.nav-menu');
const navItems = document.querySelectorAll('.nav-list a');
const body = document.querySelector('body');
const cover = document.querySelector('.cover-layer');

burger?.addEventListener('click', function () {
    burger?.classList.toggle('_active');
    nav?.classList.toggle('_active');
    body?.classList.toggle('no-scroll');
    cover?.classList.toggle('_active');
});

function CloseBurgerMenu() {
    burger?.classList.remove('_active');
    nav?.classList.remove('_active');
    body?.classList.remove('no-scroll');
    cover?.classList.remove('_active');
}

navItems.forEach(element => {
    element.addEventListener('click', CloseBurgerMenu);
});

cover?.addEventListener('click', CloseBurgerMenu);

/* ---------------library part3----------------- */

// --------------Slider in section About
const galleryCarousel = document.querySelector('.gallery-carousel');
const paginationItems = document.querySelectorAll('.pag-item');
const carretLeft = document.querySelector('.carret-left');
const carretRight = document.querySelector('.carret-right');

let carouselCounter = 0;

const updateCarretView = () => {
    if (carouselCounter === 0) {
        carretLeft.style.opacity = '0.3';
        carretLeft.classList.add('inactive');
     } else {
        carretLeft.style.opacity = '1';
        carretLeft.classList.remove('inactive');
     }

     if (carouselCounter >= paginationItems.length - 1) {
        carretRight.style.opacity = '0.3';
        carretRight.classList.add('inactive');
     } else {
        carretRight.style.opacity = '1';
        carretRight.classList.remove('inactive');
     }
}

updateCarretView();

const pagItemActive = () => {
    paginationItems.forEach((pagItem)=>{
        pagItem.classList.remove('active');
    })
    paginationItems[carouselCounter].classList.add('active');
  }

const moveCarousel = () => {
    galleryCarousel.style.transform = `translateX(${-carouselCounter * 475}px)`;
    pagItemActive();
    updateCarretView();
}

paginationItems.forEach((pagItem,i) => {
    pagItem.addEventListener('click', () => {
        carouselCounter = i;
        moveCarousel();
    })
})

carretLeft.addEventListener('click', () => {
    if (carouselCounter > 0) {
        carouselCounter--;
        moveCarousel();
     }
})

carretRight.addEventListener('click', () => {
    if (carouselCounter < (paginationItems.length - 1)) {
        carouselCounter++;
        moveCarousel();
     }
})

// -------------- Fade in / fade out in section Favorites
const radioBtn = document.querySelectorAll('.radio-btn');
let currentBooksWrapper = document.getElementById('winter_books');
let nextBooksWrapper = null;
let isAnimating = false;


radioBtn.forEach((el) => {
    el.addEventListener('click', () => {
        const nextBooksWrapperId = `${el.value}_books`;

        if (!nextBooksWrapper) {
            nextBooksWrapper = document.getElementById(nextBooksWrapperId);
            if (isAnimating === false) {
                fadeOut(currentBooksWrapper);
            }
        } else {
            nextBooksWrapper = document.getElementById(nextBooksWrapperId);
        }

    })
})

function fadeOut(el) {
    el.style.opacity = 1;
    (function fade() {
        if ((el.style.opacity -= 0.02) < 0) {
            el.style.display = "none";
            isAnimating = false;
            if (nextBooksWrapper) {
                currentBooksWrapper = nextBooksWrapper;
                nextBooksWrapper = null;
                fadeIn(currentBooksWrapper);
            }
        } else {
            isAnimating = true;
            requestAnimationFrame(fade);
        }
    })();
};

function fadeIn(el, display = 'flex') {
    el.style.opacity = 0;
    el.style.display = display;
    (function fade() {
        var val = parseFloat(el.style.opacity);
        if (!((val += 0.02) > 1)) {
            el.style.opacity = val;
            isAnimating = true;
            requestAnimationFrame(fade);
        } else {
            isAnimating = false;
            if (nextBooksWrapper) {
                if (nextBooksWrapper !== el) {
                    fadeOut(currentBooksWrapper);
                } else {
                    nextBooksWrapper = null;
                }
            }
        }
    })();
};