import { differenceInMonths, format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import {
  type Experience as ExperienceData,
  experiences,
} from "@/data/experience";
import { cn } from "@/lib/utils";

function formatDate(dateStr: string): string {
  return format(parseISO(`${dateStr}-01`), "MMM yyyy");
}

function getDuration(start: string, end: string | null): string {
  const startDate = parseISO(`${start}-01`);
  const endDate = end ? parseISO(`${end}-01`) : new Date();

  const totalMonths = differenceInMonths(endDate, startDate);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) return `${months} mo`;
  if (months === 0) return years === 1 ? `${years} yr` : `${years} yrs`;
  return `${years} yr ${months} mo`;
}

function FormattedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          const content = part.slice(2, -2);
          return (
            <strong key={content} className="font-semibold text-foreground">
              {content}
            </strong>
          );
        }
        return <span key={part}>{part}</span>;
      })}
    </>
  );
}

function TimelineItem({
  experience,
  isLast,
}: {
  experience: ExperienceData;
  isLast: boolean;
}) {
  const isCurrent = experience.endDate === null;
  const dateRange = `${formatDate(experience.startDate)} – ${experience.endDate ? formatDate(experience.endDate) : "Present"}`;
  const duration = getDuration(experience.startDate, experience.endDate);

  return (
    <div className="flex gap-4 md:gap-6 lg:gap-8">
      {/* Left: Date info - hidden on mobile */}
      <div className="hidden w-36 shrink-0 pt-1 text-right md:block lg:w-44">
        <p className="text-sm font-medium text-foreground">{dateRange}</p>
        <p className="text-sm text-muted-foreground">{duration}</p>
        {isCurrent && (
          <Badge className="mt-1.5 border-primary/20 bg-primary/10 text-primary text-xs">
            Current
          </Badge>
        )}
      </div>

      {/* Center: Timeline */}
      <div className="flex flex-col items-center">
        {isCurrent ? (
          <span className="relative z-10 flex size-4 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-4 rounded-full border-[3px] border-primary bg-background" />
          </span>
        ) : (
          <span className="relative z-10 size-4 shrink-0 rounded-full border-[3px] border-muted-foreground/40 bg-background" />
        )}
        {!isLast && <div className="w-0.5 grow bg-border" />}
      </div>

      {/* Right: Content card */}
      <div className={cn("flex-1 pb-6 sm:pb-8 md:pb-10", isLast && "pb-0")}>
        <div
          className={cn(
            "rounded-xl border bg-card p-4 sm:p-5 md:p-6",
            isCurrent ? "border-primary/30" : "border-border",
          )}
        >
          {/* Mobile date - shown only on mobile */}
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground md:hidden">
            <span>{dateRange}</span>
            <span>·</span>
            <span>{duration}</span>
            {isCurrent && (
              <Badge className="border-primary/20 bg-primary/10 text-primary text-[10px]">
                Current
              </Badge>
            )}
          </div>

          <header className="mb-3 sm:mb-4">
            <h3 className="text-base font-semibold sm:text-lg md:text-xl">
              {experience.role}
            </h3>
            <p className="text-sm text-primary">{experience.company}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {experience.location} ·{" "}
              {experience.locationType.charAt(0).toUpperCase() +
                experience.locationType.slice(1)}
            </p>
          </header>

          <ul className="mb-4 space-y-2">
            {experience.achievements.map((achievement) => (
              <li
                key={achievement}
                className="flex gap-2 text-xs leading-relaxed text-foreground/80 sm:text-sm"
              >
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary/50 sm:size-1.5" />
                <span>
                  <FormattedText text={achievement} />
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 border-t border-border/50 pt-3 sm:pt-4">
            {experience.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-[10px] sm:text-xs"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <Section id="experience">
      <div className="mb-6 sm:mb-8">
        <h2 className="mb-2 text-2xl font-bold tracking-tight sm:mb-3 sm:text-3xl md:text-4xl">
          Experience
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg">
          4+ years building full-stack features for traffic analytics and road
          safety platforms, serving public and private sector clients.
        </p>
      </div>

      <div>
        {experiences.map((exp, index) => (
          <TimelineItem
            key={exp.id}
            experience={exp}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </Section>
  );
}
