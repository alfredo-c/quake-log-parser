import { Injectable } from '@nestjs/common';
import { Game } from 'src/domain/game.entity';
import { IGameService } from '../../domain/service/i-game-service/i-game-service.interface';

@Injectable()
export class GameFileParserService implements IGameService {
  getAll(): Promise<Game[]> {
    const map = new Map();
    map.set('Dono da bola', 5);
    map.set('Isgalamido', 18);
    map.set('Zeh', 20);
    return Promise.resolve([
      {
        totalKills: 45,
        players: ['Dono da bola', 'Isgalamido', 'Zeh'],
        kills: map,
      },
      {
        totalKills: 45,
        players: ['Dono da bola', 'Isgalamido', 'Zeh'],
        kills: map,
      },
    ]);
  }

  getById(gameId: number): Promise<Game> {
    console.log(gameId);
    const map = new Map();
    map.set('Dono da bola', 5);
    map.set('Isgalamido', 18);
    map.set('Zeh', 20);
    const obj = Object.fromEntries(map);
    return Promise.resolve({
      totalKills: 45,
      players: ['Dono da bola', 'Isgalamido', 'Zeh'],
      kills: obj,
    });
  }
}
