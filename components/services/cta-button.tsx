type CtaButtonProps = {
  href: string;
  label: string;
  hoverLabel: string;
};

/**
 * Pill link that smart-animates to its "On:Hover" variant over 300ms (ease-out):
 * it widens from 106px to 176px, darkens, and dissolves its label into the
 * longer call to action. Widths come from the Figma variants (Manrope 16px
 * labels plus 20px padding on each side).
 */
export function CtaButton({ href, label, hoverLabel }: CtaButtonProps) {
  return (
    <a
      href={href}
      className="group relative inline-flex h-12 w-[106px] items-center justify-center overflow-hidden rounded-full bg-primary font-manrope text-base leading-[1.2] font-semibold text-on-primary transition-[width,background-color] duration-300 ease-out hover:w-[176px] hover:bg-primary-hover focus-visible:w-[176px] focus-visible:bg-primary-hover"
    >
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        className="absolute whitespace-nowrap transition-opacity duration-300 ease-out group-hover:opacity-0 group-focus-visible:opacity-0"
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className="absolute whitespace-nowrap opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {hoverLabel}
      </span>
    </a>
  );
}
