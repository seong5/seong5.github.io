export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas">
      <div
        role="status"
        aria-label="불러오는 중"
        className="h-8 w-8 animate-spin motion-reduce:animate-none rounded-full border-2 border-hairline border-t-accent"
      />
    </div>
  );
}
