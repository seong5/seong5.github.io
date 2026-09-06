"use client"

// ⚠️ 이 프로젝트는 커스텀 타입 스케일(text-eyebrow/meta/label/body/read/lead/title)과
// radius(rounded-chip/card/panel/media/inset)를 쓴다. twMerge는 이 이름들을 폰트 크기·
// radius로 인식하지 못해 shadcn 기본값(text-sm·rounded-md)을 className으로 덮어쓸 수 없다
// (둘 다 살아남고 CSS 순서가 이긴다). 그래서 기본 클래스에서 그 둘을 뺐다.
// 앞으로 shadcn add 로 컴포넌트를 추가할 때도 같은 손질이 필요하다.
import * as React from "react"
import { cn } from "cn"
import { Accordion as AccordionPrimitive } from "radix-ui"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/acc flex flex-1 items-start justify-between gap-4 py-4 text-left font-medium outline-none transition-colors disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        {/* 이 사이트는 아이콘을 유니코드 글리프로 통일한다 — lucide 대신 +/− */}
        <span
          aria-hidden
          className="pointer-events-none flex-none font-mono text-body text-muted-foreground"
        >
          <span className="group-data-[state=open]/acc:hidden">+</span>
          <span className="hidden group-data-[state=open]/acc:inline">−</span>
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
