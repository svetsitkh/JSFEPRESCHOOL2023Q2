console.log(
	'Library#3 \n Общая оценка 25 баллов: \n Ограниченная карусель в блоке About +25'
);

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
    if (carouselCounter < paginationItems.length - 1) {
        carouselCounter++;
        moveCarousel();
     }
})