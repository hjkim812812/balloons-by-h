import Image from "next/image";
import { DELIVERY_AREAS } from "@/data/site";

export function DeliveryMap() {
  return (
    <figure className="mx-auto max-w-xl">
      <Image
        src="/images/delivery/westside-los-angeles.png"
        alt={`Delivery across Westside Los Angeles: ${DELIVERY_AREAS.join(", ")}`}
        width={852}
        height={987}
        loading="lazy"
        quality={90}
        className="h-auto w-full"
        sizes="(max-width: 768px) 100vw, 576px"
      />
    </figure>
  );
}
