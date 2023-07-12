import { Module } from '@nestjs/common';
import { GameController } from './api/game/game.controller';
import { IGameService } from './domain/service/i-game-service/i-game-service.interface';
import { GameFileParserService } from './service/game-file-parser/game-file-parser.service';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [
    {
      provide: IGameService,
      useClass: GameFileParserService,
    },
  ],
})
export class AppModule {}
