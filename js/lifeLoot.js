game.lifeLoot = {
  active: false,
  x: null,
  y: null,
  dy: 0,
  speed: 12,
  width: 15,
  height: 15,
  activate(block) {
    this.active = true;
    this.dy = this.speed;
    this.y = block.y;
    this.x = block.x + block.width / 2;
  },
  deactivate() {
    this.active = false;
    this.dy = 0;
    this.x = null;
    this.y = null;
  },
  move() {
    if (this.active) this.y += this.dy;
  },
  collide(element) {
    let y = this.y + this.dy;
    if (
      this.x + this.width > element.x &&
      this.x < element.x + element.width &&
      y + this.height > element.y &&
      y < element.y + element.height
    ) {
      return true;
    }
    return false;
  },
  collideWorldLine() {
    let y = this.y + this.dy;
    if (y + this.height >= game.canvas.height)
      this.deactivate();

  },
}