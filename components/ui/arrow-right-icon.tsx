import type { SVGProps } from "react";

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3417 4.50837C10.7973 4.05275 11.536 4.05275 11.9916 4.50837L16.6583 9.17503C17.1139 9.63064 17.1139 10.3693 16.6583 10.8249L11.9916 15.4916C11.536 15.9472 10.7973 15.9472 10.3417 15.4916C9.8861 15.036 9.8861 14.2973 10.3417 13.8417L13.0168 11.1667L4.16667 11.1667C3.52233 11.1667 3 10.6443 3 10C3 9.35567 3.52233 8.83333 4.16667 8.83333L13.0168 8.83333L10.3417 6.15829C9.8861 5.70268 9.8861 4.96398 10.3417 4.50837Z"
      />
    </svg>
  );
}
