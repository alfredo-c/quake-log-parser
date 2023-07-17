import { Game } from './game.entity';

describe('Game', () => {
  const realPlayer = 'Dono da bola';
  const anotherRealPlayer = 'Isgalamido';
  const thirdRealPlayer = 'Zeh';
  const world = '<world>';

  describe('addPlayer', () => {
    it('should initialize array when empty and real player', () => {
      const game = new Game();
      game.addPlayer(realPlayer);
      expect(game.players).toStrictEqual([realPlayer]);
    });

    it('should sort names and not duplicate an item on array when already have the player name', () => {
      const game = new Game();
      game.addPlayer(thirdRealPlayer);
      game.addPlayer(realPlayer);
      game.addPlayer(anotherRealPlayer);
      game.addPlayer(realPlayer);
      game.addPlayer(thirdRealPlayer);
      game.addPlayer(realPlayer);
      game.addPlayer(anotherRealPlayer);
      game.addPlayer(realPlayer);
      expect(game.players).toStrictEqual([
        realPlayer,
        anotherRealPlayer,
        thirdRealPlayer,
      ]);
    });

    it('should return empty array when only World is a player', () => {
      const game = new Game();
      game.addPlayer(world);
      expect(game.players).toStrictEqual([]);
    });
  });

  describe('processKill', () => {
    it('should subtract when <world> kill players', () => {
      const game = new Game();
      game.addPlayer(realPlayer);
      game.processKill(world, realPlayer);
      const expectResult = new Map();
      expectResult.set(realPlayer, -1);
      expect(game.kills).toStrictEqual(expectResult);
    });

    it('should add when player kill another player', () => {
      const game = new Game();
      game.addPlayer(realPlayer);
      game.addPlayer(anotherRealPlayer);
      game.processKill(realPlayer, anotherRealPlayer);
      game.processKill(realPlayer, realPlayer);
      game.processKill(anotherRealPlayer, anotherRealPlayer);
      const expectResult = new Map();
      expectResult.set(realPlayer, 1);
      expect(game.kills).toStrictEqual(expectResult);
    });
  });
});
