class Record {
    constructor(recX, recY){
      this.recX = recX;
      this.recY = recY;
      this.ang = 0;
      this.aM = 0.2;
      this.sColor = 255;
    }
    
    show(){
      fill(0, 0, 255);
      noStroke();
      circle(this.recX, this.recY, 150);
      fill(0);
      circle(this.recX, this.recY, 20);
  
      noFill();
      stroke(0);
      strokeWeight(4);
  
      arc(this.recX, this.recY, 120, 120, 0, 110);
      arc(this.recX, this.recY, 90, 90, 0, 110);
      arc(this.recX, this.recY, 60, 60, 0, 110);
  
      arc(this.recX, this.recY, 120, 120, 170, 280);
      arc(this.recX, this.recY, 90, 90, 170, 280);
      arc(this.recX, this.recY, 60, 60, 170, 280);
      
      fill(0);
      noStroke();
      rect(200, 400, 400, 250);
      
    }
    
    move(){
      if(this.recY < 480){
        this.recY+=10;
      }
      
    }
    
    reset(){
      this.recY = 200;
    }
  }