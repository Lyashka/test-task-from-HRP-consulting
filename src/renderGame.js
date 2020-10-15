import * as PIXI from 'pixi.js';
import pathToSpriteCards from './img/cards.gif';
import { getRandomInt } from './common/getRandomInt.js';
import { setLastPointBySuit } from './Core/setLastPointBySuit.js';
import { cloneDeep } from './common/cloneDeep.js';

import {
  CARDS_ARRAY,
  BACKGROUND_COLOR,
  CARD_WIDTH,
  CARD_HEIGHT,
  SUIT_AREAS,
  SUIT_AREAS_LINE_COLOR,
} from './localStorage.js';

export class Game {
  constructor() {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: BACKGROUND_COLOR,
    });
    this.widthApp = this.app.screen.width;
    this.heightApp = this.app.screen.height;
    this.deck = null;
    this.backTexture = null;
    this.currentCardsArray = cloneDeep(CARDS_ARRAY);
    this.app.loader
      .add("cards", pathToSpriteCards)
      .load((loader, resources) => {
        this.initGame(resources);
        this.play(resources);
      });
  }

  initGame(resources) {
    this.app.renderer.view.style.display = "block";
    document.body.appendChild(this.app.view);

    const suitsAreas = new PIXI.Graphics();
    suitsAreas.lineStyle(2, SUIT_AREAS_LINE_COLOR, 1);
    SUIT_AREAS.map(item =>
      suitsAreas.drawRect(item.xStart, this.heightApp / 3 - 6, item.width, item.height));
    this.app.stage.addChild(suitsAreas);

    this.backTexture = new PIXI.Texture(resources.cards.texture);
    const backFrame = new PIXI.Rectangle(0, 469, CARD_WIDTH, CARD_HEIGHT);
    this.backTexture.frame = backFrame;
    this.deck = new PIXI.Sprite(this.backTexture);
    this.deck.x = this.widthApp / 4;
    this.deck.y = this.heightApp / 3;
    this.deck.interactive = true;
    this.deck.buttonMode = true;
    this.app.stage.addChild(this.deck);
  }

  play(resources) {
    this.deck.on('pointertap', () => {
      const randomIndex = getRandomInt(0, this.currentCardsArray.length - 1);
      const randomCard = this.currentCardsArray[randomIndex];
      this.currentCardsArray = this.currentCardsArray.filter((card, index) => index !== randomIndex);
      const faceTexture = new PIXI.Texture(resources.cards.texture);
      const faceFrame = new PIXI.Rectangle(randomCard.xStart, randomCard.yStart, CARD_WIDTH, CARD_HEIGHT);
      faceTexture.frame = faceFrame;

      const newCard = new PIXI.Sprite(this.backTexture);
      newCard.x = this.widthApp / 4;
      newCard.y = this.heightApp / 3;
      const lastPointBySuit = setLastPointBySuit(randomCard.suit);
      this.app.ticker.add((delta) => {
        if (newCard.x < lastPointBySuit) {
          newCard.x += 3 * delta;
        }
        setTimeout(() => newCard.texture = faceTexture, 1000);
      });
      this.app.stage.addChild(newCard);
      if (this.currentCardsArray.length === 0) {
        this.deck.visible = false;
      }
    })
    this.app.renderer.render(this.app.stage);
  }
}
