// base에서 rounded-*·text-*·font-*를 뺐다. 뱃지는 자리마다 radius(pill/각진 태그)와
// 타입 스케일이 다르다 — radius는 variant가 정하고, 타이포는 호출부가 className으로 준다.
// 커스텀 스케일이 병합 엔진에 등록된 덕에(./cn) variant의 색과 호출부의 text-label이
// 서로를 지우지 않는다.
//
// base의 `border border-transparent`는 shadcn 원본 그대로 둔다. solid와 outline이
// 같은 높이로 서야 칩 행이 흐트러지지 않는다.
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./cn"
import { Slot } from "radix-ui"

const badgeVariants = cva(
  // 포커스 표시는 globals.css의 전역 :focus-visible 아웃라인 하나로 통일한다 (button.tsx와 같은 이유)
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border border-transparent whitespace-nowrap transition-colors aria-invalid:border-destructive [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        solid: "rounded-chip bg-muted text-foreground",
        outline: "rounded-chip border-border text-muted-foreground",
        // 점선은 "아직 내용이 없는 자리"를 뜻하는 이 사이트 고유 어휘다 (button.tsx와 공유)
        dashed: "rounded-chip border-dashed border-border text-muted-foreground",
        // 각진 모노 태그 — 스택 태그·지표 뱃지가 쓰는 pill의 대구
        tag: "rounded-[6px] bg-muted text-foreground",
      },
      size: {
        sm: "px-2.5 py-1",
        md: "px-3 py-[7px]",
        lg: "px-[18px] py-2.5",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "sm",
    },
  }
)

function Badge({
  className,
  variant = "solid",
  size = "sm",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
