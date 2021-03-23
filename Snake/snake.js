let WIDTH = 960;
let HEIGHT = 600;
const SNAKE_SIZE = 30;
const START_POSX = WIDTH / 2;
const START_POSY = HEIGHT /2;
const STEP = 30;
let SPEED = 5;

const SPACE = 32;

/*
    TODO:
[O]    - Food might be random at the snake's position, need fix 
[O]    - Implement scenario snake dies (hit its own body)
[O]      \--> restart button
[O]    - When page loads, press space to start the game
    - Add score board ???
*/

let head, tail;
let snake = [];
let food;
let score = 0;

class Food {
    constructor(posX, posY){
        this.posX = posX;
        this.posY = posY;
    }

    draw(){
        let c = color('red');
        fill(c);
        noStroke();
        square(this.posX, this.posY, SNAKE_SIZE);
    }

    eaten(){
        let flag = false;
        do{
            this.posX = random(0, WIDTH - 30);
            this.posY = random(0, HEIGHT - 30);
            flag = isSpaceAvailable(this);
        } while (flag == false)
    }
}

class Snake {
    constructor(posX, posY){
        this.posX = posX;
        this.posY = posY;
        this.direction = "down";
    }

    draw(x, y){
        this.posX += x;
        this.posY += y;
        let c = color('white');
        fill(c);
        noStroke();
        square(this.posX, this.posY, SNAKE_SIZE);

        // check border
        if(this.posX >= WIDTH){
            this.posX = 0;
        }
        if (this.posX < 0){
            this.posX = WIDTH;
        }
        if(this.posY >= HEIGHT){
            this.posY = 0;
        }
        if(this.posY < 0){
            this.posY = HEIGHT;
        }
    }

    move_up(){
        this.direction = "up";
    }
    move_down(){
        this.direction = "down";
    }
    move_left(){
        this.direction = "left";
    }
    move_right(){
        this.direction = "right";
    }
    move(){
        switch(this.direction){
            case "up":
                this.draw(0, -STEP);
                break;
            case "down":
                this.draw(0, STEP);
                break;
            case "left":
                this.draw(-STEP, 0);
                break;
            case "right":
                this.draw(STEP, 0);
                break;
        }
    }
}


function setup() {
    createCanvas(WIDTH, HEIGHT);
    frameRate(SPEED);
    head = new Snake(START_POSX, START_POSY);
    tail = head;
    food = new Food(random(0, WIDTH - 30), random(30, HEIGHT - 30));
    append(snake, head);
    noLoop();
}

function draw() {
    background(0);
    moveSnake();
    textAlign(CENTER);
    textSize(20);
    text('SCORE: ' + score, 100, 20);
    food.draw();    
    isEaten();      // is food eaten by the snake?
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    head.move_left();
  } else if (keyCode === RIGHT_ARROW) {
    head.move_right();
  }
  else if (keyCode === UP_ARROW) {
    head.move_up();
  }
  else if (keyCode === DOWN_ARROW) {
    head.move_down();
  } else if (keyCode === SPACE) {
      // toogle space key to pause/play
        if(isLooping()){
            noLoop();
        } else {
            loop();
        }
  }
}

function updateSnakeDirection() {
    let currentDirection = head.direction;
    for(let i = 1; i < snake.length; i++) {
        let tmp = snake[i].direction;
        snake[i].direction = currentDirection
        currentDirection = tmp;
    }
}

function moveSnake(){
    snake.forEach(s => {
        s.move();
        if (s != head && isCollided(head, s)){
            textAlign(CENTER);
            text('YOU HAVE DIED!\n PRESS SPACE TO RESTART', 500, 500);
            restart();
        }
    })
    updateSnakeDirection();
}

function restart(){
    noLoop();
    snake = [];
    head = new Snake(START_POSX, START_POSY);
    tail = head;
    food = new Food(random(0, WIDTH - 30), random(30, HEIGHT - 30));
    append(snake, head);
    score = 0;
}

function isEaten(){
    if(isCollided(head, food)){
        // eaten
        food.eaten();
        score += 100;
        if(score % 1000 == 0){
            SPEED+=2;
        }
        // Snake grows: add snake tail
        let newBody;
        switch (tail.direction){
            case "up":
                newBody = new Snake(tail.posX, tail.posY + 30);
                break;
            case "down":
                newBody = new Snake(tail.posX, tail.posY - 30);
                break;
            case "left":
                newBody = new Snake(tail.posX + 30, tail.posY);
                break;
            case "right":
                newBody = new Snake(tail.posX - 30, tail.posY);
                break;
        }

        newBody.direction = tail.direction;
        tail = newBody;
        append(snake, newBody);
    }
}

function isCollided (obj1, obj2) {
    if((obj1.posX + 30 > obj2.posX) && (obj1.posX < obj2.posX + 30)){
        if( (obj1.posY + 30 > obj2.posY) && (obj1.posY < obj2.posY + 30)){
            return true;
        }
    }
    return false;
}

function isSpaceAvailable(food){
    snake.forEach(s => {
        if (isCollided(s, food)) {
            return false;
        }
    })
    return true;
}