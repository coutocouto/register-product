import { IsDecimal, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @Min(0)
  @Max(9999999)
  @IsNotEmpty()
  @IsDecimal()
  price: number;
}
