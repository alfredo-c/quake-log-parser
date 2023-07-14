export class Game {
  total_kills: number;
  players: string[];
  kills: object;
  process?: boolean;

  private readonly WORLD = '<world>'

  addPlayer (playerName: string) {
    if (!playerName || this.WORLD === playerName) {
      return
    }

    if (this.players) {
      const set = new Set(this.players)
      set.add(playerName)
      this.players = [...set].sort()
    } else {
      this.players = [playerName]
    }
  }
}
