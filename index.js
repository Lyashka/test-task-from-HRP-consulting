import * as PIXI from 'pixi.js';
import pathToSprite from './img/cards.gif';

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

app.loader
.add("cards", pathToSprite)
.load((loader, resources) => {
  const faceTexture = new PIXI.Texture(resources.cards.texture);
  const backTexture = new PIXI.Texture(resources.cards.texture);
  const faceRectangle = new PIXI.Rectangle(809, 352, 82, 118);
  const backRectangle = new PIXI.Rectangle(0, 469, 82, 118);
  faceTexture.frame = faceRectangle;
  backTexture.frame = backRectangle;
  const card = new PIXI.Sprite(faceTexture);
  card.x = app.screen.width / 4;
  card.y = app.screen.height / 3;
  app.stage.addChild(card);

  let bol = false;
  card.interactive = true;
  card.buttonMode = true;
  card.on('pointertap', () => {
    bol = !bol;
    if (bol) {
      card.texture = faceTexture;
    } else {
      card.texture = backTexture;
    }
  })
  app.renderer.render(app.stage);
})
