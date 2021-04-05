let game = {
  canvas: null,
  ctx: null,
  sprites: {
    background: null,
    platform: null,
    ball: null,

  },

  init: function () {
    this.canvas = document.getElementById("canvasField");
    this.ctx = this.canvas.getContext("2d");
  },

  preload: function (callback) {
    loadedImg = 0;
    reqiredImg = Object.keys(this.sprites).length;

    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `sprites/${key}.png`;
      this.sprites[key].addEventListener("load", () => {
        loadedImg++;
        if (loadedImg >= reqiredImg) {
          callback();
        }
      });
    }
  },

  render: function () {
    this.ctx.drawImage(this.sprites.background, 0, 0);
    this.ctx.drawImage(
      this.sprites.platform,
      this.canvas.width/2 - 50,
      this.canvas.height - 30
    );
    this.ctx.drawImage(
      this.sprites.ball,
      this.canvas.width / 2 - 50,
      this.canvas.height - 50
    );
  },

  run: function () {
    window.requestAnimationFrame(() => {
      this.render();
    });
  },
  start: function () {
    this.init();
    this.preload(() => {
      this.run();
    })
  },
};

document.addEventListener("DOMContentLoaded", () => {
  game.start();
});