import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x00B060,
});

app.renderer.view.style.display = "block";
document.body.appendChild(app.view);

const graphics = new PIXI.Graphics();
graphics.lineStyle(2, 0xFFFFFF, 1);
graphics.drawRect(500, app.screen.height / 3 - 6, 90, 130);
graphics.drawRect(650, app.screen.height / 3 - 6, 90, 130);
graphics.drawRect(800, app.screen.height / 3 - 6, 90, 130);
graphics.drawRect(950, app.screen.height / 3 - 6, 90, 130);
app.stage.addChild(graphics);
