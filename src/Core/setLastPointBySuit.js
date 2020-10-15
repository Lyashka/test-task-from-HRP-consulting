export function setLastPointBySuit(suit) {
  let lastPoint = null;
  switch (true) {
    case suit === "hearts":
      lastPoint = 603;
      break;
    case suit === "clubs":
      lastPoint = 753;
      break;
    case suit === "diamonds":
      lastPoint = 902;
      break;
    case suit === "spades":
      lastPoint = 1053;
      break;
  }

  return lastPoint;
}
