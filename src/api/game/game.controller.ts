import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Game } from 'src/domain/game.entity';
import { IGameService } from '../../domain/service/i-game-service/i-game-service.interface';

@Controller('game')
export class GameController {
  constructor(
    @Inject(IGameService) private readonly gameUseCase: IGameService,
  ) {}

  @Get()
  async getAll(): Promise<Game[]> {
    return this.gameUseCase.getAll();
  }

  @Get(':id')
  async getById(@Param() params: any): Promise<Game> {
    return this.gameUseCase.getById(params.id);
  }
}
