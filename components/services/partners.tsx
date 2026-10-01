import Image from "next/image";
import type { Partner } from "@/content/services";

type PartnersProps = {
  partners: readonly Partner[];
};

export function Partners({ partners }: PartnersProps) {
  return (
    <div className="flex flex-col items-center gap-8 xl:gap-[38px]">
      <h2 className="text-center font-manrope text-[22px] leading-[1.5] font-bold tracking-[-0.02em] text-ink">
        Our Partners
      </h2>
      <ul className="grid w-full grid-cols-2 justify-items-center gap-x-6 gap-y-8 md:grid-cols-4 xl:flex xl:justify-center xl:gap-[162px]">
        {partners.map((partner) => (
          <li key={partner.name} className="flex h-[75px] w-[143px] shrink-0 items-center justify-center">
            <Image
              src={partner.logo}
              alt={partner.name}
              width={partner.width}
              height={partner.height}
              className="object-fill grayscale"
              style={{ width: partner.width, height: partner.height }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
