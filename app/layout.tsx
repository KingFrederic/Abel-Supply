import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'IDOWU MATÉRIAUX',
  description: 'Fournisseur direct de matériaux de construction à Abidjan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

export async function generateStaticParams() {
  return [];
}
