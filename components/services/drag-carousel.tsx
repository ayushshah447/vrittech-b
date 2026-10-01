"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ServiceSlide } from "@/content/services";

/** Share of the progress track the thumb covers (293 / 1218 in Figma). */
const THUMB_RATIO = 0.2406;
/** A drag shorter than this snaps back to the slide it started on. */
const SWIPE_THRESHOLD = 60;
/** Slide width; the bubble rests on the centre of the current slide (as in Figma). */
const SLIDE_WIDTH = "min(1012px, 85vw)";
const BUBBLE_REST = `calc(${SLIDE_WIDTH} / 2) calc(${SLIDE_WIDTH} * 569 / 1012 / 2)`;

type DragState = {
  pointerId: number;
  startX: number;
  startScroll: number;
  startIndex: number;
};

type DragCarouselProps = {
  slides: readonly ServiceSlide[];
  label: string;
};

export function DragCarousel({ slides, label }: DragCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? track.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, [updateProgress]);

  const slideOffsets = () => {
    const track = trackRef.current;
    if (!track) return [];
    return Array.from(track.children, (child) => (child as HTMLElement).offsetLeft - track.offsetLeft);
  };

  const nearestIndex = (scrollLeft: number) => {
    const offsets = slideOffsets();
    let best = 0;
    offsets.forEach((offset, i) => {
      if (Math.abs(offset - scrollLeft) < Math.abs(offsets[best] - scrollLeft)) best = i;
    });
    return best;
  };

  const moveBubble = (event: React.PointerEvent) => {
    const bubble = bubbleRef.current;
    const track = trackRef.current;
    if (!bubble || !track) return;
    const rect = track.getBoundingClientRect();
    bubble.style.translate = `${event.clientX - rect.left}px ${event.clientY - rect.top}px`;
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    // Touch and pen keep native scrolling and scroll snapping.
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    const track = event.currentTarget;
    track.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      startIndex: nearestIndex(track.scrollLeft),
    };
    setIsDragging(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    moveBubble(event);
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.currentTarget.scrollLeft = drag.startScroll - (event.clientX - drag.startX);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setIsDragging(false);

    const track = event.currentTarget;
    const delta = drag.startX - event.clientX;
    const offsets = slideOffsets();
    let target = drag.startIndex;
    if (delta > SWIPE_THRESHOLD) target = Math.min(drag.startIndex + 1, offsets.length - 1);
    else if (delta < -SWIPE_THRESHOLD) target = Math.max(drag.startIndex - 1, 0);
    track.scrollTo({ left: offsets[target] ?? 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="relative" style={{ "--slide-w": SLIDE_WIDTH } as React.CSSProperties}>
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={label}
          tabIndex={0}
          onScroll={updateProgress}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={() => {
            if (bubbleRef.current) bubbleRef.current.style.translate = BUBBLE_REST;
          }}
          className={`scrollbar-none -mr-[calc((100vw-100%)/2)] flex gap-5 overflow-x-auto overscroll-x-contain select-none [@media(hover:hover)_and_(pointer:fine)]:cursor-none ${
            isDragging ? "" : "snap-x snap-mandatory"
          }`}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              className="relative aspect-[1012/569] w-[var(--slide-w)] shrink-0 snap-start overflow-hidden rounded-[21px] bg-[#e1e1e1]"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                draggable={false}
                preload={i === 0}
                // Repeats of the first photo share its request, so they load eagerly too.
                loading={slide.src === slides[0].src ? "eager" : "lazy"}
                sizes="(min-width: 1280px) 1012px, 85vw"
                className="pointer-events-none object-cover"
              />
            </div>
          ))}
        </div>

        {/* Cursor-following "Drag" bubble, mouse users only. */}
        <div
          ref={bubbleRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 hidden transition-[translate] duration-150 ease-out [@media(hover:hover)_and_(pointer:fine)]:block"
          style={{ translate: BUBBLE_REST }}
        >
          <div
            className={`-mt-[66px] -ml-[66px] flex size-[132px] items-center justify-center rounded-full bg-bubble font-manrope text-base leading-[1.2] font-semibold text-ink-soft transition-[scale] duration-200 ease-out ${
              isDragging ? "scale-90" : "scale-100"
            }`}
          >
            Drag
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="relative mt-10 h-[7px] rounded-full bg-track xl:mt-[59px]">
        <div
          className="absolute inset-y-0 rounded-full bg-thumb"
          style={{
            width: `${THUMB_RATIO * 100}%`,
            left: `${progress * (1 - THUMB_RATIO) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
