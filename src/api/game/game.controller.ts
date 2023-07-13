import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Game } from 'src/domain/game.entity';
import { IGameService } from '../../domain/service/i-game-service/i-game-service.interface';

@Controller('game')
export class GameController {
  constructor(
    @Inject(IGameService) private readonly gameUseCase: IGameService,
  ) {}

  @Get()
  async getAll(): Promise<[string, Game][]> {
    return this.gameUseCase.getAll();
  }

  @Get(':id')
  async getById(
    @Res({ passthrough: true }) res: Response,
    @Param() params: any,
  ): Promise<[string, Game]> {
    const result = await this.gameUseCase.getById(params.id);
    if (result) {
      return result;
    }

    res.status(HttpStatus.NO_CONTENT);
  }
}
