let game = {
  running: false,
  level: 1,
  life: 3,
  canvas: null,
  ctx: null,
  width: 1280,
  height: 720,
  platform: null,
  ball: null,
  blocks: [],
  rows: 1,
  cols: 10,
  sprites: {
    background: null,
    platform: null,
    ball: null,
    block: null,
  },
  sounds: {
    bump: null,
  },

  init: function () {
    this.running = true;
    this.canvas = document.getElementById("canvasField");
    this.ctx = this.canvas.getContext("2d");
    this.initCanvasSize();
    this.setEvents();
    this.textStyle();
  },
  textStyle() {
    this.ctx.fillStyle = "#FFFFFF"
    this.ctx.font = " 26pt Arial";
  },
  initCanvasSize() {
       let realWidth = window.innerWidth * window.devicePixelRatio;
       let realHeight = window.innerHeight * window.devicePixelRatio;
       let maxHeight = this.height;
       let maxWidth = this.width;
       this.height = Math.min(
         Math.floor((maxWidth * realHeight) / realWidth),
         maxHeight
       );
       this.canvas.width = this.width;
       this.canvas.height = this.height;
  },
  setEvents: function () {
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowRight" || e.code === "ArrowLeft") {
        this.platform.start(e.code);
      }
      if (e.code === "Space") {
        this.platform.pushBall(this.level);
      }
    });
    window.addEventListener("keyup", () => {
      this.platform.stop();
    });
  },
  preload: function (callback) {
    let loadedResource = 0;
    let reqired = Object.keys(this.sprites).length;
    reqired += Object.keys(this.sounds).length;
    let onLoadResource = () => {
      loadedResource++;
      if (loadedResource >= reqired) callback();
    };
    this.preloadSprites(onLoadResource);
    this.preloadSounds(onLoadResource);
  },
  preloadSprites(onLoadResource) {
    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `sprites/${key}.png`;
      this.sprites[key].addEventListener("load", onLoadResource);
    }
  },
  preloadSounds(onLoadResource) {
    for (let key in this.sounds) {
      this.sounds[key] = new Audio(`sounds/${key}.mp3`);
      this.sounds[key].addEventListener("canplaythrough", onLoadResource, {
        once: true,
      });
    }
  },
  render: function () {
    this.ctx.drawImage(this.sprites.background, 0, 0);
    this.ctx.fillText(`Level: ${this.level} `, 20, 48);
    this.ctx.fillText(`Life: ${this.life}`, this.canvas.width - 110, 48);
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
    this.ball.x = this.width / 2 - 20;
    this.ball.y = this.height - 85;
    this.ball.dx = 0;
    this.ball.dy = 0;
    this.platform.x = this.width / 2 - 125;
    this.platform.y = this.height - 45;
    this.platform.setBallOnPlatform(this.ball);
    this.blocks = [];

    for (let row = 0; row < this.rows; row++)
      for (let col = 0; col < this.cols; col++)
        this.blocks.push({
          width: 111,
          height: 39,
          x: 113 * col + 70,
          y: 42 * row + 90,
        });
  },
  update: function () {
    this.platform.collideWorldLine();
    this.platform.move();
    this.ball.collideWorldLine();
    this.ball.move();
    this.collideBlocks();
    this.collidePlatform();
  },
  collideBlocks() {
    for (let block of this.blocks) {
      let sideBump = this.ball.collide(block);
      if (sideBump) {
        if (sideBump === "x") this.ball.bumpBlockX();
        if (sideBump === "y") this.ball.bumpBlockY();
        this.crushBlock(block);
      }
    }
  },
  collidePlatform() {
    if (this.ball.collide(this.platform)) {
      this.ball.bumpPlatform(this.platform);
    }
  },
  crushBlock(block) {
    this.blocks.splice(this.blocks.indexOf(block), 1);
    if (!this.blocks.length) {
      ++this.level;
      this.end();
    }
  },
  run: function () {

    if (this.running) {
      window.requestAnimationFrame(() => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.update();
        this.render();
        this.run();
      });
    }
  },
  start: function () {
    this.running = true;
    this.init();
    this.preload(() => {
      this.create();
      this.run();
    });
  },
  end() {
    game.running = false;
    if (this.life === 0)
    {
      alert("GAME OVER");
      window.location.reload();
    }
      else setTimeout(() => {
      game.start();
    }, 100);
  },
  random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },
};

document.addEventListener("DOMContentLoaded", () => {
      game.start();
});