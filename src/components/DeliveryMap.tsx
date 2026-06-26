import Image from "next/image";
import { DELIVERY_AREAS } from "@/data/site";

export function DeliveryMap() {
  return (
    <figure className="mx-auto max-w-md">
      <Image
        src="/images/delivery/westside-los-angeles.png"
        alt={`Delivery across Westside Los Angeles: ${DELIVERY_AREAS.join(", ")}`}
        width={800}
        height={1200}
        className="h-auto w-full"
        priority
        sizes="(max-width: 768px) 100vw, 448px"
      />
    </figure>
  );
}
