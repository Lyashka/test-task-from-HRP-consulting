import * as PIXI from 'pixi.js';

export class Deck {
  constructor({ resources, widthFrame, heightFrame, xStartFrame, yStartFrame, xStartDeck, yStartDeck }) {
    this.backTexture = new PIXI.Texture(resources.cards.texture);
    this.backFrame = new PIXI.Rectangle(xStartFrame, yStartFrame, widthFrame, heightFrame);
    this.backTexture.frame = this.backFrame;

    this.deck = new PIXI.Sprite(this.backTexture);
    this.deck.x = xStartDeck;
    this.deck.y = yStartDeck;
    this.deck.interactive = true;
    this.deck.buttonMode = true;
  }

  getDeck() {
    return this.deck;
  }

  getTexture() {
    return this.backTexture;
  }

  hidden() {
    this.deck.visible = false;
  }
}
