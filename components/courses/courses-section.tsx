import { COURSE_STATS } from "@/content/courses";
import { CourseStats } from "./course-stats";

export function CoursesSection() {
  return (
    <section id="courses" aria-labelledby="courses-heading" className="py-16 md:py-20 xl:py-[100px]">
      <div className="shell flex flex-col gap-10 xl:gap-12">
        <div className="flex flex-col gap-3 md:gap-5">
          <p className="font-outfit text-lg leading-[1.26] text-body md:text-2xl">
            Explore our classes and master trending skills!
          </p>
          <h2 id="courses-heading" className="font-display text-[26px] leading-[1.2] font-bold text-heading md:text-[32px]">
            Dive Into <span className="text-mint">What’s Hot Right Now!</span> <span aria-hidden="true">🔥</span>
          </h2>
        </div>
        <CourseStats stats={COURSE_STATS} />
      </div>
    </section>
  );
}
