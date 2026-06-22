export default function SectionHead({
  idx,
  title,
  rule = true,
}: {
  idx: string;
  title: string;
  rule?: boolean;
}) {
  return (
    <div className="mb-11 flex items-baseline gap-4 max-nav:mb-8">
      <span className="font-mono text-[0.875rem] text-accent">{idx}</span>
      <h2 className="font-mono text-[1.0625rem] font-medium uppercase tracking-[.12em] text-ink">
        {title}
      </h2>
      {rule && <span className="h-px flex-1 self-center bg-line"></span>}
    </div>
  );
}
