"use client"

import * as React from "react"
import { cn } from "./cn"
import { Switch as SwitchPrimitive } from "radix-ui"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default" | "lg"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        // 포커스 표시는 globals.css의 전역 :focus-visible 아웃라인 하나로 통일한다 (button/badge와 같은 이유)
        "peer group/switch inline-flex shrink-0 cursor-pointer items-center rounded-full border transition-all disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 data-[size=lg]:h-[26px] data-[size=lg]:w-[44px] border-border data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-white ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=lg]/switch:size-[22px] data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
