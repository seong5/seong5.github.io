export default function Hero() {
  return (
    <header className="max-w-[1080px] px-[72px] pb-[84px] pt-[64px] max-nav:px-[22px] max-nav:pb-[52px] max-nav:pt-[44px]">
      <div className="mb-[26px] flex flex-wrap items-center gap-[10px] text-[1rem] font-medium text-mute">
        <span>실패를 두려워하지 않는 프론트엔드 개발자</span>
      </div>

      <h1 className="font-display uppercase leading-[0.9] tracking-[-0.01em] text-ink text-[clamp(3.75rem,12vw,7.5rem)]">
        Frontend
        <br />
        Developer
      </h1>

      <p className="mt-[34px] max-w-[36ch] text-[clamp(1.375rem,3vw,2rem)] font-medium leading-[1.25] tracking-[-0.01em] text-ink break-keep">
        빠르게 배우고 적용하며 끝까지 파고들어
        <br />
        문제를 확실한 성과로 만듭니다.
      </p>

      <p className="mt-6 max-w-[80ch] text-[1rem] font-normal leading-[1.8] text-charcoal break-keep">
        개발하며 마주한 불편함과 문제점을 그냥 넘기지 않고 하나의 서비스나 기능으로 풀어내며
        성취감을 느끼는 개발자입니다. <br /> 생소한 지식이라도 두려움보다 호기심과 도전으로 빠르게
        수용하고 학습해나가며 실무에 적용하는 것을 좋아합니다. <br /> 사용자 피드백과 문제 지점을
        파고들어 눈에 보이는 성과로 전환하여 사용할수록 더욱 나아지는 서비스를 만드는 데 집중합니다.
      </p>
    </header>
  );
}
