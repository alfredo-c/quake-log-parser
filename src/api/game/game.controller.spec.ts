import { Response } from 'express';
import { GameController } from './game.controller';
import { GameDto } from '../../api/game/game.dto';
import { IGameService } from '../../domain/service/i-game-service/i-game-service.interface';

describe('GameController', () => {
  const gamesMocked = [
    {
      game_1: {
        total_kills: 0,
        players: ['Isgalamido'],
        kills: {},
      },
    },
    {
      game_2: {
        total_kills: 11,
        players: ['Dono da Bola', 'Isgalamido', 'Mocinha'],
        kills: {
          Isgalamido: -7,
        },
      },
    },
    {
      game_3: {
        total_kills: 4,
        players: ['Dono da Bola', 'Isgalamido', 'Mocinha', 'Zeh'],
        kills: {
          Isgalamido: 1,
          Zeh: -2,
          'Dono da Bola': -1,
        },
      },
    },
  ];

  let controller: GameController;
  const gameFileParserServiceMock: IGameService = {
    create: jest.fn().mockReturnValue(Promise.resolve(gamesMocked.length)),
    getAll: jest.fn().mockReturnValue(Promise.resolve(gamesMocked)),
    getById: jest.fn().mockReturnValue(Promise.resolve(gamesMocked[0])),
  };

  beforeEach(async () => {
    controller = new GameController(gameFileParserServiceMock);
  });

  describe('create', () => {
    it('should create games', async () => {
      const actualResult = await controller.create();
      expect(actualResult).toStrictEqual(gamesMocked.length);
    });
  });

  describe('getAll', () => {
    it('should return an array of games', async () => {
      const queryRequest = {
        limit: 1,
        offset: 5,
      } as GameDto;

      const actualResult = await controller.getAll(queryRequest);
      expect(actualResult).toStrictEqual(gamesMocked);
    });
  });

  describe('getById', () => {
    it('should return a game when exists', async () => {
      const actualResult = await controller.getById(null, 1);
      expect(actualResult).toStrictEqual(gamesMocked[0]);
    });

    it('should return no content when not found', async () => {
      const mockedService = {
        create: jest.fn().mockReturnValue(Promise.resolve(gamesMocked.length)),
        getAll: jest.fn().mockReturnValue(Promise.resolve(gamesMocked)),
        getById: jest.fn().mockReturnValue(Promise.resolve(null)),
      };
      controller = new GameController(mockedService);

      const res = {
        status: jest.fn(() => undefined),
      } as unknown as Response;

      const actualResult = await controller.getById(res, 1);
      expect(actualResult).toStrictEqual(undefined);
    });
  });
});
