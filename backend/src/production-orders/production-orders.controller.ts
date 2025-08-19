import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductionOrdersService } from './production-orders.service';
import type { OrderStatus } from './production-orders.service'; 
import { CreateProductionOrderDto } from './dto/create-production-order.dto';

@Controller('production-orders')
export class ProductionOrdersController {
  constructor(private readonly service: ProductionOrdersService) {}

  @Post()
  create(@Body() dto: CreateProductionOrderDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('status') status?: OrderStatus) {
    return this.service.findAll(status);
  }
}
