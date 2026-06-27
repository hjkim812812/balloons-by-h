import { NextResponse } from "next/server";
import { generateOrderNumber } from "@/lib/generate-order-number";
import { isValidDeliveryDate } from "@/lib/delivery-date";
import { DELIVERY_FEE, getOrderTotal } from "@/lib/order-pricing";
import { sendOrderEmail } from "@/lib/send-order-email";
import type { OrderItem } from "@/types/cart";

type OrderRequestBody = {
  name: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTime: string;
  items: OrderItem[];
  total: number;
  customMessage?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderRequestBody;

    const requiredFields: (keyof OrderRequestBody)[] = [
      "name",
      "email",
      "phone",
      "deliveryAddress",
      "deliveryDate",
      "deliveryTime",
    ];

    for (const field of requiredFields) {
      if (!String(body[field] ?? "").trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const validTimes = [
      "Morning Delivery (10:00 AM – 2:00 PM)",
      "Afternoon Delivery (2:00 PM – 6:00 PM)",
    ];
    if (!validTimes.includes(body.deliveryTime)) {
      return NextResponse.json({ error: "Invalid delivery time" }, { status: 400 });
    }

    if (!isValidDeliveryDate(body.deliveryDate.trim())) {
      return NextResponse.json({ error: "Invalid delivery date" }, { status: 400 });
    }

    const subtotal = body.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (getOrderTotal(subtotal) !== body.total) {
      return NextResponse.json({ error: "Order total mismatch" }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();

    try {
      await sendOrderEmail({
        orderNumber,
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        deliveryAddress: body.deliveryAddress.trim(),
        deliveryDate: body.deliveryDate,
        deliveryTime: body.deliveryTime,
        items: body.items,
        total: body.total,
        deliveryFee: DELIVERY_FEE,
        customMessage: body.customMessage?.trim(),
      });
    } catch (emailError) {
      console.error("Order email error:", emailError);
      return NextResponse.json(
        { error: "Unable to submit order. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      orderNumber,
      total: body.total,
      deliveryFee: DELIVERY_FEE,
      items: body.items,
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      deliveryAddress: body.deliveryAddress.trim(),
      deliveryDate: body.deliveryDate,
      deliveryTime: body.deliveryTime,
    });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
