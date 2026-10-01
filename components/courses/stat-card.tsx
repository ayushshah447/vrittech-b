import Image from "next/image";
import { useLayoutEffect, useRef, type CSSProperties } from "react";
import type { CourseStat } from "@/content/courses";
import { CourseIconStrip } from "./course-icon-strip";
import { StatCount } from "./stat-count";
import { ViewAllLink } from "./view-all-link";

type StatCardProps = {
  stat: CourseStat;
  active: boolean;
  onSelect: (id: CourseStat["id"]) => void;
};

/*
 * Every card is red underneath with a blush circle on top. Selecting a card
 * smart-animates every layer between the Figma "stats" variants over 1s with the
 * "ease in and out back" curve: the card widens, the circle shrinks into the
 * bottom-left corner, the icons slide in from the left, the count slides out of
 * the centre and the rotated title swings flat beside it.
 */
export function StatCard({ stat, active, onSelect }: StatCardProps) {
  return (
    <article
      className="group/card relative transition-[flex-grow] duration-1000 ease-back-in-out xl:min-w-0 xl:basis-0"
      style={{ flexGrow: active ? 592 : 280 }}
    >
      {!active && (
        <Image
          src="/images/courses/click-me.png"
          alt=""
          width={62}
          height={67}
          className="pointer-events-none absolute -top-[49px] left-[134px] z-20 hidden h-[67px] w-[62px] opacity-0 transition-opacity duration-[1022ms] ease-gentle group-hover/card:opacity-100 xl:block"
        />
      )}

      <div
        className={`relative h-full overflow-hidden rounded-[32px] transition-colors duration-0 ${
          // Switch the base to blush once the circle has fully covered the card, so
          // its anti-aliased edge never leaves a red hairline in the corners.
          active ? "bg-brand" : "bg-blush delay-1000"
        }`}
      >
        <button
          type="button"
          aria-pressed={active}
          onClick={() => onSelect(stat.id)}
          className={`absolute inset-0 z-10 rounded-[32px] ${active ? "cursor-default" : "cursor-pointer"}`}
        >
          <span className="sr-only">Show {stat.title.toLowerCase()}</span>
        </button>

        <SmartLayers stat={stat} active={active} />
        <CompactLayers stat={stat} active={active} />
      </div>
    </article>
  );
}

/** Shared by every smart-animated layer. */
const SMART = "transition-all duration-1000 ease-back-in-out";

/**
 * Horizontal centre of a collapsed card. In Figma the card is 280px of the
 * 1152px left after the two 32px gaps; this keeps that share as the row scales.
 */
const COLLAPSED_CENTRE = "calc((100cqw - 64px) * 140 / 1152)";

/** Width of the active card (592px of the same 1152px). */
const ACTIVE_WIDTH = "((100cqw - 64px) * 592 / 1152)";

type LayerProps = {
  stat: CourseStat;
  active: boolean;
};

/** Desktop (xl+) layers, positioned with the Figma coordinates of each variant. */
function SmartLayers({ stat, active }: LayerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const titleProbeRef = useRef<HTMLSpanElement>(null);

  // The title's resting spots depend on rendered sizes: it sits 24px after the
  // count when flat, its rotated block is centred when collapsed, and when flat
  // it is as wide as its one-line title (at least 218px, as in Figma).
  useLayoutEffect(() => {
    const root = rootRef.current;
    const count = countRef.current;
    const probe = probeRef.current;
    const titleProbe = titleProbeRef.current;
    if (!root || !count || !probe || !titleProbe) return;
    const sync = () => {
      root.style.setProperty("--count-w", `${count.offsetWidth}px`);
      root.style.setProperty("--title-depth", `${probe.offsetHeight}px`);
      root.style.setProperty("--title-w", `${Math.max(218, Math.ceil(titleProbe.getBoundingClientRect().width) + 1)}px`);
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(count);
    observer.observe(probe);
    observer.observe(titleProbe);
    return () => observer.disconnect();
  }, []);

  // Figma interpolates the text box width too, so the title re-wraps part way
  // through the move rather than jumping to one line at the start. On narrower
  // screens the card can be too small for a one-line title, so it wraps instead
  // of being clipped (Figma's own Upcoming title ends 15px from the edge, so an
  // 8px margin keeps every title on one line at the design width).
  const titleStyle: CSSProperties = active
    ? {
        left: "calc(75px + var(--count-w, 200px) + 24px)",
        top: 303,
        width: `min(var(--title-w, 218px), calc(${ACTIVE_WIDTH} - 75px - var(--count-w, 200px) - 32px))`,
      }
    : { left: `calc(${COLLAPSED_CENTRE} - var(--title-depth, 138px) / 2)`, top: 259, width: 218 };

  return (
    <div ref={rootRef} className="absolute inset-0 hidden xl:block">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute rounded-full bg-blush ${SMART}`}
        style={
          active
            ? { left: -8, top: 453, width: 15, height: 15 }
            : { left: -122, top: -71, width: 596, height: 596 }
        }
      />

      <div
        inert
        className={`pointer-events-none absolute top-[120px] w-[460px] ${SMART}`}
        style={{ left: active ? 66 : -514, opacity: active ? 1 : 0 }}
      >
        <CourseIconStrip />
      </div>

      {/* Fixed 38px from the active card's right edge (x 393 at 1440px), so the
          card's width reveals or clips it rather than moving it. */}
      <div
        inert={!active}
        className="absolute top-10 z-20 whitespace-nowrap"
        style={{ left: `calc(${ACTIVE_WIDTH} - 38px - 161px)` }}
      >
        <ViewAllLink href={stat.href} />
      </div>

      <StatCount
        ref={countRef}
        value={stat.count}
        className={`absolute top-[268px] leading-[1.2] ${SMART} ${
          active ? "left-[75px] translate-x-0 text-blush" : "left-(--collapsed-centre) -translate-x-1/2 text-brand"
        }`}
        style={{ "--collapsed-centre": COLLAPSED_CENTRE } as CSSProperties}
        plusClassName={`${SMART} ${active ? "top-[7px] -right-[21px] text-white" : "-top-[9px] -right-[17px] text-brand"}`}
      />

      <div
        className={`absolute grid origin-top-left gap-3 ${SMART} ${
          active ? "rotate-0 text-blush" : "-rotate-90 text-brand"
        }`}
        style={titleStyle}
      >
        <h3 className="font-outfit text-[32px] leading-[1.26] font-bold">{stat.title}</h3>
        <p className="font-outfit text-lg leading-[1.26] [contain:inline-size]">{stat.description}</p>
      </div>

      {/* Invisible copies measured for the collapsed block depth and one-line title width. */}
      <div ref={probeRef} aria-hidden="true" className="invisible absolute grid w-[218px] gap-3">
        <span className="font-outfit text-[32px] leading-[1.26] font-bold">{stat.title}</span>
        <span className="font-outfit text-lg leading-[1.26]">{stat.description}</span>
      </div>
      <span
        ref={titleProbeRef}
        aria-hidden="true"
        className="invisible absolute font-outfit text-[32px] leading-[1.26] font-bold whitespace-nowrap"
      >
        {stat.title}
      </span>
    </div>
  );
}

/** Below xl the cards stack: the active one shows everything, the rest collapse to a row. */
function CompactLayers({ stat, active }: LayerProps) {
  const circle = `pointer-events-none absolute aspect-square w-[160%] -translate-1/2 rounded-full bg-blush transition-[left,top,scale] duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${
    active ? "top-full left-0 scale-[0.025]" : "top-1/2 left-1/2 scale-100"
  }`;

  return (
    <div className="relative xl:hidden">
      <span aria-hidden="true" className={circle} />
      {active ? (
        <div className="relative flex flex-col p-6 sm:p-8">
          <ViewAllLink href={stat.href} className="relative z-20 self-end" />
          <CourseIconStrip className="mt-6" />
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <StatCount
              value={stat.count}
              className="mr-2 leading-[0.92] text-blush"
              plusClassName="-top-[0.2em] -right-[0.16em] text-white"
            />
            <div className="flex flex-col gap-3 text-blush">
              <h3 className="font-outfit text-2xl leading-[1.26] font-bold sm:text-[32px]">{stat.title}</h3>
              <p className="max-w-[220px] font-outfit text-base leading-[1.26] sm:text-lg">{stat.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex items-center gap-5 p-6 text-brand sm:p-8">
          <StatCount value={stat.count} className="leading-[0.92]" plusClassName="-top-[0.14em] -right-[0.2em] text-brand" />
          <div className="flex flex-col gap-1">
            <h3 className="font-outfit text-2xl leading-[1.26] font-bold">{stat.title}</h3>
            <p className="font-outfit text-base leading-[1.26]">{stat.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
