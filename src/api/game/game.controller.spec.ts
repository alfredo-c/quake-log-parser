import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { IGameService } from '../../domain/service/i-game-service/i-game-service.interface';
import { GameFileParserService } from '../../service/game-file-parser/game-file-parser.service';

describe('GameController', () => {
  let controller: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [
        {
          provide: IGameService,
          useClass: GameFileParserService,
        },
      ],
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
