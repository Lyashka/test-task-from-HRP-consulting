export function getDestinationBySuit(suit) {
  let destination = null;
  switch (true) {
    case suit === "hearts":
      destination = 603;
      break;
    case suit === "clubs":
      destination = 753;
      break;
    case suit === "diamonds":
      destination = 902;
      break;
    case suit === "spades":
      destination = 1053;
      break;
  }

  return destination;
}
