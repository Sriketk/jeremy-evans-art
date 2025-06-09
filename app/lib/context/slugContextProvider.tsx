"use client";
import { createContext, ReactNode } from "react";

export const Slug = createContext<any>(null);

export const SlugContextProvider = ({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) => {
  return <Slug.Provider value={{ slug }}>{children}</Slug.Provider>;
};
