import { Blog } from "@/components/blocks/blog";
import { Experience } from "@/components/blocks/experience";
import { Hero } from "@/components/blocks/hero";
import { Projects } from "@/components/blocks/projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <Experience />
      <Projects />
      <Blog />
    </main>
  );
}
