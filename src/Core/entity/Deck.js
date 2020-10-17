import * as PIXI from 'pixi.js';

export class Deck {
  constructor({ resources, widthFrame, heightFrame, xStartFrame, yStartFrame, xStartDeck, yStartDeck }) {
    this.backTexture = new PIXI.Texture(resources.cards.texture);
    this.backFrame = new PIXI.Rectangle(xStartFrame, yStartFrame, widthFrame, heightFrame);
    this.backTexture.frame = this.backFrame;

    this.sprite = new PIXI.Sprite(this.backTexture);
    this.sprite.x = xStartDeck;
    this.sprite.y = yStartDeck;
    this.sprite.interactive = true;
    this.sprite.buttonMode = true;
  }

  getSprite() {
    return this.sprite;
  }

  getTexture() {
    return this.backTexture;
  }

  hide() {
    this.sprite.visible = false;
  }
}
