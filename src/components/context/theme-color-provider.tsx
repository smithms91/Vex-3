"use client";

import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface ThemeColorProviderProps {
  children: React.ReactNode;
  colorProp?: 'light' | 'dark' | 'black';
}

export type ThemeColorContextType = {
  color: 'light' | 'dark' | 'black';
  setColor: React.Dispatch<React.SetStateAction<ThemeColorContextType['color']>>;
}

export const ThemeColorContext = createContext<ThemeColorContextType>({
  color: 'dark',
  setColor: () => { },
})

const ThemeColorProvider: React.FC<ThemeColorProviderProps> = ({ children, colorProp }) => {
  const [color, setColor] = useState<ThemeColorContextType['color']>(colorProp || 'dark');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeColorContext.Provider value={{ color, setColor }}>
      {children}
    </ThemeColorContext.Provider>
  )
};

export const useThemeColor = () => {
  const context = useContext(ThemeColorContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};

export default ThemeColorProvider;