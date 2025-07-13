import { Operation } from '../../fp-lib/types.ts';
import { err, ok } from '../../fp-lib/util.ts';
import { MoveData } from '../../types/card.ts';
import { FromWasteToTableau } from '../../types/move.ts';
import { WASTE, TABLEAU } from '../constants.ts';
import { WRONG_VALIDATOR, INVALID_MOVE } from '../errors.ts';
import { isValidTableauAfterMove } from './util/isValidTableauAfterMove.ts';

export function tryFromWasteToTableau(ctx: MoveData): Operation<FromWasteToTableau> {
  if (ctx.from.pile !== WASTE || ctx.to.pile !== TABLEAU) return err(WRONG_VALIDATOR);
  if (ctx.movingCards.length !== 1) return err(INVALID_MOVE);
  if (isValidTableauAfterMove(ctx) === false) return err(INVALID_MOVE);

  return ok({
    movingCards: ctx.movingCards,
    targetBefore: ctx.targetBefore,
    targetAfter: ctx.targetAfter,
    from: ctx.from,
    to: ctx.to,
  });
}
