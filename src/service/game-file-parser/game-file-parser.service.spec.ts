import { Game } from '../../domain/game.entity';
import { GameFileParserService } from './game-file-parser.service';

describe('GameFileParserService', () => {
  const service: GameFileParserService = new GameFileParserService();

  /* eslint-disable */
  // @ts-ignore
  service.GAME_LOG_PATH = 'assets/games-test.txt';

  it('should getAll games', async () => {
    const result = await service.getAll();
    console.log(result[0])
    console.log(result[1])
    console.log(result[2])
    expect(result.length).toEqual(3);
    expect(result).toStrictEqual([
      {
        "game_1": {
          "WORLD": "<world>",
          "players": [
            "Isgalamido"
          ]
        }
      },
      {
        "game_2": {
          "WORLD": "<world>",
          "players": [
            "Dono da Bola",
            "Isgalamido",
            "Mocinha"
          ]
        }
      },
      {
        "game_3": {
          "WORLD": "<world>",
          "players": [
            "Dono da Bola",
            "Isgalamido",
            "Mocinha",
            "Zeh"
          ]
        }
      }]);
  });

  // it('should get first game', async () => {
  //   const result = await service.getById(1);
  //   const game = new Game();
  //   expect(result).toStrictEqual({ game_1: game });
  // });

  // it('should get null with game not found', async () => {
  //   const result = await service.getById(4);
  //   expect(result).toStrictEqual(null);
  // });
});
