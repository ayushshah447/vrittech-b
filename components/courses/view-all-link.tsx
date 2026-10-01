import { ArrowRightIcon } from "@/components/ui/arrow-right-icon";

type ViewAllLinkProps = {
  href: string;
  className?: string;
};

export function ViewAllLink({ href, className = "" }: ViewAllLinkProps) {
  return (
    <a
      href={href}
      className={`group/link inline-flex items-center gap-2 rounded-full font-outfit text-lg leading-[1.26] font-semibold text-blush ${className}`}
    >
      View all Courses
      <ArrowRightIcon className="size-5 transition-transform duration-500 ease-out group-hover/link:translate-x-2 group-focus-visible/link:translate-x-2" />
    </a>
  );
}
