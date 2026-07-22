export function FormattedText({ text }: { text: string }) {
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
