"use client";

import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface IconBorderProviderProps {
  children: React.ReactNode;
  roundedProp?: 'small' | 'large' | 'full';
}

type IconBorderContextType = {
  rounded: 'small' | 'large' | 'full';
  setRounded: React.Dispatch<React.SetStateAction<IconBorderContextType['rounded']>>;
}

export const IconBorderContext = createContext<IconBorderContextType>({
  rounded: 'full',
  setRounded: () => { },
})

const IconBorderProvider: React.FC<IconBorderProviderProps> = ({ children, roundedProp }) => {
  const [rounded, setRounded] = useState<IconBorderContextType['rounded']>(roundedProp || 'full');
  const [isMounted, setIsMounted] = useState(false);

  console.log()

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <IconBorderContext.Provider value={{ rounded, setRounded }}>
      {children}
    </IconBorderContext.Provider>
  )
};

export const useIconBorder = () => {
  const context = useContext(IconBorderContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};

export default IconBorderProvider;