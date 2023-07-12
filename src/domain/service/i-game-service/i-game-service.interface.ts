import { Game } from 'src/domain/game.entity';

export interface IGameService {
  getAll(): Promise<Game[]>;
  getById(gameId: number): Promise<Game>;
}

export const IGameService = Symbol('IGameService');
