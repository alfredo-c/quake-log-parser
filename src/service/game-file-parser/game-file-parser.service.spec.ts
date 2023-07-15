import { GameFileParserService } from './game-file-parser.service';

describe('GameFileParserService', () => {
  const service: GameFileParserService = new GameFileParserService();

  /* eslint-disable */
  // @ts-ignore
  service.GAME_LOG_PATH = 'assets/games-test.txt';

  it('should getAll games', async () => {
    const result = await service.getAll();
    expect(result.length).toEqual(3);
    expect(result).toStrictEqual([
      {
        "game_1": {
          "total_kills": 0,
          "players": [
            "Isgalamido"
          ],
          "kills": {}
        }
      },
      {
        "game_2": {
          "total_kills": 11,
          "players": [
            "Dono da Bola",
            "Isgalamido",
            "Mocinha"
          ],
          "kills": {
            "Isgalamido": -7
          }
        }
      },
      {
        "game_3": {
          "total_kills": 4,
          "players": [
            "Dono da Bola",
            "Isgalamido",
            "Mocinha",
            "Zeh"
          ],
          "kills": {
            "Isgalamido": 1,
            "Zeh": -2,
            "Dono da Bola": -1
          }
        }
      }
    ]);
  });

  it('should get first game', async () => {
    const result = await service.getById(1);
    const game = {
      "game_1": {
        "total_kills": 0,
        "players": [
          "Isgalamido"
        ],
        "kills": {}
      }
    }
    expect(result).toStrictEqual(game);
  });

  it('should get null with game not found', async () => {
    const result = await service.getById(4);
    expect(result).toStrictEqual(null);
  });
});
