let game = {
  canvas: null,
  ctx: null,
  platform: null,
  ball: null,
  blocks: [],
  rows: 4,
  cols: 8,
  sprites: {
    background: null,
    platform: null,
    ball: null,
    block: null,
  },

  init: function () {
    this.canvas = document.getElementById("canvasField");
    this.ctx = this.canvas.getContext("2d");
    this.setEvents();
  },

  setEvents: function () {
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowRight" || e.code === "ArrowLeft") {
        this.platform.start(e.code);
      }
      if (e.code === "Space") {
        this.platform.pushBall();
      }
    });
    window.addEventListener("keyup", () => {
      this.platform.stop();
    });
  },

  preload: function (callback) {
    let loadedImg = 0;
    let reqiredImg = Object.keys(this.sprites).length;
    let onLoadedImg = () => {
      loadedImg++;
      if (loadedImg >= reqiredImg)
        callback();
    };

    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `sprites/${key}.png`;
      this.sprites[key].addEventListener("load", onLoadedImg);
    }
  },

  render: function () {
    this.ctx.drawImage(this.sprites.background, 0, 0);
    this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
    this.ctx.drawImage(this.sprites.ball, 0, 0, this.ball.width, this.ball.height, this.ball.x, this.ball.y, this.ball.width, this.ball.height );
    this.renderBlock();
  },
  renderBlock: function () {
    for (let block of this.blocks) {
      this.ctx.drawImage(this.sprites.block, block.x, block.y);
    }
  },
  create: function () {
    for (let row = 0; row < this.rows; row++)
      for (let col = 0; col < this.cols; col++)
        this.blocks.push({
          x: 62 * col+ 65,
          y: 21 * row + 35,
        });
  },
  update: function () {
    this.platform.move();
    this.ball.move();
  },

  run: function () {
    window.requestAnimationFrame(() => {
      this.update();
      this.render();
      this.run();
    });
  },
  start: function () {
    this.init();
    this.preload(() => {
      this.create();
      this.run();
    })
  },
};

game.ball = {
  x: 320,
  y: 280,
  width: 20,
  height: 20,
  speed: 3,
  dy: 0,
  start() {
    this.dy = this.speed;
  },
  move() {
    if (this.dy) this.y -= this.dy;
  },
};

game.platform = {
  x: 280,
  y: 300,
  speed: 6,
  dx: 0,
  ball: game.ball,
  pushBall() {
    if (this.ball) {
      this.ball.start();
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
      if(this.ball)
        this.ball.x += this.dx;
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  game.start();
});