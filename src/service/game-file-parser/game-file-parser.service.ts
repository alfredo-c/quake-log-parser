import { Injectable } from '@nestjs/common';
/* eslint-disable */
const lineByLine = require('n-readlines');
import { Game } from '../../domain/game.entity';
import { IGameService } from '../../domain/service/i-game-service/i-game-service.interface';
import { GameLine, LineType } from '../../domain/gameLine.entity';

@Injectable()
export class GameFileParserService implements IGameService {
  private readonly GAME_LOG_PATH = 'assets/games.txt';
  private currentGame: Game = new Game();

  async getAll(): Promise<[string, Game][]> {
    return this.processLogFile();
  }

  async getById(gameId: number): Promise<[string, Game]> {
    const games = await this.processLogFile();
    if (games.length >= gameId) {
      return games[gameId - 1];
    }
    return null;
  }

  private async processLogFile(): Promise<[string, Game][]> {
    const arrGames = [];
    const liner = new lineByLine(this.GAME_LOG_PATH);

    let line;
    while ((line = liner.next())) {
      const gameLine = new GameLine(line.toString('ascii'));

      this.ProcessLineGame(gameLine);

      if (this.currentGame?.process) {
        arrGames.push(this.currentGame);
        this.currentGame = new Game();
      }
    }

    return Promise.resolve(this.mapResult(arrGames));
  }

  private ProcessLineGame(gameLine: GameLine) {
    switch (gameLine.lineType) {
      case LineType.START:
        this.ProcessLineGameStart();
      case LineType.PLAYER:
      case LineType.KILL:
      case LineType.OTHER:
        break;
    }
  }

  private ProcessLineGameStart() {
    if (this.currentGame) {
      this.currentGame.process = true;
    }
  }

  private mapResult(arrGames: Game[]): [string, Game][] {
    const arrGamesMapped: [string, Game][] = [];

    let gameCount = 1;
    for (const game of arrGames) {
      const gameData = new Map();
      delete game.process;
      gameData.set(`game_${gameCount++}`, game);
      arrGamesMapped.push(Object.fromEntries(gameData));
    }

    return arrGamesMapped;
  }
}
