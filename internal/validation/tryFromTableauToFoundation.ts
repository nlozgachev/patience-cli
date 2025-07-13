import { Operation } from '../../fp-lib/types.ts';
import { err, ok } from '../../fp-lib/util.ts';
import { MoveData } from '../../types/card.ts';
import { FromTableauToFoundation } from '../../types/move.ts';
import { TABLEAU, FOUNDATION } from '../constants.ts';
import { WRONG_VALIDATOR, INVALID_MOVE } from '../errors.ts';
import { isValidFoundationAfterMove } from './util/isValidFoundationAfterMove.ts';

export function tryFromTableauToFoundation(ctx: MoveData): Operation<FromTableauToFoundation> {
  if (ctx.from.pile !== TABLEAU || ctx.to.pile !== FOUNDATION) return err(WRONG_VALIDATOR);
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
