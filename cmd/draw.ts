import { GameState } from "../types/game.ts";

export function draw(count: number, game: GameState): GameState {
  const out = structuredClone(game);

  for (let i = 0; i < count; i++) {
    if (out.stock.length === 0) {
      out.stock = out.waste.reverse().map((c) => ({ ...c, faceUp: false }));
      out.waste = [];
    }

    if (out.stock.length === 0) break;

    const card = out.stock.pop()!;
    out.waste.push({ ...card, faceUp: true });
  }

  return out;
}
