import { Test, TestingModule } from '@nestjs/testing';
import { GameFileParserService } from './game-file-parser.service';

describe('GameFileParserService', () => {
  let service: GameFileParserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameFileParserService],
    }).compile();

    service = module.get<GameFileParserService>(GameFileParserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
