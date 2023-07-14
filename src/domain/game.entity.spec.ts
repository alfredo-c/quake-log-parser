import { Game } from "../domain/game.entity";


describe('Game', () => {

  describe('addPlayer', () => {

    const realPlayer = 'Dono da bola'
    const anotherRealPlayer = 'Isgalamido'
    const thirdRealPlayer = 'Zeh'
    const world = '<world>'

    it('should initialize array when empty and real player', () => {
      const game = new Game()
      game.addPlayer(realPlayer)
      expect(game.players).toStrictEqual([realPlayer])
    });

    it('should sort names and not duplicate an item on array when already have the player name', () => {
      const game = new Game()
      game.addPlayer(thirdRealPlayer)
      game.addPlayer(realPlayer)
      game.addPlayer(anotherRealPlayer)
      game.addPlayer(realPlayer)
      game.addPlayer(thirdRealPlayer)
      game.addPlayer(realPlayer)
      game.addPlayer(anotherRealPlayer)
      game.addPlayer(realPlayer)
      console.log(game.players)
      expect(game.players).toStrictEqual([realPlayer, anotherRealPlayer, thirdRealPlayer])
    });

    it('should not initialize array when empty and world', () => {
      const game = new Game()
      game.addPlayer(world)
      expect(game.players).toBe(undefined)
    });

  });

});
