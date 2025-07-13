import { assert, assertEquals, assertNotEquals } from '@std/assert';
import { Card } from '../../types/card.ts';
import { shuffle } from '../util/shuffle.ts';
import { generateDeck } from '../util/generateDeck.ts';
import { secureRandom } from '../util/secureRandom.ts';

/* The probability of getting the same deck after shuffling is extremely low*/
Deno.test('util | shuffle', () => {
  const deck: Card[] = generateDeck();

  const shuffledDeck = shuffle(deck, secureRandom);

  assertEquals(shuffledDeck.length, deck.length);
  assert(deck.every((card) => shuffledDeck.some((c) => c.suit === card.suit && c.rank === card.rank)));

  assertNotEquals(shuffledDeck, deck);
});
