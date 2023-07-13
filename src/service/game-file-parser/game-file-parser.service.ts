import { Injectable } from '@nestjs/common';
import { Game } from 'src/domain/game.entity';
import { IGameService } from '../../domain/service/i-game-service/i-game-service.interface';

@Injectable()
export class GameFileParserService implements IGameService {
  async getAll(): Promise<[string, Game][]> {
    return this.processLogFile();
  }

  async getById(gameId: number): Promise<[string, Game]> {
    console.log(gameId);
    const games = await this.processLogFile();
    if (games.length >= gameId) {
      return games[gameId - 1];
    }
    return null;
  }

  private async processLogFile(): Promise<[string, Game][]> {
    const map = new Map();
    map.set('Dono da bola', 5);
    map.set('Isgalamido', 18);
    map.set('Zeh', 20);
    const obj = Object.fromEntries(map);
    const gameData: Game = {
      total_kills: 45,
      players: ['Dono da bola', 'Isgalamido', 'Zeh'],
      kills: obj,
    };
    const arrGames = [gameData, gameData, gameData];

    return Promise.resolve(this.mapResult(arrGames));
  }

  private mapResult(arrGames: Game[]): [string, Game][] {
    const arrGamesMapped: [string, Game][] = [];

    let gameCount = 1;
    for (const game of arrGames) {
      const gameData = new Map();
      gameData.set(`game_${gameCount++}`, game);
      arrGamesMapped.push(Object.fromEntries(gameData));
    }

    return arrGamesMapped;
  }
}
