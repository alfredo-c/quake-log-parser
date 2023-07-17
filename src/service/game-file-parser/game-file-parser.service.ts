import { Inject, Injectable } from '@nestjs/common';
import Reader from 'n-readlines';
import { Game } from '../../domain/entity/game.entity';
import { IGameService } from '../../domain/service/i-game-service/i-game-service.interface';
import { GameLine } from '../../domain/entity/gameLine.entity';
import { LineType } from '../../domain/enum/line-type.enum';
import { GameServiceInput } from '../../domain/service/i-game-service/game-service-input';
import { IGameRepository } from '../../domain/repository/i-game-repository/i-game-repository.interface';

@Injectable()
export class GameFileParserService implements IGameService {
  private gameLogPath = 'assets/games.txt';
  private currentGame: Game;
  private arrGames: Game[];

  constructor(
    @Inject(IGameRepository) private readonly gameRepository: IGameRepository,
  ) {}

  async create(): Promise<number> {
    const games = this.processLogFile();

    let gameCount = 1;
    for (const game of games) {
      await this.gameRepository.create(gameCount++, game);
    }

    return games.length;
  }

  async getAll(input: GameServiceInput): Promise<[string, Game][]> {
    const games = [];

    const total = input.offset + input.limit;
    for (let gameId = input.offset; gameId < total; gameId++) {
      const game = await this.gameRepository.getById(gameId);
      if (game) {
        games.push(game);
      }
    }

    return this.mapResult(input.offset, games);
  }

  async getById(gameId: number): Promise<[string, Game]> {
    const game = await this.gameRepository.getById(gameId);

    if (game) {
      const mappedGame = this.mapResult(gameId, [game]);

      return mappedGame[0];
    }
  }

  private processLogFile(): Game[] {
    this.arrGames = [];
    this.currentGame = null;
    const liner = new Reader(this.gameLogPath);

    let line: false | Buffer;
    while ((line = liner.next())) {
      const gameLine = new GameLine(line.toString('ascii'));

      this.processLineGame(gameLine);

      if (this.currentGame?.process) {
        this.closeGame();
      }
    }
    this.checkLastGame();

    return this.arrGames;
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

  private mapResult(
    firstGameNumber: number,
    arrGames: Game[],
  ): [string, Game][] {
    const arrGamesMapped: [string, Game][] = [];

    let gameCount = firstGameNumber;
    for (const game of arrGames) {
      const gameData = new Map();
      gameData.set(`game_${gameCount++}`, game);
      arrGamesMapped.push(Object.fromEntries(gameData));
    }

    return arrGamesMapped;
  }
}
