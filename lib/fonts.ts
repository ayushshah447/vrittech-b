import { Archivo, Manrope, Outfit, Plus_Jakarta_Sans } from "next/font/google";

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-plus-jakarta",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-manrope-family",
});

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-outfit-family",
});

export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
});

export const fontVariables = [plusJakarta, manrope, outfit, archivo]
  .map((font) => font.variable)
  .join(" ");
