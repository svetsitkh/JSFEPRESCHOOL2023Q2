console.log(
	'Общая оценка 50 баллов \n Вёрстка соответствует макету. Ширина экрана 768px +26 \n Ни на одном из разрешений до 640px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +12 \n На ширине экрана 768рх реализовано адаптивное меню +12'
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
