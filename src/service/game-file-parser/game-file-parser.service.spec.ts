import { GameDto } from '../../api/game/game.dto';
import { IGameRepository } from '../../domain/repository/i-game-repository/i-game-repository.interface';
import { GameFileParserService } from './game-file-parser.service';

describe('GameFileParserService', () => {
  const game = {
    total_kills: 0,
    players: ['Isgalamido'],
    kills: {},
  };
  const gamesMocked = [
    {
      game_1: game,
    },
    {
      game_2: game,
    },
    {
      game_3: game,
    },
  ];
  const killGame2 = new Map();
  killGame2.set('Isgalamido', -7);
  const killGame3 = new Map();
  killGame3.set('Isgalamido', 1);
  killGame3.set('Zeh', -2);
  killGame3.set('Dono da Bola', -1);
  const createGameMock = [
    {
      total_kills: 0,
      players: ['Isgalamido'],
      kills: new Map(),
      process: true,
    },
    {
      total_kills: 11,
      players: ['Dono da Bola', 'Isgalamido', 'Mocinha'],
      kills: killGame2,
      process: true,
    },
    {
      total_kills: 4,
      players: ['Dono da Bola', 'Isgalamido', 'Mocinha', 'Zeh'],
      kills: killGame3,
      process: false,
    },
  ];

  let service: GameFileParserService;
  const gameRepositoryMock: IGameRepository = {
    create: jest.fn().mockReturnValue(Promise.resolve()),
    getById: jest.fn().mockReturnValue(Promise.resolve(game)),
  };

  beforeEach(async () => {
    service = new GameFileParserService(gameRepositoryMock);
  });

  it('should create log games', async () => {
    const mockedRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve()),
      getById: jest.fn().mockReturnValue(Promise.resolve()),
    };
    const repo = jest.spyOn(mockedRepository, 'create');
    service = new GameFileParserService(mockedRepository);
    service.setLogGamePath('assets/games-test.txt');
    const result = await service.create();
    expect(result).toEqual(3);
    expect(repo).toHaveBeenCalledWith(1, createGameMock[0]);
    expect(repo).toHaveBeenCalledWith(2, createGameMock[1]);
    expect(repo).toHaveBeenCalledWith(3, createGameMock[2]);
  });

  it('should get first game when pass default query params', async () => {
    const result = await service.getAll(new GameDto());
    expect(result.length).toEqual(1);
    expect(result).toStrictEqual([gamesMocked[0]]);
  });

  it('should get games accordingly with limit and offset params ', async () => {
    const result = await service.getAll({ limit: 2, offset: 1 });
    expect(result.length).toEqual(2);
    expect(result).toStrictEqual([gamesMocked[0], gamesMocked[1]]);
  });

  it('should get game by id', async () => {
    const result = await service.getById(1);
    expect(result).toStrictEqual(gamesMocked[0]);
  });

  it('should get null with game not found', async () => {
    const mockedRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve()),
      getById: jest.fn().mockReturnValue(Promise.resolve()),
    };
    service = new GameFileParserService(mockedRepository);

    const result = await service.getById(4);
    expect(result).toStrictEqual(undefined);
  });
});
