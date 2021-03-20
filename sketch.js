// reference code: Coding Challenge #46 (thecodingtrain.com)

var ship;
var asteroids = [];
var lasers = [];

let stageNum = 0;
let score = 0;
let earth;

function preload() {
  font1 = loadFont('sources/digital.TTF');
  font2 = loadFont('sources/lightR.TTF');
  font3 = loadFont('sources/lightB.TTF');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
  earth = new Earth();
}

function draw() {

  background(0);

  textFont(font2); // copyright
  fill(100);
  textSize(12);
  text('@lumeiredelalune_', 15, 22);


  if (stageNum == 0) {
    stageNum = 0;
    score = 0;

    push();
    textAlign(CENTER);
    textFont(font3);
    fill(220);
    textSize(80);
    text('Asteroid\nExploration', width * 0.5, height * 0.35);
    pop();

    push();
    rectMode(CENTER);
    fill(47, 17, 94);
    if (width * 0.5 - 45 < mouseX && mouseX < width * 0.5 + 45 && height * 0.7 - 35 < mouseY && mouseY < height * 0.7 + 15) {
      if (mouseIsPressed) {
        stageNum += 1;
      } else {
        strokeWeight(3);
        stroke(203, 222, 82);
      }
    } else {
      strokeWeight(1);
      stroke(203, 222, 82);
    }
    rect(width * 0.5, height * 0.7 - 10, 90, 50);
    pop();

    push();
    textAlign(CENTER);
    textFont(font2);
    fill(203, 222, 82);
    textSize(30);
    text('Help', width * 0.5, height * 0.7)

    fill(200);
    textSize(30);
    text('press Enter key to start', width * 0.5, height * 0.85);
    pop();

  }

  if (stageNum == 1) {
    stageNum = 1;

    push();
    textAlign(CENTER);
    textFont(font2);
    fill(200);
    textSize(30);
    text('press Enter key to start', width * 0.5, height * 0.85);
    pop();

    push();
    textAlign(CENTER);

    textFont(font3);
    fill(220);
    textSize(35);
    text('Stage 1: Gather Asteroid Sample', width * 0.5, height * 0.25);

    textFont(font2);
    fill(200);
    textSize(25);
    text('UP Arrow: Spacecraft moves FORWARD', width * 0.5, height * 0.25 + 45);
    text('RIGHT Arrow: Spacecraft rotates CLOCKWISE', width * 0.5, height * 0.25 + 75);
    text('LEFT Arrow: Spacecraft rotates COUNTER-CLOCKWISE', width * 0.5, height * 0.25 + 105);
    text('SPACEBAR: Spacecraft shoots Bombs to make Artificial Crater', width * 0.5, height * 0.25 + 135);
    text('> Make Artificial Craters to Gather Asteroid Samples!', width * 0.5, height * 0.25 + 170);

    textFont(font3);
    fill(220);
    textSize(35);
    text('Stage 2: Return Capsule Back to the Earth', width * 0.5, height * 0.25 + 240);

    textFont(font2);
    fill(200);
    textSize(25);
    text('UP Arrow: Spacecraft moves FORWARD', width * 0.5, height * 0.25 + 285);
    text('RIGHT Arrow: Spacecraft rotates CLOCKWISE', width * 0.5, height * 0.25 + 315);
    text('LEFT Arrow: Spacecraft rotates COUNTER-CLOCKWISE', width * 0.5, height * 0.25 + 345);
    text('SPACEBAR: Spacecraft drops Capsules for Return', width * 0.5, height * 0.25 + 375);
    text('> Send Asteroid Samples in Capsules Back to the Earth!', width * 0.5, height * 0.25 + 410);

    pop();

  }

  if (stageNum == 2) {
    stageNum = 2;

    for (var i = 0; i < asteroids.length; i++) {
      if (ship.hits(asteroids[i])) {
        console.log('ooops!');
      }
      asteroids[i].render();
      asteroids[i].update();
      asteroids[i].edges();
    }

    for (var ll = lasers.length - 1; ll >= 0; ll--) {
      lasers[ll].render();
      lasers[ll].update();
      if (lasers[ll].offscreen()) {
        lasers.splice(ll, 1);
      } else {
        for (var al = asteroids.length - 1; al >= 0; al--) {
          if (lasers[ll].hits(asteroids[al])) {
            if (asteroids[al].r > 10) {
              var newAsteroids = asteroids[al].breakup();
              asteroids = asteroids.concat(newAsteroids);
            }
            asteroids.splice(al, 1);
            lasers.splice(ll, 1);

            score += 1;
            console.log('score')
            console.log(score)

            break;
          }
        }
      }
    }

    textFont(font1);
    fill(200);
    textSize(20);
    text('gathered sample', width * 0.8, height * 0.75);
    textSize(40);
    text(score, width * 0.8 + 40, height * 0.75 + 120)
    rect(width * 0.8, height * 0.75 + 120 - score * 10, 30, score * 10);

    console.log(lasers.length);

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();

    if (score > 10) {
      stageNum += 1;
    }

  }

  if (stageNum == 3) {
    stageNum = 3;

    earth.display();
    earth.move();

    for (var ll2 = lasers.length - 1; ll2 >= 0; ll2--) {
      lasers[ll2].render();
      lasers[ll2].update();
      if (lasers[ll2].offscreen()) {
        lasers.splice(ll2, 1);
      } else {
        if (lasers[ll2].reaches(earth)) {
          console.log("reached the Earth")
          stageNum += 1;
        }
      }
    }

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();

  }

  if (stageNum == 4) {
    stageNum = 4;

    push();
    textAlign(CENTER);
    textFont(font3);
    fill(200);
    textSize(40);
    text('for more information on Asteroids,\ncheck out "Special Features" on', width * 0.5, height * 0.35);
    fill(220);
    textSize(60);
    text('The Science and Technology\n2021 Mar. Vol.622', width * 0.5, height * 0.35 + 150);
    pop();

    push();
    rectMode(CENTER);
    fill(47, 17, 94);
    if (width * 0.5 - 85 < mouseX && mouseX < width * 0.5 + 85 && height * 0.85 - 35 < mouseY && mouseY < height * 0.85 + 15) {
      if (mouseIsPressed) {
        stageNum = 0;
      } else {
        strokeWeight(3);
        stroke(203, 222, 82);
      }
    } else {
      strokeWeight(1);
      stroke(203, 222, 82);
    }
    rect(width * 0.5, height * 0.85-10, 170, 50);
    pop();

    push();
    textAlign(CENTER);
    textFont(font2);
    fill(203, 222, 82);
    textSize(30);
    text('Play Again', width * 0.5, height * 0.85);
    pop();

  }

}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  } else if (keyCode === ENTER) {
    stageNum = 2;
  }
}
