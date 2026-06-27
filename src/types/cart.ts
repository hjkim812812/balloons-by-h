export type CartItem = {
  id: string;
  name: string;
  price: number;
  slug: string;
  productType: "bouquet" | "enhancement";
  href: string;
  quantity: number;
};

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  slug: string;
  productType: "bouquet" | "enhancement";
};

export type OrderSummary = {
  orderNumber: number;
  total: number;
  items: OrderItem[];
  name: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime: string;
};
