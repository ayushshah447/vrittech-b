"use client";

import { useState } from "react";
import type { CourseStat, CourseStatId } from "@/content/courses";
import { StatCard } from "./stat-card";

type CourseStatsProps = {
  stats: readonly CourseStat[];
};

export function CourseStats({ stats }: CourseStatsProps) {
  const [activeId, setActiveId] = useState<CourseStatId>(stats[0].id);

  return (
    <div className="@container flex flex-col gap-4 sm:gap-6 xl:h-[461px] xl:flex-row xl:gap-8">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} active={stat.id === activeId} onSelect={setActiveId} />
      ))}
    </div>
  );
}
