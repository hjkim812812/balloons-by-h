import { Resend } from "resend";
import { BRAND } from "@/data/site";
import { formatPrice } from "@/data/site";
import type { OrderItem } from "@/types/cart";

export type OrderEmailData = {
  orderNumber: number;
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

const ORDER_NOTIFICATION_EMAIL =
  process.env.ORDER_NOTIFICATION_EMAIL ?? "hjkim812@yahoo.com";

const ORDER_FROM_EMAIL =
  process.env.ORDER_FROM_EMAIL ?? `${BRAND.name} <${BRAND.email}>`;

function buildOrderEmailText(data: OrderEmailData): string {
  const itemsList = data.items
    .map(
      (item) =>
        `- ${item.name} | Quantity: ${item.quantity} | Price: ${formatPrice(item.price * item.quantity)}`
    )
    .join("\n");

  const lines = [
    `New order received — Order #${data.orderNumber}`,
    "",
    `Order Number: ${data.orderNumber}`,
    `Customer Name: ${data.name}`,
    `Customer Email: ${data.email}`,
    `Customer Phone Number: ${data.phone}`,
    `Delivery Address: ${data.deliveryAddress}`,
    `Delivery Date: ${data.deliveryDate}`,
    `Delivery Time: ${data.deliveryTime}`,
    "",
    "Items Ordered:",
    itemsList,
    "",
    `Total Amount Due: ${formatPrice(data.total)}`,
    `Zelle Payment Memo: Order #${data.orderNumber}`,
  ];

  if (data.customMessage?.trim()) {
    lines.push("", `Custom Message: ${data.customMessage.trim()}`);
  }

  return lines.join("\n");
}

function buildOrderEmailHtml(data: OrderEmailData): string {
  const itemsRows = data.items
    .map(
      (item) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;">${item.name}</td><td style="padding:8px 0;border-bottom:1px solid #eee;">${item.quantity}</td><td style="padding:8px 0;border-bottom:1px solid #eee;">${formatPrice(item.price * item.quantity)}</td></tr>`
    )
    .join("");

  const customMessageBlock = data.customMessage?.trim()
    ? `<p><strong>Custom Message:</strong><br>${data.customMessage.trim()}</p>`
    : "";

  return `
    <h2>New Order #${data.orderNumber}</h2>
    <p><strong>Order Number:</strong> ${data.orderNumber}</p>
    <p><strong>Customer Name:</strong> ${data.name}</p>
    <p><strong>Customer Email:</strong> ${data.email}</p>
    <p><strong>Customer Phone Number:</strong> ${data.phone}</p>
    <p><strong>Delivery Address:</strong> ${data.deliveryAddress}</p>
    <p><strong>Delivery Date:</strong> ${data.deliveryDate}</p>
    <p><strong>Delivery Time:</strong> ${data.deliveryTime}</p>
    <h3>Items Ordered</h3>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr>
          <th style="text-align:left;padding:8px 0;border-bottom:1px solid #ccc;">Item</th>
          <th style="text-align:left;padding:8px 0;border-bottom:1px solid #ccc;">Quantity</th>
          <th style="text-align:left;padding:8px 0;border-bottom:1px solid #ccc;">Price</th>
        </tr>
      </thead>
      <tbody>${itemsRows}</tbody>
    </table>
    <p><strong>Total Amount Due:</strong> ${formatPrice(data.total)}</p>
    <p><strong>Zelle Payment Memo:</strong> Order #${data.orderNumber}</p>
    ${customMessageBlock}
  `;
}

export async function sendOrderEmail(data: OrderEmailData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set. Skipping order email notification.");
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: ORDER_FROM_EMAIL,
      to: ORDER_NOTIFICATION_EMAIL,
      subject: `New Order #${data.orderNumber} — ${BRAND.name}`,
      text: buildOrderEmailText(data),
      html: buildOrderEmailHtml(data),
    });

    if (error) {
      console.error("Resend order email error:", error);
    }
  } catch (error) {
    console.error("Order email send error:", error);
  }
}
