import Image from "next/image";
import { COURSE_ICON_STRIP, COURSE_ICONS } from "@/content/courses";

const { width: STRIP_W, height: STRIP_H } = COURSE_ICON_STRIP;
const percent = (value: number, total: number) => `${(value / total) * 100}%`;

/** The four tilted course icons, laid out exactly as in Figma and scaled as one unit. */
export function CourseIconStrip({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[460/130] w-full max-w-[460px] ${className}`}>
      {COURSE_ICONS.map((icon) => (
        <Image
          key={icon.src}
          src={icon.src}
          alt=""
          width={icon.width}
          height={icon.height}
          className="absolute h-auto"
          style={{
            left: percent(icon.x, STRIP_W),
            top: percent(icon.y, STRIP_H),
            width: percent(icon.width, STRIP_W),
          }}
        />
      ))}
    </div>
  );
}
