export const ALL_SUITS = ["♠", "♥", "♦", "♣"] as const;
export const ALL_RANKS = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
] as const;

// === card locations ===
export const WASTE = Symbol("waste");
export const TABLEAU = Symbol("tableau");
export const FOUNDATION = Symbol("foundation");

// === commands ===
export const MOVE_CMD = Symbol("move");
export const DRAW_CMD = Symbol("draw");
// export const FOUNDATION_CMD = Symbol("foundation");
export const UNDO_CMD = Symbol("undo");
export const QUIT_CMD = Symbol("quit");
