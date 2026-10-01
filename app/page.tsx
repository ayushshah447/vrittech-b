import { CoursesSection } from "@/components/courses/courses-section";
import { ServicesSection } from "@/components/services/services-section";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <ServicesSection />
      <CoursesSection />
    </main>
  );
}
