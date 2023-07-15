import { GameLine } from '../domain/gameLine.entity';

describe('GameLine', () => {
  describe('playerLine', () => {
    const playerLine =
      ' 20:34 ClientUserinfoChanged: 2 n\\Isgalamido\\t\\0\\model';

    it('should set player name from line that has player info', () => {
      const gameLine = new GameLine(playerLine);
      expect(gameLine.playerName).toBe('Isgalamido');
    });
  });

  describe('killLine', () => {
    const killLineByWord =
      ' 11:19 Kill: 1022 8 22: <world> killed Mal by MOD_TRIGGER_HURT';
    const killLineByPlayer =
      ' 11:16 Kill: 6 3 10: Chessus killed Dono da Bola by MOD_RAILGUN';

    it('should set world kill and player killed', () => {
      const gameLine = new GameLine(killLineByWord);
      expect(gameLine.playerName).toBe(undefined);
      expect(gameLine.playerKill).toBe('<world>');
      expect(gameLine.playerKilled).toBe('Mal');
    });

    it('when a real player kill should set player name and not player killed', () => {
      const gameLine = new GameLine(killLineByPlayer);
      expect(gameLine.playerName).toBe(undefined);
      expect(gameLine.playerKill).toBe('Chessus');
      expect(gameLine.playerKilled).toBe('Dono da Bola');
    });
  });
});
