import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { Game } from '../../domain/entity/game.entity';
import { IGameService } from '../../domain/service/i-game-service/i-game-service.interface';
import { GameDto } from '../../api/game/game.dto';

@Controller('game')
export class GameController {
  constructor(
    @Inject(IGameService) private readonly gameService: IGameService,
  ) {}

  @Post()
  async create(): Promise<number> {
    return this.gameService.create();
  }

  @Get()
  async getAll(@Query() query: GameDto): Promise<[string, Game][]> {
    return this.gameService.getAll({ ...query });
  }

  @Get(':id')
  async getById(
    @Res({ passthrough: true }) res: Response,
    @Param() params: any,
  ): Promise<[string, Game]> {
    const result = await this.gameService.getById(params.id);
    if (result) {
      return result;
    }

    res.status(HttpStatus.NO_CONTENT);
  }
}
