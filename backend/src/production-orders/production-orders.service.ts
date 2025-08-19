import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateProductionOrderDto } from './dto/create-production-order.dto';

export type OrderStatus = 'planned' | 'scheduled' | 'in_progress' | 'completed';

export interface ProductionOrder {
  id: string;
  reference: string;
  product: string;
  quantity: number;
  dueDate: string;
  status: OrderStatus;
  createdAt: string;
}

@Injectable()
export class ProductionOrdersService {
  private orders: ProductionOrder[] = [];

  create(dto: CreateProductionOrderDto): ProductionOrder {
    const order: ProductionOrder = {
      id: uuid(),
      ...dto,
      status: 'planned',
      createdAt: new Date().toISOString(),
    };
    this.orders.push(order);
    return order;
  }

  findAll(status?: OrderStatus): ProductionOrder[] {
    if (status) return this.orders.filter((o) => o.status === status);
    return this.orders;
  }
}
