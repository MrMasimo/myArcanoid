game.ball = {
  x: game.width / 2 - 20,
  y: game.height - 85,
  width: 40,
  height: 40,
  speed: 5,
  dy: 0,
  dx: 0,
  frame: 0,
  start() {
    this.dy = -this.speed;
    this.dx = game.random(-this.speed, this.speed);
  },
  move() {
    if (this.dy) this.y += this.dy;
    if (this.dx) this.x += this.dx;
  },
  collide(element) {
    let x = this.x + this.dx;
    let y = this.y + this.dy;
    let side = "";
    if (
      x + this.width > element.x &&
      x < element.x + element.width &&
      y + this.height > element.y &&
      y < element.y + element.height
    ) {
      side = this.collideSide(element);
    }
    return side;
  },
  collideSide(element) {
    let x = this.x - this.dx;
    let y = this.y - this.dy;
    let side = "";
    if (x + this.width < element.x || x > element.x + element.width) side = "x";
    else if (y + this.height < element.y || y > element.y + element.height)
      side = "y";
    return side;
  },
  collideWorldLine() {
    let x = this.x + this.dx;
    let y = this.y + this.dy;

    if (x < 0) {
      this.dx *= -1;
      game.sounds.bump.play();
    } else if (x + this.width > game.canvas.width) {
      this.dx *= -1;
      game.sounds.bump.play();
    } else if (y < 0) {
      this.dy *= -1;
      game.sounds.bump.play();
    } else if (y + this.height > game.canvas.height) {
      --game.life;
      game.end("Вы проиграли");
    }
  },
  bumpBlockY() {
    game.sounds.bump.play();
    this.dy *= -1;
  },
  bumpBlockX() {
    game.sounds.bump.play();
    this.dx *= -1;
  },
  bumpPlatform(platform) {
    if (this.dy > 0) {
      game.sounds.bump.play();
      this.dy = -this.speed;
      let touchX = this.x + this.width / 2;
      this.dx = this.speed * platform.getTouchOffset(touchX);
    }
  },
};
