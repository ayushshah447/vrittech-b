import { PARTNERS, SERVICE_NAMES, SERVICE_SLIDES, SERVICES_INTRO } from "@/content/services";
import { CtaButton } from "./cta-button";
import { DragCarousel } from "./drag-carousel";
import { Partners } from "./partners";
import { ServiceTicker } from "./service-ticker";

export function ServicesSection() {
  return (
    <section aria-labelledby="services-heading" className="pt-16 pb-20 md:pt-24 md:pb-28 xl:pt-[137px] xl:pb-[137px]">
      <h2 id="services-heading" className="sr-only">
        Our services
      </h2>

      <div className="shell flex flex-col gap-24 xl:gap-[193px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-[clamp(48px,14vw,202px)]">
          <div className="flex max-w-[625px] flex-col items-start gap-8 xl:gap-[58px]">
            <p className="font-grotesk text-2xl leading-[1.4] font-medium text-ink-soft md:text-3xl xl:text-[36px]">
              {SERVICES_INTRO}
            </p>
            <CtaButton href="#services-showcase" label="Services" hoverLabel="Start Your Project" />
          </div>
          <ServiceTicker words={SERVICE_NAMES} />
        </div>

        <div id="services-showcase" className="scroll-mt-10">
          <DragCarousel slides={SERVICE_SLIDES} label="Our work" />
        </div>

        <Partners partners={PARTNERS} />
      </div>
    </section>
  );
}
