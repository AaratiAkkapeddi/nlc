/* ASCII sparkle trail that follows mouse */
let sparkles = [];
let mainColor;
let w, h;
let prevMouseX = 0;
let prevMouseY = 0;

function setup() {
  w = window.innerWidth;
  h = window.innerHeight;
  
  let c = createCanvas(w, h);
  c.parent('petri');

  frameRate(30);
  mainColor = color(0, 0, 0); // Black
  
  // Set text properties for ASCII characters
  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  clear();
  
  noStroke();
  
  // Only add sparkles if mouse is moving
  if (mouseX !== prevMouseX || mouseY !== prevMouseY) {
    if (mouseX > 0 && mouseY > 0) {
      for (let i = 0; i < 3; i++) {
        sparkles.push(new Sparkle(mouseX, mouseY));
      }
    }
  }
  
  // Update previous mouse position
  prevMouseX = mouseX;
  prevMouseY = mouseY;
  
  // Draw and update all sparkles
  for (let i = sparkles.length - 1; i >= 0; i--) {
    sparkles[i].update();
    sparkles[i].draw();
    
    // Remove sparkles that have faded out
    if (sparkles[i].isDead()) {
      sparkles.splice(i, 1);
    }
  }
}

class Sparkle {
  constructor(x, y) {
    this.x = x + random(-20, 20);
    this.y = y + random(-20, 20);
    this.lifetime = random(15, 30); // Frames to live (faster disappearance)
    this.age = 0;
    
    // Array of ASCII characters to use
    this.asciiChars = ['*', '+', '·', '×', '•', '∘', '○', '◦', '∙', '⋅', '˙', '`', "'", '.', ',', '^', '~'];
    this.char = random(this.asciiChars);
  }
  
  update() {
    // Just count age
    this.age++;
  }
  
  draw() {
    fill(mainColor);
    text(this.char, this.x, this.y);
  }
  
  isDead() {
    return this.age >= this.lifetime;
  }
}

function windowResized() {
  w = window.innerWidth;
  h = window.innerHeight;
  resizeCanvas(w, h);
}