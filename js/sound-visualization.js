//DESCRIPTION:
//     This is basically like a sound visualization machine. You can press any of the letter keys from Q-P and it will play a sound and some kind of animation that represents that sound.
//

// PSUEDO CODE:
//     - variables for all sounds and letter keys + other random stuff
//     - preload function to load in sounds
//     - if statements for each letter being true in the draw function
//       (this is what shows each of the animations)
//     - if statements for each letter key in the keyTyped function
//       (this registers what key was typed/activated)
//     - some separate functions for specific animation purposes
//     - some external classes that are linked because I already had a lot of code
//

// RESOURCES:
// https://www.youtube.com/watch?v=Iep6ZWtf4o8
// https://patatap.com/
// https://editor.p5js.org/dannewoo/sketches/yjaFzXQEQ
// https://editor.p5js.org/monniqian/sketches/TwckaaeGl
// https://happycoding.io/tutorials/p5js/creating-classes/fireworks

// SOUNDS
let organ;
let guitar;
let unlock;
let sadboy;
let whoo;
let piano;
let pulse;
let trumpet;
let slide;
let acid;

// IMAGES
let whooer;

// VARIABLES
let q = false;
let numSides = 8;

let w = false;
let ht = 200;
let corner = 52;

let e = false;
let sz = 20;
let sz2 = 0;
let sz3 = 0;

let r = false;

let t = false;
let imgY = 500;

let y = false;
let recX = 200;
let recY = 200;

let u = false;
let maxDiameter = 20; 
let theta = 0;
let theta2 = 2;

let i = false;
let bubbles = [];

let o = false;
let particles = [];
const gravity = 0.25;
const colors = ["red", "orange", "yellow", "lime", "cyan", "magenta", "white"];
let endColor;

let p = false;
let siz = {
  x: 10,
  r:1,
  g:1,
  b:1,
  xpos:400,
}

function preload(){
  organ = loadSound("../sounds/organ.wav");
  guitar = loadSound("../sounds/guitar.wav");
  unlock = loadSound("../sounds/unlock.wav");
  sadboy = loadSound("../sounds/sadboy.wav");
  whoo = loadSound("../sounds/whoo.mp3");
  piano = loadSound("../sounds/piano.wav");
  pulse = loadSound("../sounds/pulse.wav");
  trumpet = loadSound("..//trumpet.wav");
  slide = loadSound("../sounds/slide.wav");
  acid = loadSound("../sounds/acid.wav");
  
  whooer = loadImage("../images/p5js/whooer.png");
}


function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  imageMode(CENTER);

  rec = new Record(recX, recY);
  
  for(let i = 0; i < 50; i++){
    x = 200;
    y = 200;
    d = 50;
    bubbles[i] = new Bubble(x, y, d);
  }
  
  endColor = color(64, 0);
}

function draw() {
  background(0, 50);
  
  // Q -------------------------------------------
  if(q == true){
    fill(100, 200, 255);
    noStroke();
    polygon(width / 2, height / 2, 100, numSides);
    changeSides();
  } else {
    numSides = 8;
  }
  
  // W -------------------------------------------
  if(w == true){
    fill(250, 250, 0);
    noStroke();
    
    for(let x = 50; x < 350; x += 20){
      rect(x, 100, 10, ht);
    }
    
    fill(0);
    triangle(40, 25, 40, 175, corner, 100);
    if(corner < 350){
      // corner += 40;
      corner+=5;
    }
    
    if(ht > 0){
      ht -=3;
    }
  }
    
  // E ----------------------------------------
  if(e == true){
    noStroke();
    fill(54, 0, 255);
    square(100, 300, sz);

    if(sz < 250){
      sz+=4;
    }

    fill(77, 29, 255);
    square(225, 175, sz2);
    if(sz > 100 && sz2 < 180){
      sz2+=4.5;
    }

    fill(97, 54, 255);
    square(325, 75, sz3);
    if(sz2 > 80 && sz3 < 130){
      sz3+=5.5;
    }
  }
  
  // R -------------------------------------------
  if(r == true){
    noStroke();
    fill(150, 25, 0);
    square(random(width), random(height), random(10, 50));
    fill(100);
    square(random(width), random(height), random(10, 50));
  }
  
  // T --------------------------------------------
  if(t == true){
    image(whooer, 200, imgY, 2116  / 6, 2924 / 6);
    
    if(imgY >= 290){
      imgY -= 15;
    }
  }
  
  // Y --------------------------------------------
  if(y == true){
    rec.show();
    rec.move();
  } else {
    rec.reset();
  }
  
  // U --------------------------------------------
  if(u == true){
    let diam = 200 + sin(theta) * maxDiameter;
    let diam2 = 100 + sin(theta2) * maxDiameter;

    noStroke();
    fill(0, 255, 0);
    circle(200, 200, diam);

    fill(150, 255, 150);
    circle(200, 200, diam2);

    theta += 0.2; 
    theta2 += 0.2;
  }
  
  // I -----------------------------------------
  if(i == true){
    for(let i = 0; i < bubbles.length; i++){
      bubbles[i].show();
      bubbles[i].move();
    }
  }
  
  // O ------------------------------------------
  if(o == true){
    particles.forEach((p) => {
      p.step();
      p.draw();
    });
    particles = particles.filter((p) => p.isAlive);
    }
  
  // P -------------------------------------------
  if(p == true){
    noStroke();
    fill(siz.r, siz.g, siz.b);
    background(0);
    rect(200+siz.xpos, height / 2, siz.x, height);
    siz.x=random(0,width);
    siz.r=random(50, 200);
    siz.g=random(100, 200);
    siz.b=random(100, 150);
    siz.xpos=random(0,100);
    }
}

// KEY TYPED **************************************************
function keyTyped(){
  if(key == "q"){
    organ.play();
    q = true;
  } else {
    q = false;
    numSides = 8;
  }
  
  if(key == "w"){
    guitar.setVolume(2.5);
    guitar.play();
    w = true;
  } else {
    w = false;
    ht = 200;
    corner = 52;
  }
  
  if(key == "e"){
    unlock.setVolume(4);
    unlock.play();
    e = true;
  } else {
    e = false;
    sz = 20;
    sz2 = 0;
    sz3 = 0;
  }
  
  if(key == "r"){
    sadboy.play();
    r = true;
  } else {
    r = false;
  }
  
  if(key == "t"){
    whoo.play();
    t = true;
  } else {
    t = false;
    imgY = 500;
  }
  
  if(key == "y"){
    piano.play();
    y = true;
  } else {
    y = false;
  }

  if(key == "u"){
    pulse.play();
    u = true;
  } else {
    u = false;
  }
  
  if(key == "i"){
    trumpet.setVolume(3);
    trumpet.play();
    i = true;
  } else {
    i = false;
  }
  
  if(key == "o"){
    slide.play();
    o = true;
    particles.push(new Firework(x, height));
  } else {
    o = false;
  }
  
  if(key == "p"){
    acid.play();
    p = true;
  } else {
    p = false;
  }
}

// POLYGON ****************************************************
function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// CHANGE SIDES (OF PLOYGON) **********************************
function changeSides(){
  if(numSides > 3){
    numSides -= 0.07;
  }
}
