"use client";

import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";

interface PreviewModeProviderProps {
  children: React.ReactNode;
  previewProp?: false | true;
}

type PreviewModeContextType = {
  preview: false | true;
  setPreview: React.Dispatch<React.SetStateAction<PreviewModeContextType['preview']>>;
}

export const PreviewModeContext = createContext<PreviewModeContextType>({
  preview: false,
  setPreview: () => { },
})

const PreviewModeProvider: React.FC<PreviewModeProviderProps> = ({ children, previewProp }) => {
  const [preview, setPreview] = useState<PreviewModeContextType['preview']>(previewProp || false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) {
    return null;
  }

  return (
    <PreviewModeContext.Provider value={{ preview, setPreview }}>
      {children}
    </PreviewModeContext.Provider>
  )
};

export const usePreviewMode = () => {
  const context = useContext(PreviewModeContext);
  console.log('context', context)
  if (!context) {
    throw new Error("usePreviewMode must be used within a PreviewModeProvider");
  }

  return context;
};

export default PreviewModeProvider;