export interface FundingConfig {
  title: string;
  companyLogo: string;
  companyName: string;
  raised: number;
  goal: number;
  images: Array<{ src: string }>;
  socials: Record<string, string>;
  paymentType: "eth";
  fundContract: string;
  tokenContract: string;
  about: JSX.Element;
  faqs?: Array<{ question: string; answer: string }>;
  nfts: Array<Record<string, any>>;
}
