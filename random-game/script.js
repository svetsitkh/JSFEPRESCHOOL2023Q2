const btnNewGame = document.getElementById('new_game');
const btnNewPlayerName = document.getElementById('btn_new_name');
const newPlayerСontainer = document.querySelector('.new_player_container');
const playerNameInput = document.querySelector('.player_name_input');
const btnCloseNewPlayer = document.querySelector('.close_new_player_cnt');
const scoreText = document.querySelector('.score');
const playerNameText = document.querySelector('.player_name');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let step = 28;
let score = 0;
let playerName = 'Player 1';
let isPaused = false;
let isEnteringPlayerName = false;
let game;

const background = new Image();
background.src = './assets/img/background.jpg';
background.onload = drawBackground;

const foodImage = new Image();
foodImage.src = './assets/img/strawberry.png';

const snakeHeadImage = new Image();
snakeHeadImage.src = './assets/img/snake_head.png';

const snakeBodyImage = new Image();
snakeBodyImage.src = './assets/img/snake_body.png';

const pausedImage = new Image();
pausedImage.src = './assets/img/paused.png';

const gameOverImage = new Image();
gameOverImage.src = './assets/img/game_over.png';

let snakeCoordinates = [];

function newSnake() {
    let snakeArr = [];
    snakeArr[0] = {
        x: 9 * step,
        y: 9 * step
    };

    snakeArr[1] = {
        x: 9 * step,
        y: 10 * step
    };

    return snakeArr;
}

function drawBackground() {
    ctx.drawImage(background, 0, 0);
}

function getFoodCoordinates() {
    return {
        x: Math.floor((Math.random() * 20)) * step,
		y: Math.floor((Math.random() * 20)) * step
    }
}

let foodCoordinates = getFoodCoordinates();

let route = 'up';
let routeDegrees = 0;

function setRoute(ev) {
    if (ev.keyCode == 32 && !isEnteringPlayerName) {
        ev.preventDefault();
        isPaused = !isPaused;
    }

    if (!isPaused && !isEnteringPlayerName) {
        if (ev.keyCode == 38 && route != 'down') {
            ev.preventDefault();
            route = 'up';
            routeDegrees = 0;
        } else if (ev.keyCode == 39 && route != 'left') {
            route = 'right';
            routeDegrees = 90;
        } else if (ev.keyCode == 40 && route != 'up') {
            ev.preventDefault();
            route = 'down';
            routeDegrees = 180;
        } else if (ev.keyCode == 37 && route !== 'right') {
            route = 'left';
            routeDegrees = -90;
        }
    }
}

document.addEventListener('keydown', setRoute);

function newGame() {
    console.log('new game');
    if (game) {
        console.log(game);
        clearInterval(game);
        isPaused = false;
        score = 0;
        route = 'up';
        routeDegrees = 0;
        foodCoordinates = getFoodCoordinates();
    }

    snakeCoordinates = newSnake();

    game = setInterval(drawSnakeGame, 200);
}

function drawSnakeGame() {

    if (isEnteringPlayerName) {
        return;
    }

    if (isPaused) {
        ctx.drawImage(pausedImage, 45, 220);
        return;
    }

    ctx.drawImage(background, 0, 0);
    ctx.drawImage(foodImage, foodCoordinates.x, foodCoordinates.y);

    for(let i = 0; i < snakeCoordinates.length; i++) {
        if (i == 0) {
            drawRotated(ctx, snakeHeadImage, snakeCoordinates[i].x, snakeCoordinates[i].y, routeDegrees);
        } else {
            drawRotated(ctx, snakeBodyImage, snakeCoordinates[i].x, snakeCoordinates[i].y, routeDegrees);
        }
	}

    let snakeX = snakeCoordinates[0].x;
	let snakeY = snakeCoordinates[0].y;

    if (snakeX == foodCoordinates.x && snakeY == foodCoordinates.y) {
		score++;
		foodCoordinates = getFoodCoordinates();
	} else {
        snakeCoordinates.pop();
    }

    scoreText.innerHTML = score.toString();

    switch (route) {
        case 'left':
            snakeX -= step;
            break;
        case 'right':
            snakeX += step;
            break;
        case 'up':
            snakeY -= step;
            break;
        case 'down':
            snakeY += step;
            break;
    }

    if(snakeX < 0 || snakeX > step * 19 || snakeY < 0 || snakeY > step * 19) {
		endGame();
        return;
    }

	let newSnakeHead = {
		x: snakeX,
		y: snakeY
	};

    snakeEatTail(newSnakeHead, snakeCoordinates);

	snakeCoordinates.unshift(newSnakeHead);
}

function drawRotated(context, image, x, y, degrees) {
    context.save();
    context.translate(x + image.width / 2, y + image.height / 2);
    context.rotate(degrees * Math.PI / 180);
    context.drawImage(image, - image.width / 2, - image.height / 2);
    context.restore();
}

function snakeEatTail(snakeHead, arrSnake) {
    for (let i = 0; i < arrSnake.length; i++) {
        if (snakeHead.x == arrSnake[i].x && snakeHead.y == arrSnake[i].y) {
            endGame();
        }
    }
}

function endGame() {
    clearInterval(game);
    ctx.drawImage(gameOverImage, 100, 100);
}

btnNewGame.addEventListener('click', (e) => {
    isEnteringPlayerName = true;
    playerNameInput.value = playerName;
    newPlayerСontainer.classList.remove('display_none');
})

btnCloseNewPlayer.addEventListener('click', (e) => {
    newPlayerСontainer.classList.add('display_none');
    isEnteringPlayerName = false;
})

btnNewPlayerName.addEventListener('click', (e) => {
    newPlayerСontainer.classList.add('display_none');
    isEnteringPlayerName = false;
    playerName = playerNameInput.value;
    playerNameText.innerHTML = playerName;
    newGame();
})
// let game = setInterval(drawSnakeGame, 200);
