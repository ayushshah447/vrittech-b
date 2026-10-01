export type ServiceSlide = {
  src: string;
  alt: string;
};

export type Partner = {
  name: string;
  logo: string;
  width: number;
  height: number;
};

export const SERVICES_INTRO =
  "Experience our expert solutions tailored to enhance your business with top-tier design, development, and animation.";

export const SERVICE_NAMES: readonly [string, string, string] = ["UI & UX", "Development", "Blockchain"];

const workspace: ServiceSlide = {
  src: "/images/services/workspace.jpg",
  alt: "Designer reviewing a dashboard on a laptop with notes and a calculator on the desk",
};

const conference: ServiceSlide = {
  src: "/images/services/conference.jpg",
  alt: "Conference phone and remote control on a white meeting table",
};

export const SERVICE_SLIDES: readonly ServiceSlide[] = [workspace, conference, workspace, conference];

export const PARTNERS: readonly Partner[] = [
  { name: "Cloud Education", logo: "/images/partners/cloud-education.png", width: 102, height: 75 },
  { name: "CMC", logo: "/images/partners/cmc.png", width: 143, height: 52 },
  { name: "IT SNP", logo: "/images/partners/it-snp.png", width: 120, height: 72 },
  { name: "Zebec", logo: "/images/partners/zebec.png", width: 139, height: 41 },
];
