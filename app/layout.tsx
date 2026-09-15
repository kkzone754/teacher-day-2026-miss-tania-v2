import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "To Miss Tania — A Teacher's Day Memory",
  description: "A small interactive Teacher's Day memory made especially for Miss Tania.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
