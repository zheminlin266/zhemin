import { IBM_Plex_Sans } from "next/font/google";

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: false,
});
