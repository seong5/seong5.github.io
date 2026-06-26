'use client';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-[6px] bg-accent px-[14px] py-[8px] font-mono text-[0.78125rem] font-medium text-panel transition-opacity hover:opacity-90"
    >
      PDF로 저장 / 인쇄
    </button>
  );
}
