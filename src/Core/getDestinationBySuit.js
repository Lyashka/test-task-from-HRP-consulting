import {
  CARD_WIDTH,
  SUIT_AREAS_WIDTH,
  SUIT_AREAS,
} from '../localStorage.js';

export function getDestinationBySuit(suit) {
  const currentSuit = SUIT_AREAS.find(area => area.suit === suit);
  const destination = ((SUIT_AREAS_WIDTH - CARD_WIDTH) / 2) +
    currentSuit.xStart;

  return destination;
}
