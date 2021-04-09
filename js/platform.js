game.platform = {
  x: game.width / 2 - 125,
  y: game.height - 45,
  width: 251,
  height: 41,
  speed: 10,
  dx: 0,
  ball: game.ball,
  setBallOnPlatform(ball) {
    this.ball = ball;
  },
  pushBall(level) {
    if (this.ball) {
      this.ball.start(level);
      this.ball = null;
    }
  },
  start(direction) {
    if (direction === "ArrowRight") {
      this.dx = this.speed;
    }
    if (direction === "ArrowLeft") {
      this.dx = -this.speed;
    }
  },
  stop() {
    this.dx = 0;
  },
  move() {
    if (this.dx) {
      this.x += this.dx;
      if (this.ball) this.ball.x += this.dx;
    }
  },
  collideWorldLine() {
    let x = this.x + this.dx;
    if (x < 0) {
      this.x = 0;
      this.dx = 0;
    } else if (x + this.width > game.canvas.width) {
      this.x = game.canvas.width - this.width;
      this.dx = 0;
    }
  },
  getTouchOffset(x) {
    let diff = this.x + this.width - x;
    let offset = this.width - diff;
    result = (2 * offset) / this.width;
    return result - 1;
  },
};
