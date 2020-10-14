import * as PIXI from 'pixi.js';
import card from './img/test-card.png';

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x00B060,
});

app.renderer.view.style.display = "block";
document.body.appendChild(app.view);

app.loader
.add("card", card)
.load((loader, resources) => {
  const card = new PIXI.Sprite(resources.card.texture);
  card.anchor.set(0.5);
  card.x = app.screen.width / 2;
  card.y = app.screen.height / 2;
  app.stage.addChild(card);
})
