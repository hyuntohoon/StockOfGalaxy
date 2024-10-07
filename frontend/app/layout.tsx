import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MenuHeader from "./components/organisms/Banner/MenuHeader";
import "./globals.css";
import RecoilRootWrapper from "./components/atoms/RecoilRootWrapper";
import { ibm } from '@/public/fonts';
import ChartToggleButton from "./components/atoms/Button/ChartToggleButton"; // ChartToggleButton 불러오기
import ConditionalBackground from "./components/organisms/background/ConditionalBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stock of Galaxy",
  description: "우주 주식 시간여행 플랫폼",
  icons: {
    icon: "/images/character/5.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={ibm.className}>
        <ConditionalBackground />
        <RecoilRootWrapper>
          <MenuHeader />
          <ChartToggleButton />
          {children} {/* 페이지의 자식 요소 */}
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
