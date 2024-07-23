import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NFT Gallary",
  description: "Find NFTs related to address and other side address",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/photo.png" type="image/png" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
