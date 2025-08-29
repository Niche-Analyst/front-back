// front/components/ThemeProvider.tsx
"use client"

import * as React from "react"
// 'next-themes'에서 ThemeProviderProps를 직접 import 합니다.
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}