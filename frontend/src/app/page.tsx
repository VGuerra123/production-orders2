"use client";
import { useEffect, useState } from 'react';
import { Form, Input, InputNumber, DatePicker, Button, Table, message } from 'antd';
import { createOrder, getOrders, ProductionOrder } from '../lib/api';
import dayjs from 'dayjs';

export default function Home() {
  const [orders, setOrders] = useState<ProductionOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setOrders(await getOrders());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onFinish = async (values: any) => {
    try {
      await createOrder({
        reference: values.reference,
        product: values.product,
        quantity: values.quantity,
        dueDate: values.dueDate.toISOString(),
      });
      message.success('Order created!');
      load();
    } catch {
      message.error('Failed to create order');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Production Orders</h1>
      <Form layout="inline" onFinish={onFinish}>
        <Form.Item name="reference" rules={[{ required: true }]}>
          <Input placeholder="Reference" />
        </Form.Item>
        <Form.Item name="product" rules={[{ required: true }]}>
          <Input placeholder="Product" />
        </Form.Item>
        <Form.Item name="quantity" rules={[{ required: true, type: 'number', min: 1 }]}>
          <InputNumber placeholder="Quantity" />
        </Form.Item>
        <Form.Item name="dueDate" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
        <Button type="primary" htmlType="submit">Add Order</Button>
      </Form>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={orders}
        columns={[
          { title: 'Reference', dataIndex: 'reference' },
          { title: 'Product', dataIndex: 'product' },
          { title: 'Quantity', dataIndex: 'quantity' },
          { title: 'Due Date', dataIndex: 'dueDate', render: (d) => dayjs(d).format('YYYY-MM-DD') },
          { title: 'Status', dataIndex: 'status' },
        ]}
        style={{ marginTop: 20 }}
      />
    </div>
  );
}
