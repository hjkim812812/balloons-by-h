import { Resend } from "resend";
import { BRAND } from "@/data/site";
import { getOrderFromEmail } from "@/lib/send-order-email";

export type InquiryEmailData = {
  name: string;
  email: string;
  phone: string;
  deliveryDate: string;
  deliveryTime: string;
  details: string;
};

const INQUIRY_NOTIFICATION_EMAIL = BRAND.email;

const DELIVERY_TIME_LABELS: Record<string, string> = {
  "10am-2pm": "10am – 2pm",
  "2pm-6pm": "2pm – 6pm",
};

function formatDeliveryTime(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  return DELIVERY_TIME_LABELS[trimmed] ?? trimmed;
}

function buildInquiryEmailText(data: InquiryEmailData): string {
  const lines = [
    "New inquiry received",
    "",
    `Full Name: ${data.name}`,
    `Email: ${data.email}`,
  ];

  if (data.phone.trim()) {
    lines.push(`Phone: ${data.phone.trim()}`);
  }

  if (data.deliveryDate.trim()) {
    lines.push(`Preferred Delivery Date: ${data.deliveryDate.trim()}`);
  }

  const deliveryTime = formatDeliveryTime(data.deliveryTime);
  if (deliveryTime) {
    lines.push(`Delivery Time: ${deliveryTime}`);
  }

  if (data.details.trim()) {
    lines.push("", "Details:", data.details.trim());
  }

  return lines.join("\n");
}

function buildInquiryEmailHtml(data: InquiryEmailData): string {
  const optionalFields: string[] = [];

  if (data.phone.trim()) {
    optionalFields.push(`<p><strong>Phone:</strong> ${data.phone.trim()}</p>`);
  }

  if (data.deliveryDate.trim()) {
    optionalFields.push(
      `<p><strong>Preferred Delivery Date:</strong> ${data.deliveryDate.trim()}</p>`
    );
  }

  const deliveryTime = formatDeliveryTime(data.deliveryTime);
  if (deliveryTime) {
    optionalFields.push(`<p><strong>Delivery Time:</strong> ${deliveryTime}</p>`);
  }

  const detailsBlock = data.details.trim()
    ? `<p><strong>Details:</strong><br>${data.details.trim().replace(/\n/g, "<br>")}</p>`
    : "";

  return `
    <h2>New Inquiry</h2>
    <p><strong>Full Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${optionalFields.join("\n    ")}
    ${detailsBlock}
  `;
}

export async function sendInquiryEmail(data: InquiryEmailData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: getOrderFromEmail(),
    to: INQUIRY_NOTIFICATION_EMAIL,
    replyTo: data.email,
    subject: `New Inquiry — ${data.name}`,
    text: buildInquiryEmailText(data),
    html: buildInquiryEmailHtml(data),
  });

  if (error) {
    throw new Error(error.message);
  }
}
