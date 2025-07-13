import { Operation } from '../../fp-lib/types.ts';
import { err, ok } from '../../fp-lib/util.ts';
import { MoveData } from '../../types/card.ts';
import { FromWasteToFoundation } from '../../types/move.ts';
import { WASTE, FOUNDATION } from '../constants.ts';
import { WRONG_VALIDATOR, INVALID_MOVE } from '../errors.ts';
import { isValidFoundationAfterMove } from './util/isValidFoundationAfterMove.ts';

export function tryFromWasteToFoundation(ctx: MoveData): Operation<FromWasteToFoundation> {
  if (ctx.from.pile !== WASTE || ctx.to.pile !== FOUNDATION) return err(WRONG_VALIDATOR);
  if (ctx.movingCards.length !== 1) return err(INVALID_MOVE);
  if (isValidFoundationAfterMove(ctx) === false) return err(INVALID_MOVE);

  return ok({
    movingCards: ctx.movingCards,
    targetBefore: ctx.targetBefore,
    targetAfter: ctx.targetAfter,
    from: ctx.from,
    to: ctx.to,
  });
}
