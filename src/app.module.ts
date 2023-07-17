import { Module } from '@nestjs/common';
import { GameController } from './api/game/game.controller';
import { IGameService } from './domain/service/i-game-service/i-game-service.interface';
import { GameFileParserService } from './service/game-file-parser/game-file-parser.service';
import { IGameRepository } from './domain/repository/i-game-repository/i-game-repository.interface';
import { GameFileRepository } from './repository/game-file.repository';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [
    {
      provide: IGameService,
      useClass: GameFileParserService,
    },
    {
      provide: IGameRepository,
      useClass: GameFileRepository,
    },
  ],
})
export class AppModule {}
