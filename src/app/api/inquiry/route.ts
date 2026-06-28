import { NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/send-inquiry-email";

type InquiryRequestBody = {
  name?: string;
  email?: string;
  phone?: string;
  "delivery-date"?: string;
  "delivery-time"?: string;
  details?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as InquiryRequestBody;

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();

    if (!name) {
      return NextResponse.json({ error: "Missing required field: name" }, { status: 400 });
    }

    if (!email) {
      return NextResponse.json({ error: "Missing required field: email" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    await sendInquiryEmail({
      name,
      email,
      phone: String(body.phone ?? ""),
      deliveryDate: String(body["delivery-date"] ?? ""),
      deliveryTime: String(body["delivery-time"] ?? ""),
      details: String(body.details ?? ""),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Inquiry submission failed:", error);
    return NextResponse.json({ error: "Failed to send inquiry" }, { status: 500 });
  }
}
