class Earth {
  
  constructor() {
    
    this.x = random(width);
    this.y = random(height);
    let speed = [random(3, 5), random(-5, -3)];
    this.speed = random(speed);
    
  }
  
  display() {
    
    push();
    stroke(49, 122, 252);
    strokeWeight(3);
    fill(0);
    ellipse(this.x, this.y, 180);
    
    stroke(44, 222, 144);
    beginShape();
    vertex(this.x, this.y - 50);
    vertex(this.x + 20, this.y - 20);
    vertex(this.x + 40, this.y - 30);
    vertex(this.x + 60, this.y + 10);
    vertex(this.x + 10, this.y + 70);
    vertex(this.x - 20, this.y + 70);
    vertex(this.x - 50, this.y + 20);
    vertex(this.x - 40, this.y);
    vertex(this.x - 60, this.y);
    vertex(this.x, this.y - 50);
    endShape();
    //strokeWeight(0);
    //textFont(font3);
    //fill(49, 122, 252);
    //textSize(30);
    //text('Earth', this.x-39, this.y+7);
    pop();
  }
  
  move() {
    
    this.x = this.x + this.speed;
    this.y = this.y + this.speed;
    
    if (this.x > width) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = width;
    }
    if (this.y > height) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = height;
    }

  }
  
}