const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let step = 28;
let score = 0;

const background = new Image();
background.src = './assets/img/background.jpg';
// background.onload = drawBackground;

const foodImage = new Image();
foodImage.src = './assets/img/strawberry.png';

const snakeHeadImage = new Image();
snakeHeadImage.src = './assets/img/snake_head.png';

const snakeBodyImage = new Image();
snakeBodyImage.src = './assets/img/snake_body.png';

let snakeCoordinates = [];
snakeCoordinates[0] = {
	x: 9 * step,
	y: 9 * step
};

snakeCoordinates[1] = {
	x: 9 * step,
	y: 10 * step
};

// ********
snakeCoordinates[2] = {
	x: 9 * step,
	y: 11 * step
};
// ******

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
   if (ev.keyCode == 38 && route != 'down') {
        route = 'up';
        routeDegrees = 0;
    } else if (ev.keyCode == 39 && route != 'left') {
        route = 'right';
        routeDegrees = 90;
    } else if (ev.keyCode == 40 && route != 'up') {
        route = 'down';
        routeDegrees = 180;
    } else if (ev.keyCode == 37 && route !== 'right') {
        route = 'left';
        routeDegrees = -90;
    }
}

document.addEventListener('keydown', setRoute);

function drawGame() {

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

    snakeCoordinates.pop();

	if(snakeX < 0 || snakeX > step * 19 || snakeY < 0 || snakeY > step * 19)
		clearInterval(game);

	if (route == 'left') {
        snakeX -= step;
    }

	if (route == 'right') {
        snakeX += step;
    }

	if (route == 'up') {
        snakeY -= step;
    }

	if (route == 'down') {
        snakeY += step;
    }

	let newSnakeHead = {
		x: snakeX,
		y: snakeY
	};

	snakeCoordinates.unshift(newSnakeHead);
}

function drawRotated(context, image, x, y, degrees) {
    context.save();
    context.translate(x + image.width/2, y + image.height/2);
    context.rotate(degrees*Math.PI/180);
    context.drawImage(image, - image.width/2, - image.height/2);
    context.restore();
}

function drawSnakePart(context, snakePart, x, y) {

    if (snakePart === 'body') {
        if (route == 'up' || route == 'down') {
            context.drawImage(snakeBodyVerticalImage, x, y);
        } else {
            context.drawImage(snakeBodyHorizontalImage, x, y);
        }
    } else if (snakePart === 'tip_tail') {
        switch (route) {
            case 'up':
                context.drawImage(snakeTipTailUpImage, x, y);
                break;
            case 'right':
                context.drawImage(snakeTipTailRightImage, x, y);
                break;
            case 'down':
                context.drawImage(snakeTipTailDownImage, x, y);
                break;
            case 'left':
                context.drawImage(snakeTipTailLeftImage, x, y);
                break;
            default:
                break;
        }
    }

}

let game = setInterval(drawGame, 200);
