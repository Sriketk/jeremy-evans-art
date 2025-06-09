"use client"
import { createContext, ReactNode } from "react";

export const HomeContext = createContext<any>(null);

export const HomeContextProvider = ({
  homePageContent,
  children,
}: {
  homePageContent: any;
  children: ReactNode;
}) => {
  return <HomeContext.Provider value={homePageContent}>{children}</HomeContext.Provider>;
};