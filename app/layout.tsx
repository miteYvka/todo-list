import type { Metadata } from "next";
import PageLayout from "@/modules/PageLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "todo-task",
  description: "example",
};

export default function RootLayout({ children }: {children: React.ReactNode;}) {
  return (
    <PageLayout>{children}</PageLayout>
  );
}
