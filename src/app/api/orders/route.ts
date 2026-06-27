import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/send-order-email";
import {
  createServerSupabase,
  getNextOrderNumber,
  getSupabaseConfig,
} from "@/lib/supabase";
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

    const validTimes = ["10:00 AM – 2:00 PM", "2:00 PM – 6:00 PM"];
    if (!validTimes.includes(body.deliveryTime)) {
      return NextResponse.json({ error: "Invalid delivery time" }, { status: 400 });
    }

    const calculatedTotal = body.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (calculatedTotal !== body.total) {
      return NextResponse.json({ error: "Order total mismatch" }, { status: 400 });
    }

    if (!getSupabaseConfig()) {
      console.error(
        "Order API error: Missing Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)."
      );
      return NextResponse.json(
        { error: "Order system is not configured. Please contact us to complete your order." },
        { status: 503 }
      );
    }

    let orderNumber: number;
    try {
      orderNumber = await getNextOrderNumber();
    } catch (error) {
      console.error("Order number generation error:", error);
      return NextResponse.json(
        { error: "Unable to create order. Please try again." },
        { status: 500 }
      );
    }

    const supabase = createServerSupabase();
    const { error } = await supabase.from("orders").insert({
      order_number: orderNumber,
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      delivery_address: body.deliveryAddress.trim(),
      delivery_date: body.deliveryDate,
      delivery_time: body.deliveryTime,
      items: body.items,
      total: body.total,
    });

    if (error) {
      console.error("Supabase insert error:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
    }

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
      customMessage: body.customMessage?.trim(),
    });

    return NextResponse.json({
      orderNumber,
      total: body.total,
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
