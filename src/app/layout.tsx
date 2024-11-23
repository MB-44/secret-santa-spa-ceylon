import type { Metadata } from "next";
import NavigationBar from "./comp/navBar/navBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Santa",
  description: "Spa Ceylon, Sri Lanka",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        <NavigationBar/>
        <main>{children}</main>
      </body>
    </html>
  );
}
