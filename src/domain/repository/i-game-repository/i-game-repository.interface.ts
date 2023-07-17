import { Game } from '../../../domain/entity/game.entity';

export interface IGameRepository {
  create(gameId: number, game: Game): Promise<void>;
  getById(gameId: number): Promise<Game>;
}

export const IGameRepository = Symbol('IGameRepository');
