import { SlugContextProvider } from "@/app/lib/context/slugContextProvider";

export default async function slugLayout({
  params,
  children,
}: {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}) {
  const { slug } = await params;
  return <SlugContextProvider slug={slug}>{children}</SlugContextProvider>;
}
