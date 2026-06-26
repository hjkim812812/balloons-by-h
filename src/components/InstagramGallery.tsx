import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { BRAND, INSTAGRAM_PLACEHOLDERS } from "@/data/site";

export function InstagramGallery() {
  return (
    <section className="border-t border-champagne/15 bg-ivory py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Instagram"
            title="Moments, Captured"
            align="center"
            className="mx-auto"
          />
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 gap-3 md:mt-14 md:gap-4">
          {INSTAGRAM_PLACEHOLDERS.map((item, i) => (
            <ScrollReveal key={item.alt} delay={i * 50}>
              <div className="group relative aspect-square overflow-hidden bg-blush-light">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/5" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 text-center md:mt-14">
          <Link
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-luxury-primary"
          >
            Follow @{BRAND.instagramHandle}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
