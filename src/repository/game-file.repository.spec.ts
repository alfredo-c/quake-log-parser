import { GameFileRepository } from '../repository/game-file.repository';
import { Game } from '../domain/entity/game.entity';

describe('GameFileRepository', () => {
  const kills = new Map();
  kills.set('Isgalamido', -7);

  const game = new Game();
  game.total_kills = 11;
  game.players = ['Dono da Bola', 'Isgalamido', 'Mocinha'];
  game.kills = kills;
  game.process = true;

  const repo = new GameFileRepository();
  repo.setLogGamePath('assets/games-test/');

  it('should create game on json file', async () => {
    await repo.create(21, game);
  });

  it('should read a game from json file', async () => {
    const gameFromFile = await repo.getById(21);
    expect(gameFromFile).toStrictEqual({
      total_kills: 11,
      players: ['Dono da Bola', 'Isgalamido', 'Mocinha'],
      kills: { Isgalamido: -7 },
    });
  });

  it('should return undefined when game does not exists', async () => {
    const gameFromFile = await repo.getById(22);
    expect(gameFromFile).toBe(undefined);
  });
});
