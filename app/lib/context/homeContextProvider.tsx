"use client";
import { createContext, ReactNode } from "react";

export const HomeContext = createContext<any>(null);

export const HomeContextProvider = ({
  homePageContent,
  aboutPageContent,
  children,
}: {
  homePageContent: any;
  aboutPageContent: any;
  children: ReactNode;
}) => {
  return (
    <HomeContext.Provider value={{ homePageContent, aboutPageContent }}>
      {children}
    </HomeContext.Provider>
  );
};
