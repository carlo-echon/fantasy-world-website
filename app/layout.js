import { Inter } from "next/font/google";
import "./globals.css";
import LocalFont from 'next/font/local'
import {Providers} from "./providers";

const inter = Inter({ subsets: ["latin"] });
const jancient = LocalFont({src: 'ui/jancient.ttf'})

export const metadata = {
  title: "FantasyLand",
  description: "A coding and worldbuilding project by Carlo E.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jancient.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
