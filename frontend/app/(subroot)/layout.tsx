import type { Metadata } from "next";

import PageLayout from "@/layouts/pageLayout";
import TestDispatch from "@/components/Text";

export const metadata: Metadata = {
  title: "Dis Displays",
  description: "A Ecommerce store for all your car accessories and car display needs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageLayout root={false}>{children}</PageLayout>;
}
