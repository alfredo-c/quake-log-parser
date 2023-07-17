import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class GameDto {
  @IsOptional()
  @IsNumber()
  @Max(10)
  @Min(1)
  @Transform(({ value }) => +value)
  public limit = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => +value)
  public offset = 1;
}
