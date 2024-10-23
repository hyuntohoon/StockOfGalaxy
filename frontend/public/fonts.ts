import { Alef } from "next/font/google";
import { IBM_Plex_Sans_KR } from "next/font/google";

export const alef = Alef({
  subsets: ['latin'],
  weight: '400',
});

export const ibm = IBM_Plex_Sans_KR(
  { weight: '400',
    subsets: ['latin'],

  }
)