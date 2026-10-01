export type CourseStatId = "all" | "upcoming" | "ongoing";

export type CourseStat = {
  id: CourseStatId;
  count: number;
  title: string;
  description: string;
  href: string;
};

export type CourseIcon = {
  src: string;
  /** Position and size inside the 460×130 icon strip, taken from the Figma frame (shadows included). */
  x: number;
  y: number;
  width: number;
  height: number;
};

export const COURSE_STATS: readonly CourseStat[] = [
  {
    id: "all",
    count: 23,
    title: "All Courses",
    description: "courses you're powering through right now.",
    href: "#courses",
  },
  {
    id: "upcoming",
    count: 5,
    title: "Upcoming Courses",
    description: "exciting new courses waiting to boost your skills.",
    href: "#courses",
  },
  {
    id: "ongoing",
    count: 10,
    title: "Ongoing Courses",
    description: "currently happening—don’t miss out on the action!",
    href: "#courses",
  },
];

export const COURSE_ICON_STRIP = { width: 460, height: 130 } as const;

export const COURSE_ICONS: readonly CourseIcon[] = [
  { src: "/images/courses/react.svg", x: 0, y: 6, width: 94, height: 94 },
  { src: "/images/courses/social.svg", x: 116, y: 0, width: 126, height: 126 },
  { src: "/images/courses/vue.svg", x: 237, y: 0, width: 116, height: 130 },
  { src: "/images/courses/design.png", x: 370, y: 17, width: 89, height: 71 },
];
