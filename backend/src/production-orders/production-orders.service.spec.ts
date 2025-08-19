import { ProductionOrdersService } from './production-orders.service';

describe('ProductionOrdersService', () => {
  it('should create and list orders', () => {
    const service = new ProductionOrdersService();
    service.create({ reference: 'R1', product: 'Widget', quantity: 10, dueDate: '2025-12-31' });
    const orders = service.findAll();
    expect(orders.length).toBe(1);
    expect(orders[0].reference).toBe('R1');
  });
});
