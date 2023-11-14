class Bubble {
  
    constructor(x, y, d){
      this.x = x;
      this.y = y;
      this.d = d;
    }
    
    show(){
      fill(255, 100, 255, 50);
      noStroke();
      circle(this.x, this.y, this.d);
    }
    
    move(){
      this.x += random(-5, 5);
      this.y += random(-5, 5);
    }
    
    reset(){
      this.x = 200;
      this.y = 200;
    }
    
  }