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
    this.widthApp = this.app.screen.width,
    this.heightApp = this.app.screen.height,
    this.currentCardsArray = cloneDeep(CARDS_ARRAY);
    this.app.loader
      .add("cards", pathToSpriteCards)
      .load(() => this.initGame());
    this.play();
  }
}
