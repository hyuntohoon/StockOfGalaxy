

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MenuHeader from "./components/organisms/Banner/MenuHeader";
import StockHeader from "./components/organisms/Banner/StockHeader";
import "./globals.css";
import RecoilRootWrapper from "./components/atoms/RecoilRootWrapper";
import { ibm } from '@/public/fonts';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import StockTemplate from "./components/organisms/stock/StockTemplate";
import MSWComponent from "./components/MSWComponent";

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
        <MSWComponent /> {/* Mock Service Worker */}
        <RecoilRootWrapper>
          <MenuHeader />
         
              {children}  {/* 페이지의 자식 요소 */}
         <StockHeader />
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
