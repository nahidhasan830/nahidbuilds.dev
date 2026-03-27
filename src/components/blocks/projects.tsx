import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons/github";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { type Project, type ProjectStatus, projects } from "@/data/projects";
import { cn } from "@/lib/utils";

function getGridConfig(count: number): {
  gridClass: string;
  getItemClass: (index: number) => string;
} {
  switch (count) {
    case 1:
      return {
        gridClass: "grid grid-cols-1",
        getItemClass: () => "",
      };
    case 2:
      return {
        gridClass: "grid grid-cols-1 gap-4 md:grid-cols-2",
        getItemClass: () => "",
      };
    case 3:
      return {
        gridClass: "grid grid-cols-1 gap-4 md:grid-cols-2",
        getItemClass: (i) => (i === 0 ? "md:col-span-2" : ""),
      };
    case 4:
      return {
        gridClass: "grid grid-cols-1 gap-4 md:grid-cols-2",
        getItemClass: () => "",
      };
    default:
      return {
        gridClass: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4",
        getItemClass: (i) => (i === 0 ? "md:col-span-2 md:row-span-2" : ""),
      };
  }
}

const statusConfig: Record<
  ProjectStatus,
  {
    label: string | null;
    footerText: string | null;
    highlighted: boolean;
  }
> = {
  live: { label: null, footerText: null, highlighted: false },
  "in-progress": {
    label: "Building",
    footerText: "Actively developing",
    highlighted: true,
  },
  planned: {
    label: "Planned",
    footerText: "On the roadmap",
    highlighted: false,
  },
};

function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const hasLinks = project.githubUrl || project.liveUrl;
  const config = statusConfig[project.status];

  return (
    <Card
      className={cn(
        "flex flex-col transition-all duration-150 hover:scale-[1.01]",
        config.highlighted && "ring-2 ring-primary/40",
        className,
      )}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>{project.title}</CardTitle>
          {config.label && (
            <Badge className="border-primary/20 bg-primary/10 text-primary">
              {config.label}
            </Badge>
          )}
        </div>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        {!hasLinks && config.footerText ? (
          <span className="text-sm text-muted-foreground">
            {config.footerText}
          </span>
        ) : (
          <>
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <GithubIcon data-icon="inline-start" className="size-3.5" />
                  Code
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button size="sm" asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} live`}
                >
                  <ExternalLink data-icon="inline-start" className="size-3.5" />
                  Live
                </a>
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export function Projects() {
  const gridConfig = getGridConfig(projects.length);

  return (
    <Section id="projects">
      <div className="mb-8">
        <h2 className="mb-3 text-3xl font-bold tracking-tight md:text-4xl">
          Projects
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground">
          A selection of projects I've built. Each one taught me something new.
        </p>
      </div>

      <div className={gridConfig.gridClass}>
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            className={gridConfig.getItemClass(index)}
          />
        ))}
      </div>
    </Section>
  );
}
