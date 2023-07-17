import { IGameRepository } from '../../domain/repository/i-game-repository/i-game-repository.interface';
import { GameFileParserService } from './game-file-parser.service';
import { GameDto } from '../../api/game/game.dto';

jest.mock('n-readlines', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
      return {
        next: jest.fn()
          .mockReturnValueOnce('  0:00 ------------------------------------------------------------')
          .mockReturnValueOnce('  0:00 InitGame: \sv_floodProtect\\1\sv_maxPing\0\sv_minPing\0\sv_maxRate\ocol\\68\mapname\q3dm17\gamename\baseq3\g_needpass\0')
          .mockReturnValueOnce(' 15:00 Exit: Timelimit hit.')
          .mockReturnValueOnce(' 20:34 ClientConnect: 2')
          .mockReturnValueOnce(' 20:34 ClientUserinfoChanged: 2 n\\\Isgalamido\\t\\0\\model\\xian/default\hmode')
          .mockReturnValueOnce(' 20:37 ClientUserinfoChanged: 2 n\\\Isgalamido\\t\\0\\model\\uriel/zael\hmodel\\')
          .mockReturnValueOnce(' 20:37 ClientBegin: 2')
          .mockReturnValueOnce(' 20:37 ShutdownGame:')
          .mockReturnValueOnce(' 20:37 ------------------------------------------------------------')
          .mockReturnValueOnce(' 20:37 ------------------------------------------------------------')
          .mockReturnValueOnce(' 20:37 InitGame: \sv_floodProtect\\1\sv_maxPing\0\sv_minPing\0\sv_maxRate\ Apr 12 2009\protocol\\68\mapname\q3dm17\gamename\baseq3\g_needpass\0')
          .mockReturnValueOnce(' 20:38 ClientConnect: 2')
          .mockReturnValueOnce(' 20:38 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\hmodel\\')
          .mockReturnValueOnce(' 20:38 ClientBegin: 2')
          .mockReturnValueOnce(' 20:40 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 20:40 Item: 2 ammo_rockets')
          .mockReturnValueOnce(' 20:42 Item: 2 item_armor_body')
          .mockReturnValueOnce(' 20:54 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT')
          .mockReturnValueOnce(' 20:59 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 21:04 Item: 2 ammo_shells')
          .mockReturnValueOnce(' 21:07 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT')
          .mockReturnValueOnce(' 21:10 ClientDisconnect: 2')
          .mockReturnValueOnce(' 21:15 ClientConnect: 2')
          .mockReturnValueOnce(' 21:15 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\hmodel\\')
          .mockReturnValueOnce(' 21:17 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model\\uriel/zael\hmodel\\')
          .mockReturnValueOnce(' 21:17 ClientBegin: 2')
          .mockReturnValueOnce(' 21:18 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 21:21 Item: 2 item_armor_body')
          .mockReturnValueOnce(' 21:32 Item: 2 item_health_large')
          .mockReturnValueOnce(' 21:33 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 21:34 Item: 2 ammo_rockets')
          .mockReturnValueOnce(' 21:42 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT')
          .mockReturnValueOnce(' 21:49 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 21:51 ClientConnect: 3')
          .mockReturnValueOnce(' 21:51 ClientUserinfoChanged: 3 n\\Dono da Bola\\t\\0\\model\\sarge/krusade\hm')
          .mockReturnValueOnce(' 21:53 ClientUserinfoChanged: 3 n\\Mocinha\\t\\0\\model\\sarge\hmodel\sarge\g_')
          .mockReturnValueOnce(' 21:53 ClientBegin: 3')
          .mockReturnValueOnce(' 22:04 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 22:04 Item: 2 ammo_rockets')
          .mockReturnValueOnce(' 22:06 Kill: 2 3 7: Isgalamido killed Mocinha by MOD_ROCKET_SPLASH')
          .mockReturnValueOnce(' 22:11 Item: 2 item_quad')
          .mockReturnValueOnce(' 22:11 ClientDisconnect: 3')
          .mockReturnValueOnce(' 22:18 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH')
          .mockReturnValueOnce(' 22:26 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 22:27 Item: 2 ammo_rockets')
          .mockReturnValueOnce(' 22:40 Kill: 2 2 7: Isgalamido killed Isgalamido by MOD_ROCKET_SPLASH')
          .mockReturnValueOnce(' 22:43 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 22:45 Item: 2 item_armor_body')
          .mockReturnValueOnce(' 23:06 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT')
          .mockReturnValueOnce(' 23:09 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 23:10 Item: 2 ammo_rockets')
          .mockReturnValueOnce(' 23:25 Item: 2 item_health_large')
          .mockReturnValueOnce(' 23:30 Item: 2 item_health_large')
          .mockReturnValueOnce(' 23:32 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 23:35 Item: 2 item_armor_body')
          .mockReturnValueOnce(' 23:36 Item: 2 ammo_rockets')
          .mockReturnValueOnce(' 23:37 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 23:40 Item: 2 item_armor_shard')
          .mockReturnValueOnce(' 23:40 Item: 2 item_armor_shard')
          .mockReturnValueOnce(' 23:40 Item: 2 item_armor_shard')
          .mockReturnValueOnce(' 23:40 Item: 2 item_armor_combat')
          .mockReturnValueOnce(' 23:43 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 23:57 Item: 2 weapon_shotgun')
          .mockReturnValueOnce(' 23:58 Item: 2 ammo_shells')
          .mockReturnValueOnce(' 24:13 Item: 2 item_armor_shard')
          .mockReturnValueOnce(' 24:13 Item: 2 item_armor_shard')
          .mockReturnValueOnce(' 24:13 Item: 2 item_armor_shard')
          .mockReturnValueOnce(' 24:13 Item: 2 item_armor_combat')
          .mockReturnValueOnce(' 24:16 Item: 2 item_health_large')
          .mockReturnValueOnce(' 24:18 Item: 2 ammo_rockets')
          .mockReturnValueOnce(' 24:19 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 24:22 Item: 2 item_armor_body')
          .mockReturnValueOnce(' 24:24 Item: 2 ammo_rockets')
          .mockReturnValueOnce(' 24:24 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 24:36 Item: 2 item_health_large')
          .mockReturnValueOnce(' 24:43 Item: 2 item_health_mega')
          .mockReturnValueOnce(' 25:05 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT')
          .mockReturnValueOnce(' 25:09 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 25:09 Item: 2 ammo_rockets')
          .mockReturnValueOnce(' 25:11 Item: 2 item_armor_body')
          .mockReturnValueOnce(' 25:18 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT')
          .mockReturnValueOnce(' 25:21 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 25:22 Item: 2 ammo_rockets')
          .mockReturnValueOnce(' 25:34 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 25:41 Kill: 1022 2 19: <world> killed Isgalamido by MOD_FALLING')
          .mockReturnValueOnce(' 25:50 Item: 2 item_armor_combat')
          .mockReturnValueOnce(' 25:52 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT')
          .mockReturnValueOnce(' 25:54 Item: 2 ammo_rockets')
          .mockReturnValueOnce(' 25:55 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 25:55 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 25:59 Item: 2 item_armor_shard')
          .mockReturnValueOnce(' 25:59 Item: 2 item_armor_shard')
          .mockReturnValueOnce(' 26:05 Item: 2 item_armor_shard')
          .mockReturnValueOnce(' 26:05 Item: 2 item_armor_shard')
          .mockReturnValueOnce(' 26:05 Item: 2 item_armor_shard')
          .mockReturnValueOnce(' 26:09 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce(' 26  0:00 ------------------------------------------------------------')
          .mockReturnValueOnce('  0:00 InitGame: \sv_floodProtect\\1\sv_maxPing\0\sv_minPing\0\sv_maxRate\ocol\\68\mapname\q3dm17\gamename\baseq3\g_needpass\0')
          .mockReturnValueOnce('  0:25 ClientConnect: 2')
          .mockReturnValueOnce('  0:25 ClientUserinfoChanged: 2 n\\Dono da Bola\\t\\0\\model\\sarge/krusade\hm')
          .mockReturnValueOnce('  0:27 ClientUserinfoChanged: 2 n\\Mocinha\\t\\0\\model\\sarge\hmodel\sarge\g_')
          .mockReturnValueOnce('  0:27 ClientBegin: 2')
          .mockReturnValueOnce('  0:29 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce('  0:35 Item: 2 item_armor_shard')
          .mockReturnValueOnce('  0:35 Item: 2 item_armor_shard')
          .mockReturnValueOnce('  0:35 Item: 2 item_armor_shard')
          .mockReturnValueOnce('  0:35 Item: 2 item_armor_combat')
          .mockReturnValueOnce('  0:38 Item: 2 item_armor_shard')
          .mockReturnValueOnce('  0:38 Item: 2 item_armor_shard')
          .mockReturnValueOnce('  0:38 Item: 2 item_armor_shard')
          .mockReturnValueOnce('  0:55 Item: 2 item_health_large')
          .mockReturnValueOnce('  0:56 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce('  0:57 Item: 2 ammo_rockets')
          .mockReturnValueOnce('  0:59 ClientConnect: 3')
          .mockReturnValueOnce('  0:59 ClientUserinfoChanged: 3 n\\Isgalamido\\t\\0\\model\\xian/default\hmode')
          .mockReturnValueOnce('  1:01 ClientUserinfoChanged: 3 n\\Isgalamido\\t\\0\\model\\uriel/zael\hmodel\\')
          .mockReturnValueOnce('  1:01 ClientBegin: 3')
          .mockReturnValueOnce('  1:02 Item: 3 weapon_rocketlauncher')
          .mockReturnValueOnce('  1:04 Item: 2 item_armor_shard')
          .mockReturnValueOnce('  1:04 Item: 2 item_armor_shard')
          .mockReturnValueOnce('  1:04 Item: 2 item_armor_shard')
          .mockReturnValueOnce('  1:06 ClientConnect: 4')
          .mockReturnValueOnce('  1:06 ClientUserinfoChanged: 4 n\\Zeh\\t\\0\\model\\sarge/default\hmodel\sarg')
          .mockReturnValueOnce('  1:08 Kill: 3 2 6: Isgalamido killed Mocinha by MOD_ROCKET')
          .mockReturnValueOnce('  1:08 ClientUserinfoChanged: 4 n\\Zeh\\t\\0\\model\\sarge/default\hmodel\sarg')
          .mockReturnValueOnce('  1:08 ClientBegin: 4')
          .mockReturnValueOnce('  1:10 Item: 3 item_armor_shard')
          .mockReturnValueOnce('  1:10 Item: 3 item_armor_shard')
          .mockReturnValueOnce('  1:10 Item: 3 item_armor_shard')
          .mockReturnValueOnce('  1:10 Item: 3 item_armor_combat')
          .mockReturnValueOnce('  1:11 Item: 4 weapon_shotgun')
          .mockReturnValueOnce('  1:11 Item: 4 ammo_shells')
          .mockReturnValueOnce('  1:16 Item: 4 item_health_large')
          .mockReturnValueOnce('  1:18 Item: 4 weapon_rocketlauncher')
          .mockReturnValueOnce('  1:18 Item: 4 ammo_rockets')
          .mockReturnValueOnce('  1:26 Kill: 1022 4 22: <world> killed Zeh by MOD_TRIGGER_HURT')
          .mockReturnValueOnce('  1:26 ClientUserinfoChanged: 2 n\\Dono da Bola\\t\\0\\model\\sarge\hmodel\sar')
          .mockReturnValueOnce('  1:26 Item: 3 weapon_railgun')
          .mockReturnValueOnce('  1:29 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce('  1:29 Item: 3 weapon_railgun')
          .mockReturnValueOnce('  1:32 Item: 3 weapon_railgun')
          .mockReturnValueOnce('  1:32 Kill: 1022 4 22: <world> killed Zeh by MOD_TRIGGER_HURT')
          .mockReturnValueOnce('  1:35 Item: 2 item_armor_shard')
          .mockReturnValueOnce('  1:35 Item: 2 item_armor_shard')
          .mockReturnValueOnce('  1:35 Item: 2 item_armor_shard')
          .mockReturnValueOnce('  1:35 Item: 3 weapon_railgun')
          .mockReturnValueOnce('  1:38 Item: 2 item_health_large')
          .mockReturnValueOnce('  1:38 Item: 3 weapon_railgun')
          .mockReturnValueOnce('  1:41 Kill: 1022 2 19: <world> killed Dono da Bola by MOD_FALLING')
          .mockReturnValueOnce('  1:41 Item: 3 weapon_railgun')
          .mockReturnValueOnce('  1:43 Item: 2 ammo_rockets')
          .mockReturnValueOnce('  1:44 Item: 2 weapon_rocketlauncher')
          .mockReturnValueOnce('  1:46 Item: 2 item_armor_shard')
          .mockReturnValueOnce('  1:47 Item: 2 item_armor_shard')
          .mockReturnValueOnce('  1:47 Item: 2 item_armor_shard')
          .mockReturnValueOnce('  1:47 ShutdownGame:')
          .mockReturnValueOnce('  1:47 ------------------------------------------------------------')
      }
    })
  }
})

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
    const result = await service.create();

    const game1 = {
      total_kills: 0,
      players: ['Isgalamido'],
      kills: new Map(),
      process: true
    }
    const killGame2 = new Map();
    killGame2.set('Isgalamido', -7);
    const killGame3 = new Map();
    killGame3.set('Isgalamido', 1);
    killGame3.set('Zeh', -2);
    killGame3.set('Dono da Bola', -1);
    const game2 = {
      total_kills: 11,
      players: ['Dono da Bola', 'Isgalamido', 'Mocinha'],
      kills: killGame2,
      process: true
    }
    const game3 = {
      total_kills: 4,
      players: ['Dono da Bola', 'Isgalamido', 'Mocinha', 'Zeh'],
      kills: killGame3,
      process: false
    }

    expect(result).toEqual(3);
    expect(repo).toHaveBeenCalledWith(1, game1);
    expect(repo).toHaveBeenCalledWith(2, game2);
    expect(repo).toHaveBeenCalledWith(3, game3);
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
