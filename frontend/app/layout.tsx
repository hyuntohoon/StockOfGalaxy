import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MenuHeader from "./components/organisms/Banner/MenuHeader";
import "./globals.css";
import RecoilRootWrapper from "./components/atoms/RecoilRootWrapper";
import { ibm } from '@/public/fonts'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock of Galaxy",
  description: "우주 주식 시간여행 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={ibm.className}>
        
        <RecoilRootWrapper>
          <MenuHeader />
          {children}
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
