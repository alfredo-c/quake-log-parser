import { WORLD } from '../domain/const/constants';

export class Game {
  total_kills: number;
  players: string[];
  kills: Map<string, number>;
  process: boolean;

  constructor() {
    this.total_kills = 0;
    this.players = [];
    this.kills = new Map();
    this.process = false;
  }

  addPlayer(playerName: string) {
    if (!playerName) {
      return;
    }
    if (WORLD === playerName) {
      return;
    }

    if (this.players) {
      const set = new Set(this.players);
      set.add(playerName);
      this.players = [...set].sort();
    } else {
      this.players = [playerName];
    }
  }

  processKill(playerKill: string, playerKilled: string) {
    this.total_kills += 1;
    if (WORLD === playerKill) {
      this.subtractKill(playerKilled);
    } else {
      this.addKill(playerKill);
    }
  }

  addKill(playerKill: string) {
    const killsFromPlayer = this.kills.get(playerKill) ?? 0;
    this.kills.set(playerKill, killsFromPlayer + 1);
  }

  subtractKill(playerKilled: string) {
    const killsFromPlayer = this.kills.get(playerKilled) ?? 0;
    this.kills.set(playerKilled, killsFromPlayer - 1);
  }
}
