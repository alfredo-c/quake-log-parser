import { Game } from 'src/domain/game.entity';

export interface IGameService {
  getAll(): Promise<[string, Game][]>;
  getById(gameId: number): Promise<[string, Game]>;
}

export const IGameService = Symbol('IGameService');
