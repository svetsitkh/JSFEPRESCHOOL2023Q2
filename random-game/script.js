const canvas = document.getElementById('canvas');
console.log(canvas);
const ctx = canvas.getContext('2d');
console.log('ctx: ', ctx);

const background = new Image();
background.src = './assets/img/background.png';

function drawGame() {
    console.log('background', background);
	ctx.drawImage(background, 0, 0);
}

document.addEventListener('DOMContentLoaded', drawGame);
