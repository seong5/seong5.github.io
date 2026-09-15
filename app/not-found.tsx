import Link from 'next/link';
import { Button } from './components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-8 text-center">
      <span className="font-display text-[clamp(3rem,10vw,6rem)] leading-none text-primary">
        404
      </span>
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-h2 font-bold text-foreground">페이지를 찾을 수 없습니다</h1>
        <p className="text-body text-muted-foreground">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
      </div>
      <Button asChild size="track">
        <Link href="/">메인으로 돌아가기</Link>
      </Button>
    </div>
  );
}
