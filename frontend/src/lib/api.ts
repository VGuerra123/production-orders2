import axios from 'axios';

export interface ProductionOrder {
  id: string;
  reference: string;
  product: string;
  quantity: number;
  dueDate: string;
  status: string;
  createdAt: string;
}

const api = axios.create({ baseURL: 'http://localhost:3001/api' });

export const createOrder = (data: Omit<ProductionOrder, 'id'|'status'|'createdAt'>) =>
  api.post<ProductionOrder>('/production-orders', data).then(r => r.data);

export const getOrders = () =>
  api.get<ProductionOrder[]>('/production-orders').then(r => r.data);
