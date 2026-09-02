import { Button } from './components/ui';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-8 text-center">
      <span className="font-display text-[clamp(3rem,10vw,6rem)] leading-none text-accent">
        404
      </span>
      <div className="flex flex-col gap-2">
        <h1 className="text-title font-bold text-text">페이지를 찾을 수 없습니다</h1>
        <p className="text-body text-muted">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
      </div>
      <Button href="/">메인으로 돌아가기</Button>
    </div>
  );
}
