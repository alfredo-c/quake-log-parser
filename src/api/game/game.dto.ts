import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class GameDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Max(10)
  @Min(1)
  @Transform(({ value }) => +value)
  public limit = 1;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => +value)
  public offset = 1;
}
