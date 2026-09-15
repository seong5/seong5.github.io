// ⚠️ 이 프로젝트는 커스텀 타입 스케일(text-eyebrow/meta/label/body/…)과
// radius(rounded-chip/card/panel/media/inset)를 쓴다. 병합 엔진은 이 이름들을 모르면
// text-*를 폰트 크기가 아니라 "텍스트 색"으로 분류해 variant의 색을 조용히 지운다.
// 그래서 ./cn 에 스케일을 등록해 두었다 — cn 은 "cn" 패키지가 아니라 ./cn 에서 가져온다.
//
// radius는 base가 아니라 size variant가 정한다. rounded-chip과 rounded-panel(블록
// 버튼)이 서로 다른 자리라 size별로 명시하는 편이 읽힌다.
//
// 아이콘은 lucide 대신 유니코드 글리프로 통일한다(accordion.tsx의 +/− 참조).
// components.json에 iconLibrary를 두지 않는 이유이고, shadcn add 후 딸려 오는
// lucide import는 걷어내야 한다.
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  // 포커스 표시는 globals.css의 전역 :focus-visible 아웃라인 하나로 통일한다 —
  // shadcn 기본 ring을 함께 두면 아웃라인과 링이 이중으로 그려진다.
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 font-semibold whitespace-nowrap transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:-translate-y-0.5",
        outline: "border border-border text-foreground hover:bg-muted",
        // 점선은 "아직 내용이 없는 자리"를 뜻하는 이 사이트 고유 어휘다
        dashed:
          "border border-dashed border-border text-foreground hover:border-solid hover:bg-muted",
      },
      size: {
        // cva의 defaultVariants가 가리키는 값이라 호출부가 없어도 남겨 둔다
        // text-sm(Tailwind 기본)을 쓰면 @theme 스케일을 안 따라가 혼자 작게 남는다
        default: "h-9 rounded-chip px-4 py-2 text-body has-[>svg]:px-3",
        // TRACK 스케일 — h-*로 높이를 고정하지 않고 패딩으로 잡는다
        track: "h-auto rounded-chip px-[22px] py-3.5 text-body",
        // 카드 폭을 꽉 채우는 블록 버튼 (프로젝트 더보기)
        panel: "h-auto w-full rounded-panel p-[18px] text-label",
        "icon-lg": "size-10 rounded-chip",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
