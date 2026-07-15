import { IOrderService, PlaceOrderRequest } from "./IOrderService";
import { Order, OrderStatus, StatusHistoryEntry } from "../types";

let mockOrders: Order[] = [
  {
    id: "ORD-100234",
    items: [
      {
        id: "1",
        product: {
          id: "p1",
          name: "Pro Cricket Bat",
          brand: "Kookaburra",
          price: 12500,
          original: 15000,
          discount: 16,
          rating: 4.8,
          reviews: 124,
          emoji: "🏏",
          bg: "#E0F2FE",
          inStock: true,
          categoryId: "c1",
          subCategory: "Bats",
          isNew: false,
          isPopular: true,
          description: "Professional grade english willow",
        },
        quantity: 1,
      },
    ],
    total: 12500,
    status: "Delivered",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    addressId: "addr_1",
    paymentMethod: "upi",
    idempotencyKey: "mock-1",
    statusHistory: [
      {
        status: "Processing",
        timestamp: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
      {
        status: "Shipped",
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        status: "Delivered",
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
    ],
  },
  {
    id: "ORD-100235",
    items: [
      {
        id: "2",
        product: {
          id: "p2",
          name: "Pro Football Boots",
          brand: "Nike",
          price: 5499,
          original: 6999,
          discount: 21,
          rating: 4.6,
          reviews: 89,
          emoji: "⚽",
          bg: "#F0FDF4",
          inStock: true,
          categoryId: "c2",
          subCategory: "Boots",
          isNew: true,
          isPopular: true,
          description: "Premium quality football boots.",
        },
        quantity: 2,
      },
    ],
    total: 10998,
    status: "Shipped",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    addressId: "addr_2",
    paymentMethod: "card",
    idempotencyKey: "mock-2",
    statusHistory: [
      {
        status: "Processing",
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
      {
        status: "Shipped",
        timestamp: new Date(Date.now() - 43200000).toISOString(),
      },
    ],
    awbNumber: "AWB987654321",
    courierName: "Blue Dart",
  },
  {
    id: "ORD-100236",
    items: [
      {
        id: "3",
        product: {
          id: "p3",
          name: "Tennis Racket Pro",
          brand: "Wilson",
          price: 8999,
          original: 10000,
          discount: 10,
          rating: 4.9,
          reviews: 210,
          emoji: "🎾",
          bg: "#FEF9EE",
          inStock: true,
          categoryId: "c3",
          subCategory: "Racket",
          isNew: false,
          isPopular: true,
          description: "Top tier tennis racket for pros.",
        },
        quantity: 1,
      },
    ],
    total: 8999,
    status: "Processing",
    createdAt: new Date().toISOString(),
    addressId: "addr_1",
    paymentMethod: "upi",
    idempotencyKey: "mock-3",
    statusHistory: [
      { status: "Processing", timestamp: new Date().toISOString() },
    ],
  },
  {
    id: "ORD-100237",
    items: [
      {
        id: "4",
        product: {
          id: "p4",
          name: "Yoga Mat Premium",
          brand: "Decathlon",
          price: 1200,
          original: 1500,
          discount: 20,
          rating: 4.5,
          reviews: 320,
          emoji: "🧘",
          bg: "#F3E8FF",
          inStock: false,
          categoryId: "c4",
          subCategory: "Yoga",
          isNew: false,
          isPopular: false,
          description: "Anti-slip yoga mat.",
        },
        quantity: 1,
      },
    ],
    total: 1200,
    status: "Cancelled",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    addressId: "addr_1",
    paymentMethod: "cod",
    idempotencyKey: "mock-4",
    statusHistory: [
      {
        status: "Processing",
        timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
      {
        status: "Cancelled",
        timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
        message: "Cancelled by user.",
      },
    ],
  },
];

export class MockOrderService implements IOrderService {
  async placeOrder(request: PlaceOrderRequest): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Deduplicate by idempotency key
    const existing = mockOrders.find(
      (o) => o.idempotencyKey === request.idempotencyKey,
    );
    if (existing) return existing;

    const subtotal = request.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
    const tax = Math.floor(subtotal * 0.18);
    const shipping = subtotal > 1000 ? 0 : 50;
    const total = subtotal + tax + shipping;

    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: request.items,
      total,
      status: "Processing",
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 86400000 * 3).toISOString(),
      addressId: request.addressId,
      paymentMethod: request.paymentMethod,
      idempotencyKey: request.idempotencyKey,
      statusHistory: [
        { status: "Processing", timestamp: new Date().toISOString() },
      ],
    };

    mockOrders = [newOrder, ...mockOrders];
    return newOrder;
  }

  async getOrders(userId: string): Promise<Order[]> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockOrders;
  }

  async getOrderById(orderId: string): Promise<Order | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return mockOrders.find((o) => o.id === orderId);
  }

  async cancelOrder(orderId: string, reason: string): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const order = mockOrders.find((o) => o.id === orderId);
    if (!order) throw new Error("Order not found");

    order.status = "Cancelled";
    order.statusHistory.push({
      status: "Cancelled",
      timestamp: new Date().toISOString(),
      message: reason,
    });
    return order;
  }

  async returnOrder(
    orderId: string,
    items: string[],
    reason: string,
  ): Promise<Order> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const order = mockOrders.find((o) => o.id === orderId);
    if (!order) throw new Error("Order not found");

    order.status = "Return Requested";
    order.statusHistory.push({
      status: "Return Requested",
      timestamp: new Date().toISOString(),
      message: reason,
    });
    return order;
  }

  async validatePincode(
    pincode: string,
  ): Promise<{ serviceable: boolean; estimatedDays?: number }> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    if (pincode === "000000") return { serviceable: false };
    return { serviceable: true, estimatedDays: 3 };
  }
}
