import { GameServiceInput } from '../../../domain/service/i-game-service/game-service-input';
import { Game } from '../../../domain/entity/game.entity';

export interface IGameService {
  create(): Promise<number>;
  getAll(input: GameServiceInput): Promise<[string, Game][]>;
  getById(gameId: number): Promise<[string, Game]>;
}

export const IGameService = Symbol('IGameService');
