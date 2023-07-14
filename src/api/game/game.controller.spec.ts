import { Response } from 'express';
import { Game } from '../../domain/game.entity';
import { GameController } from './game.controller';
import { GameFileParserService } from '../../service/game-file-parser/game-file-parser.service';

describe('GameController', () => {
  let controller: GameController;
  let gameService: GameFileParserService;

  beforeEach(async () => {
    gameService = new GameFileParserService();
    controller = new GameController(gameService);
  });

  describe('getAll', () => {
    it('should return an array of games', async () => {
      const result = [];
      const game = new Game();

      let gameData = new Map();
      gameData.set('game_1', game);
      let gameMapped = Object.fromEntries(gameData);
      result.push(gameMapped);

      gameData = new Map();
      gameData.set('game_2', game);
      gameMapped = Object.fromEntries(gameData);
      result.push(gameMapped);

      gameData = new Map();
      gameData.set('game_3', game);
      gameMapped = Object.fromEntries(gameData);
      result.push(gameMapped);

      jest
        .spyOn(gameService, 'getAll')
        .mockImplementation(() => Promise.resolve(result));
      const actualResult = await controller.getAll();
      expect(actualResult).toStrictEqual(result);
    });
  });

  describe('getById', () => {
    it('should return a game when exists', async () => {
      const game = new Game();

      const gameData = new Map();
      gameData.set('game_1', game);
      const gameMapped = Object.fromEntries(gameData);

      jest
        .spyOn(gameService, 'getById')
        .mockImplementation(() => Promise.resolve(gameMapped));
      const actualResult = await controller.getById(null, 1);
      expect(actualResult).toStrictEqual(gameMapped);
    });

    it('should return no content when not found', async () => {
      jest
        .spyOn(gameService, 'getById')
        .mockImplementation(() => Promise.resolve(null));
      /* eslint-disable */
      // @ts-ignore
      const res = {
        status: jest.fn(() => undefined),
      } as Response;
      const actualResult = await controller.getById(res, 1);
      expect(actualResult).toStrictEqual(undefined);
    });
  });
});
