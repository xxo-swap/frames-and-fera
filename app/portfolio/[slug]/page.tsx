import { notFound } from "next/navigation";
import { getClientBySlug, getAllClientSlugs } from "@/data/client";
import ClientPortfolioView from "@/components/ClientPortfolioView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllClientSlugs().map((slug) => ({ slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const client = getClientBySlug(slug);

  if (!client) {
    notFound();
  }

  return <ClientPortfolioView key={client.slug} client={client} />;
}