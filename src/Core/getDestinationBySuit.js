export function getDestinationBySuit(suit) {
  let destination = null;
  switch (true) {
    case suit === "hearts":
      destination = 606;
      break;
    case suit === "clubs":
      destination = 756;
      break;
    case suit === "diamonds":
      destination = 906;
      break;
    case suit === "spades":
      destination = 1056;
      break;
  }

  return destination;
}
