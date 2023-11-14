class Particle {
    constructor(x, y, xSpeed, ySpeed, pColor, size) {
      this.x = x;
      this.y = y;
      this.xSpeed = xSpeed;
      this.ySpeed = ySpeed;
      this.color = pColor;
      this.size = size;
      this.isAlive = true;
      this.trail = [];
      this.trailIndex = 0;
    }
  
    step() {
      this.trail[this.trailIndex] = createVector(this.x, this.y);
      this.trailIndex++;
      if (this.trailIndex > 10) {
        this.trailIndex = 0;
      }
      this.x += this.xSpeed;
      this.y += this.ySpeed;
  
      this.ySpeed += gravity;
  
      if (this.y > height) {
        this.isAlive = false;
      }
    }
  
    draw() {
      this.drawTrail();
      fill(this.color);
      noStroke();
      rect(this.x, this.y, this.size, this.size);
    }
  
    drawTrail() {
      let index = 0;
  
      for (let i = this.trailIndex - 1; i >= 0; i--) {
        const tColor = lerpColor(
          color(this.color),
          endColor,
          index / this.trail.length
        );
        fill(tColor);
        noStroke();
        rect(this.trail[i].x, this.trail[i].y, this.size, this.size);
        index++;
      }
  
      for (let i = this.trail.length - 1; i >= this.trailIndex; i--) {
        const tColor = lerpColor(
          color(this.color),
          endColor,
          index / this.trail.length
        );
        fill(tColor);
        noStroke();
        rect(this.trail[i].x, this.trail[i].y, this.size, this.size);
        index++;
      }
    }
  }
  
  
  class Firework extends Particle {
    constructor(x, y) {
      super(x, y, random(-2, 2), random(-10, -15), random(colors), 10);
      this.countdown = 30;
    }
  
    step() {
      super.step();
  
      this.countdown--;
      if (this.countdown <= 0) {
        const explosionSize = random(20, 40);
        for (let i = 0; i < explosionSize; i++) {
          const speed = random(5, 10);
          const angle = random(TWO_PI);
          const xSpeed = cos(angle) * speed;
          const ySpeed = sin(angle) * speed;
  
          particles.push(
            new Particle(this.x, this.y, xSpeed, ySpeed, this.color, 5)
          );
        }
        this.isAlive = false;
      }
    }
  }
  