'use client';

import React from 'react'
import { ThemeProvider as ColorProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

type Props = {}

const ColorThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <ColorProvider {...props}>{children}</ColorProvider>
}

export default ColorThemeProvider