'use client';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-full bg-ink px-5 py-2 text-[0.8125rem] font-medium text-on-primary transition-transform active:scale-[0.97]"
    >
      PDF로 저장 / 인쇄
    </button>
  );
}
