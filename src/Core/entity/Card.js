import * as PIXI from 'pixi.js';

export class Card {
  constructor({ resources, cardData, width, height, backTexture, xStart, yStart }) {
    this.backTexture = backTexture;

    this.frontTexture = new PIXI.Texture(resources.cards.texture);
    this.frontFrame = new PIXI.Rectangle(cardData.spriteXStart, cardData.spriteYStart, width, height);
    this.frontTexture.frame = this.frontFrame;

    this.sprite = new PIXI.Sprite();
    this.turnDown();
    this.sprite.x = xStart;
    this.sprite.y = yStart;
  }

  moveByX(newPointX) {
    this.sprite.x += newPointX;
  }

  moveByY(newPointY) {
    this.sprite.y += newPointY;
  }

  turnDown() {
    this.sprite.texture = this.backTexture;
  }

  turnUp() {
    this.sprite.texture = this.frontTexture;
  }

  getSprite() {
    return this.sprite;
  }
}
