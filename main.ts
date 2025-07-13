import { executeCommand } from './internal/commandExecution/executeCommand.ts';
import { QUIT_CMD, UNDO_CMD } from './internal/constants.ts';
import { INVALID_MOVE } from './internal/errors.ts';
import { parseCommand } from './internal/parsing/parseCommand.ts';
import { render } from './internal/render.ts';
import { initGame } from './internal/util/initGame.ts';
import { isGameWon } from './internal/util/isGameWon.ts';
import { GameState } from './types/game.ts';

Deno.stdin.setRaw(true);
Deno.addSignalListener('SIGINT', () => {
  console.log('\n👋 Exiting...');
  Deno.exit(0);
});

let game = initGame();

let commandBuffer = '';
let message = '';
let inputMode: 'normal' | 'colon' = 'normal';
let movesArchive = [game] as GameState[];

while (true) {
  render(game, commandBuffer, message);

  const buf = new Uint8Array(1);
  const n = await Deno.stdin.read(buf);
  if (n === null) break;

  const key = new TextDecoder().decode(buf);

  switch (key) {
    case '\x03': {
      // Ctrl+C
      Deno.stdin.setRaw(false);
      console.log('\n👋 Exiting...');
      Deno.exit(0);
      break;
    }

    case '\x1b': // Escape
      commandBuffer = '';
      break;

    case '\x7f': // Backspace
      commandBuffer = commandBuffer.slice(0, -1);
      break;

    case ':':
      if (inputMode === 'normal') {
        commandBuffer = ':';
        inputMode = 'colon';
      }
      break;

    default:
      commandBuffer += key;

      if (inputMode === 'colon') {
        if (commandBuffer === ':q' || commandBuffer === ':u') {
          const cmd = parseCommand({ raw: commandBuffer, game });
          if (!cmd.ok) continue;

          if (cmd.ok) {
            const res = executeCommand({ command: cmd.value, game: { state: game, archive: movesArchive } });

            if (cmd.value.action === QUIT_CMD) {
              Deno.stdin.setRaw(false);
              Deno.exit(0);
            }

            if (cmd.value.action === UNDO_CMD) {
              game = res.state;
              movesArchive = res.archive;
            }
          } else {
            message = '❌ Invalid colon command';
          }
          commandBuffer = '';
          inputMode = 'normal';
        }
      } else {
        // Try parsing command immediately
        const maybeCmd = parseCommand({ raw: commandBuffer, game });
        if (!maybeCmd.ok) {
          if (maybeCmd.err === INVALID_MOVE) {
            message = '❌ Invalid move.';
            commandBuffer = '';
          }
          continue;
        }

        message = '';
        const prev = game;
        const res = executeCommand({ command: maybeCmd.value, game: { state: game, archive: movesArchive } });

        if (res.state === prev) {
          message = '❌ Invalid move.';
        } else {
          game = res.state;
          movesArchive = [...res.archive, game];
          message = '';
        }
        commandBuffer = '';

        if (isGameWon(game)) {
          console.clear();
          console.log('🎉 You won!');
          Deno.exit(0);
        }
      }
      break;
  }
}
