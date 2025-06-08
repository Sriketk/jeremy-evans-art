"use client"
import { createContext, ReactNode } from "react";

export const HomeContext = createContext<any>(null);

export const HomeContextProvider = ({
  value,
  children,
}: {
  value: any;
  children: ReactNode;
}) => {
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};