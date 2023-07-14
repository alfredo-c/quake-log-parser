import { Game } from '../../domain/game.entity';
import { GameFileParserService } from './game-file-parser.service';

describe('GameFileParserService', () => {
  const service: GameFileParserService = new GameFileParserService();

  /* eslint-disable */
  // @ts-ignore
  service.GAME_LOG_PATH = 'assets/games-test.log';

  it('should getAll games', async () => {
    const result = await service.getAll();
    const game = new Game();
    expect(result.length).toEqual(3);
    expect(result).toStrictEqual([
      { game_1: game },
      { game_2: game },
      { game_3: game },
    ]);
  });

  it('should get first game', async () => {
    const result = await service.getById(1);
    const game = new Game();
    expect(result).toStrictEqual({ game_1: game });
  });

  it('should get null with game not found', async () => {
    const result = await service.getById(4);
    expect(result).toStrictEqual(null);
  });
});
