export default function SectionHead({ idx, title }: { idx: string; title: string }) {
  return (
    <div className="mb-11 flex items-baseline gap-4 max-nav:mb-8">
      <span className="font-mono text-[1.1875rem] text-accent">{idx}</span>
      <h2 className="font-mono text-[1.1875rem] font-medium uppercase tracking-[.1em] text-ink">
        {title}
      </h2>
    </div>
  );
}
