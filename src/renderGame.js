import * as PIXI from 'pixi.js';
import pathToSpriteCards from './img/cards.gif';
import { Deck } from './Core/entity/Deck.js';
import { Card } from './Core/entity/Card.js';
import { getRandomInt } from './common/getRandomInt.js';
import { getDestinationBySuit } from './Core/getDestinationBySuit.js';
import { cloneDeep } from './common/cloneDeep.js';

import {
  CARDS_ARRAY,
  BACKGROUND_COLOR,
  CARD_WIDTH,
  CARD_HEIGHT,
  SUIT_AREAS,
  SUIT_AREAS_LINE_COLOR,
  SUIT_AREAS_WIDTH,
  CARD_MOVE_SPEED,
  X_START_BACK_OF_CARD,
  Y_START_BACK_OF_CARD,
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
    this.randomCard = null;
    this.currentCardsArray = cloneDeep(CARDS_ARRAY);
    this.app.loader
      .add("cards", pathToSpriteCards)
      .load((loader, resources) => {
        this.initGame(resources);
      });
    document.body.appendChild(this.app.view);
  }

  initGame(resources) {
    this.app.renderer.view.style.display = "block";

    const suitsAreas = new PIXI.Graphics();
    suitsAreas.lineStyle(2, SUIT_AREAS_LINE_COLOR, 1);
    SUIT_AREAS.map(item =>
      suitsAreas.drawRect(
        item.xStart,
        this.heightApp / 3 - ((SUIT_AREAS_WIDTH - CARD_WIDTH) / 2),
        item.width,
        item.height));
    this.app.stage.addChild(suitsAreas);

    this.deck = new Deck({
      resources: resources,
      widthFrame: CARD_WIDTH,
      heightFrame: CARD_HEIGHT,
      xStartFrame: X_START_BACK_OF_CARD,
      yStartFrame: Y_START_BACK_OF_CARD,
      xStartDeck: this.widthApp / 4,
      yStartDeck: this.heightApp / 3,
    });

    this.app.stage.addChild(this.deck.getDeck());

    this.addGameAnimation(resources);
  }

  addGameAnimation(resources) {
    this.deck.getDeck().on('pointertap', () => {
      const randomIndex = getRandomInt(0, this.currentCardsArray.length - 1);
      this.randomCard = this.currentCardsArray[randomIndex];
      this.currentCardsArray = this.currentCardsArray.filter((card, index) => index !== randomIndex);

      const newCard = new Card({
        resources: resources,
        randomCard: this.randomCard,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backTexture: this.deck.getTexture(),
        xStart: this.widthApp / 4,
        yStart: this.heightApp / 3,
      },);

      const destinationBySuit = getDestinationBySuit(this.randomCard.suit);

      this.app.ticker.add(() => {
        let distanceToDestination = destinationBySuit - newCard.getCard().x;
        if (newCard.getCard().x < destinationBySuit && distanceToDestination > CARD_MOVE_SPEED) {
          newCard.moveByX(CARD_MOVE_SPEED);
        } else {
          newCard.moveByX(distanceToDestination);
        }

        setTimeout(() => newCard.turnUp(), 1000);
      });

      this.app.stage.addChild(newCard.getCard());
      if (this.currentCardsArray.length === 0) {
        this.deck.hide();
      }
    })

    this.app.renderer.render(this.app.stage);
  }
}
