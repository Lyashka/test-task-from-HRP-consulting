import * as PIXI from 'pixi.js';

export class Card {
  constructor({ resources, randomCard, width, height, backTexture, xStart, yStart }) {
    this.backTexture = backTexture;

    this.frontTexture = new PIXI.Texture(resources.cards.texture);
    this.frontFrame = new PIXI.Rectangle(randomCard.xStart, randomCard.yStart, width, height);
    this.frontTexture.frame = this.frontFrame;

    this.card = new PIXI.Sprite();
    this.setBackTexture();
    this.card.x = xStart;
    this.card.y = yStart;
  }

  moveByX(newPointX) {
    this.card.x += newPointX;
  }

  moveByY(newPointY) {
    this.card.y += newPointY;
  }

  setBackTexture() {
    this.card.texture = this.backTexture;
  }

  setFrontTexture() {
    this.card.texture = this.frontTexture;
  }

  getCard() {
    return this.card;
  }
}
