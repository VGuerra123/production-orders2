"use client";
import { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Table,
  message,
  Card,
  Skeleton,
  Tooltip,
} from "antd";
import { createOrder, getOrders, ProductionOrder } from "../lib/api";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "../assets/omniscient-logo.png";
import {
  RocketOutlined,
  BarcodeOutlined,
  ShoppingOutlined,
  CalendarOutlined,
  NumberOutlined,
} from "@ant-design/icons";

export default function Home() {
  const [orders, setOrders] = useState<ProductionOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState("");
  const [mounted, setMounted] = useState(false);

  const load = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        message.error("❌ Error al cargar órdenes");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 1200);
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setMounted(true); // asegura que partículas y hora solo se rendericen en cliente
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setTime(dayjs().format("HH:mm:ss"));
    const interval = setInterval(() => {
      setTime(dayjs().format("HH:mm:ss"));
    }, 1000);
    return () => clearInterval(interval);
  }, [mounted]);

  const onFinish = async (values: any) => {
    try {
      await createOrder({
        reference: values.reference,
        product: values.product,
        quantity: values.quantity,
        dueDate: values.dueDate.toISOString(),
      });
      message.success("✅ Orden creada con éxito!");
      load();
    } catch {
      message.error("❌ Error al crear la orden");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-gradient-to-r from-[#001B44] via-[#007BFF] to-[#00E0FF] bg-[length:300%_300%] animate-gradient">
      {/* Nebulosa difusa */}
      <div className="absolute -inset-40 bg-gradient-to-r from-cyan-400/20 via-blue-600/20 to-indigo-800/20 blur-3xl animate-gradient" />

      {/* Partículas solo en cliente */}
      {mounted && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full blur-md animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${6 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 6}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="z-10 flex flex-col items-center mt-10 mb-6 relative"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <Image src={logo} alt="Omniscient Logo" height={200} priority />
          <div className="absolute inset-0 rounded-full blur-3xl bg-cyan-400/40 animate-pulse" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 text-lg text-white/80 font-light tracking-wider"
        >
          Intelligent Production Management
        </motion.p>
      </motion.div>

      {/* Hora */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="z-10 mb-6 px-8 py-2 rounded-full bg-white/10 border border-white/20 shadow-lg backdrop-blur-xl text-white font-mono tracking-wider text-xl drop-shadow-[0_0_10px_rgba(0,224,255,0.7)]"
        >
          🕒 {time}
        </motion.div>
      )}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 1.4 }}
        className="z-10 w-full max-w-6xl"
      >
        <motion.div
          whileHover={{ scale: 1.01, rotateX: 2, rotateY: -2 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="relative"
        >
          {/* Glow dinámico */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 opacity-40 blur-2xl animate-gradient"></div>

          <Card
            className="relative backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4),0_10px_20px_rgba(0,0,0,0.3)] overflow-hidden"
            styles={{ body: { padding: "2rem" } }}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00E0FF] via-[#007BFF] to-[#00E0FF] animate-gradient" />

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[#00E0FF] via-[#007BFF] to-[#00E0FF] drop-shadow-[0_0_20px_rgba(0,224,255,0.8)]"
            >
              🚀 Production Orders
            </motion.h1>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Form
                layout="inline"
                onFinish={onFinish}
                className="flex flex-wrap justify-center gap-4 mb-10"
              >
                <Form.Item name="reference" rules={[{ required: true }]}>
                  <Input
                    prefix={<BarcodeOutlined />}
                    placeholder="Reference"
                    className="rounded-xl bg-white/15 border border-white/20 shadow-inner focus:ring-2 focus:ring-[#00E0FF] backdrop-blur-md"
                  />
                </Form.Item>
                <Form.Item name="product" rules={[{ required: true }]}>
                  <Input
                    prefix={<ShoppingOutlined />}
                    placeholder="Product"
                    className="rounded-xl bg-white/15 border border-white/20 shadow-inner focus:ring-2 focus:ring-[#00E0FF] backdrop-blur-md"
                  />
                </Form.Item>
                <Form.Item
                  name="quantity"
                  rules={[{ required: true, type: "number", min: 1 }]}
                >
                  <InputNumber
                    placeholder="Qty"
                    className="rounded-xl bg-white/15 border border-white/20 shadow-inner w-24 backdrop-blur-md"
                  />
                </Form.Item>
                <Form.Item name="dueDate" rules={[{ required: true }]}>
                  <DatePicker
                    placeholder="Select date"
                    className="rounded-xl bg-white/15 border border-white/20 shadow-inner backdrop-blur-md"
                  />
                </Form.Item>
                <Tooltip title="Create new order" color="blue">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="relative overflow-hidden bg-gradient-to-r from-[#007BFF] via-[#00E0FF] to-[#007BFF] hover:scale-105 active:scale-95 transition-transform px-6 py-2 rounded-2xl shadow-lg text-white font-semibold animate-pulse-slow"
                  >
                    <span className="relative z-10">➕ Add Order</span>
                    <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-30 transition-opacity animate-shine"></span>
                  </Button>
                </Tooltip>
              </Form>
            </motion.div>

            {/* Tabla */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
            >
              {loading ? (
                <Skeleton active paragraph={{ rows: 5 }} />
              ) : (
                <Table
                  rowKey="id"
                  dataSource={orders}
                  pagination={{ pageSize: 5 }}
                  className="rounded-2xl overflow-hidden border border-white/20 backdrop-blur-md"
                  rowClassName={() =>
                    "hover:bg-cyan-200/10 transition-all cursor-pointer"
                  }
                  columns={[
                    {
                      title: (
                        <span>
                          <BarcodeOutlined /> Reference
                        </span>
                      ),
                      dataIndex: "reference",
                    },
                    {
                      title: (
                        <span>
                          <ShoppingOutlined /> Product
                        </span>
                      ),
                      dataIndex: "product",
                    },
                    {
                      title: (
                        <span>
                          <NumberOutlined /> Quantity
                        </span>
                      ),
                      dataIndex: "quantity",
                    },
                    {
                      title: (
                        <span>
                          <CalendarOutlined /> Due Date
                        </span>
                      ),
                      dataIndex: "dueDate",
                      render: (d) => dayjs(d).format("YYYY-MM-DD"),
                    },
                    {
                      title: "Status",
                      dataIndex: "status",
                      render: (status: string) => (
                        <span
                          className={`px-3 py-1 flex items-center gap-1 rounded-full text-xs md:text-sm font-semibold ${
                            status === "planned"
                              ? "bg-gradient-to-r from-blue-200/60 to-blue-300/60 text-blue-900 animate-pulse-slow"
                              : "bg-gradient-to-r from-green-200/60 to-green-300/60 text-green-900"
                          }`}
                        >
                          <RocketOutlined /> {status}
                        </span>
                      ),
                    },
                  ]}
                />
              )}
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Extra styles */}
      <style jsx global>{`
        .animate-gradient {
          animation: gradientShift 18s ease infinite;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float {
          animation: float 14s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(15px); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 3.5s infinite;
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-shine {
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.7),
            transparent
          );
          background-size: 200% 200%;
          animation: shineEffect 4s infinite;
        }
        @keyframes shineEffect {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
