import { IsISO8601, IsInt, IsPositive, IsString } from 'class-validator';

export class CreateProductionOrderDto {
  @IsString()
  reference: string;

  @IsString()
  product: string;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsISO8601()
  dueDate: string;
}
