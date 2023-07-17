import { Game } from '../domain/entity/game.entity';
import { IGameRepository } from '../domain/repository/i-game-repository/i-game-repository.interface';
import fs from 'fs';

export class GameFileRepository implements IGameRepository {
  private gameLogPath = 'assets/games/';

  async create(gameId: number, game: Game): Promise<void> {
    delete game.process;
    const mappedGame = {
      ...game,
      kills: Object.fromEntries(game.kills),
    };

    const fileName = this.getFileName(gameId);
    const fileJson = JSON.stringify(mappedGame);
    await fs.promises.writeFile(fileName, fileJson);

    return Promise.resolve();
  }

  async getById(gameId: number): Promise<Game> {
    const fileName = this.getFileName(gameId);

    try {
      const fileJson = await fs.promises.readFile(fileName);

      return JSON.parse(fileJson.toString());
    } catch (err) {
      console.debug('GameFileRepository: NOT FOUND, ', err);
    }
  }

  private getFileName(gameId: number) {
    return `${this.gameLogPath}game_${gameId}.json`;
  }
}
