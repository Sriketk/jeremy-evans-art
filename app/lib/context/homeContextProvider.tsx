"use client";
import { createContext, ReactNode } from "react";
import { HomePageType, AboutPageType } from "../types";

export const HomeContext = createContext<any>(null);

export const HomeContextProvider = ({
  homePageContent,
  aboutPageContent,
  children,
}: {
  homePageContent: HomePageType["fields"];
  aboutPageContent: AboutPageType["fields"];
  children: ReactNode;
}) => {
  return (
    <HomeContext.Provider value={{ homePageContent, aboutPageContent }}>
      {children}
    </HomeContext.Provider>
  );
};
