import type { CSSProperties, Ref } from "react";

type StatCountProps = {
  value: number;
  className?: string;
  style?: CSSProperties;
  /** Position and colour of the "+"; it sits differently beside a title than on a collapsed card. */
  plusClassName?: string;
  ref?: Ref<HTMLSpanElement>;
};

/** Big two-digit count with the superscript "+" from the design. */
export function StatCount({ value, className = "", style, plusClassName = "", ref }: StatCountProps) {
  return (
    <span
      ref={ref}
      style={style}
      className={`relative inline-block font-display-wide text-[92px] font-extrabold tracking-[-0.04em] whitespace-nowrap sm:text-[126px] xl:text-[157px] ${className}`}
    >
      {String(value).padStart(2, "0")}
      <span className={`absolute text-[0.375em] leading-none ${plusClassName}`}>+</span>
    </span>
  );
}
