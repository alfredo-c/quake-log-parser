import { Injectable } from '@nestjs/common';
import Reader from 'n-readlines';
import { Game } from '../../domain/game.entity';
import { IGameService } from '../../domain/service/i-game-service/i-game-service.interface';
import { GameLine } from '../../domain/gameLine.entity';
import { LineType } from '../../domain/enum/line-type.enum';

@Injectable()
export class GameFileParserService implements IGameService {
  private readonly GAME_LOG_PATH = 'assets/games.txt';
  private currentGame: Game;
  private arrGames: Game[];

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

  private async processLogFile (): Promise<[string, Game][]> {
    this.arrGames = []
    this.currentGame = null;
    const liner = new Reader(this.GAME_LOG_PATH);

    let line: false | Buffer;
    while ((line = liner.next())) {
      const gameLine = new GameLine(line.toString('ascii'));

      this.processLineGame(gameLine);

      if (this.currentGame?.process) {
        this.closeGame();
      }
    }
    this.checkLastGame();

    return Promise.resolve(this.mapResult(this.arrGames));
  }

  checkLastGame() {
    if (this.currentGame && !this.currentGame.process) {
      this.closeGame();
    }
  }

  closeGame() {
    this.arrGames.push(this.currentGame);
    this.currentGame = new Game();
  }

  private processLineGame(gameLine: GameLine) {
    switch (gameLine.lineType) {
      case LineType.START:
        this.processLineGameStart();
        break;
      case LineType.PLAYER:
        this.processLineGamePlayer(gameLine);
        break;
      case LineType.KILL:
        this.processLineGameKill(gameLine);
        break;
      case LineType.OTHER:
        break;
    }
  }

  private processLineGameStart() {
    if (this.currentGame) {
      this.currentGame.process = true;
    } else {
      this.currentGame = new Game();
    }
  }

  private processLineGamePlayer(gameLine: GameLine) {
    this.currentGame.addPlayer(gameLine.playerName);
  }

  private processLineGameKill(gameLine: GameLine) {
    this.currentGame.processKill(gameLine.playerKill, gameLine.playerKilled);
  }

  private mapResult(arrGames: Game[]): [string, Game][] {
    const arrGamesMapped: [string, Game][] = [];

    let gameCount = 1;
    for (const game of arrGames) {
      const gameData = new Map();
      delete game.process;
      const mappedGame = {
        ...game,
        kills: Object.fromEntries(game.kills),
      };
      gameData.set(`game_${gameCount++}`, mappedGame);
      arrGamesMapped.push(Object.fromEntries(gameData));
    }

    return arrGamesMapped;
  }
}
