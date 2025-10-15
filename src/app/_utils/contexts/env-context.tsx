"use client";

import { PropsWithChildren, createContext, useContext } from "react";

type EnvContextValue = {
  openWeatherMapApiKey: string;
  imageQuality: number;
  searchHistoryLimit: number;
};

const EnvContext = createContext<EnvContextValue | null>(null);

type EnvProviderProps = PropsWithChildren<{
  value: EnvContextValue;
}>;

export function EnvProvider({ value, children }: EnvProviderProps) {
  return <EnvContext.Provider value={value}>{children}</EnvContext.Provider>;
}

export function useEnvContext() {
  const context = useContext(EnvContext);

  if (!context) {
    throw new Error("useEnvContext must be used within an EnvProvider");
  }

  return context;
}

export type { EnvContextValue };
