import * as PIXI from 'pixi.js';
import pathToSprite from './img/cards.gif';
import { cardsArray } from './localStorage.js';
import { getRandomInt } from './common/getRandomInt.js';
import { cloneDeep } from './common/cloneDeep.js';

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
  const backTexture = new PIXI.Texture(resources.cards.texture);
  const backRectangle = new PIXI.Rectangle(0, 469, 82, 118);
  backTexture.frame = backRectangle;
  const deck = new PIXI.Sprite(backTexture);
  deck.x = app.screen.width / 4;
  deck.y = app.screen.height / 3;
  app.stage.addChild(deck);

  let currentCardsArray = cloneDeep(cardsArray);
  let isBackCard = true;
  deck.interactive = true;
  deck.buttonMode = true;
  deck.on('pointertap', () => {
    if (isBackCard) {
      isBackCard = !isBackCard;
      const randomIndex = getRandomInt(0, currentCardsArray.length - 1);
      const randomCard = currentCardsArray[randomIndex];
      currentCardsArray = currentCardsArray.filter((card, index) => index !== randomIndex);
      const faceTexture = new PIXI.Texture(resources.cards.texture);
      const faceRectangle = new PIXI.Rectangle(randomCard.xStart, randomCard.yStart, 82, 118);
      faceTexture.frame = faceRectangle;
      deck.texture = faceTexture;
      console.log(faceTexture);
    } else {
      if (currentCardsArray.length !== 0) {
        isBackCard = !isBackCard;
        deck.texture = backTexture;
      } else {
        deck.visible = false;
      }
    }
  })
  app.renderer.render(app.stage);
})
