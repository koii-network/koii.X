import { FundingPage } from "components/funding";
import type { FundingConfig } from "components/funding";

const fundingConfig: FundingConfig = {
  title: "Plagiarism Registry DAO",
  companyLogo: "https://pbs.twimg.com/profile_images/1424786684194041859/lkDa9l1U_400x400.png",
  companyName: "Koii Network Creator Studio",
  raised: 64.2,
  goal: 1000,
  images: [
    { src: "https://picsum.photos/700" },
    { src: "https://picsum.photos/701" },
    { src: "https://picsum.photos/702" },
    { src: "https://picsum.photos/703" },
    { src: "https://picsum.photos/704" },
    { src: "https://picsum.photos/705" }
  ],
  socials: {
    website: "https://koii.network",
    twitter: "https://koii.network",
    discord: "https://koii.network",
    facebook: "https://koii.network",
    github: "https://koii.network"
  },
  paymentType: "eth",
  fundContract: "0xde0b0xde0b0xde0b0xde0b", // this is a dummy eth address
  tokenContract: "0xde0b0xde0b0xde0b0xde0b", // this is a dummy eth address
  about: (
    <div>
      <p>
        Mauris euismod pellentesque tincidunt. Aliquam commodo molestie est tristique aliquam. Nullam lorem elit, tristique mattis lorem vestibulum, malesuada congue sapien. Cras in elit nec tortor
        consectetur viverra. Sed pharetra facilisis sollicitudin. Sed at aliquam magna, aliquet aliquet urna. Sed semper eget felis eu tristique.
      </p>
      <ul>
        <li>Praesent varius laoreet tristique.</li>
        <li>Donec nisl magna, elementum et pharetra et, iaculis vel massa. </li>
        <li>Vivamus eu porta purus. </li>
      </ul>
    </div>
  ),
  faqs: [
    { question: "Question 1", answer: "Answer 1" },
    { question: "Question 2", answer: "Answer 2" },
    { question: "Question 3", answer: "Answer 3" }
  ],
  nfts: [
    {
      id: "LRJM-P4zZg8bYKWv1RXVMAlrwFARBniCjZHv0du9MPc",
      title: "Title",
      description: "what you get sse quis justo quis neque aliqua pulvinar id et tortor. Aliquam sagittis, elit aliquam maxim",
      contentType: "image/jpeg",
      amount: 5,
      usd: 252.4,
      isFeatured: true,
      claimed: "12/50"
    },
    {
      id: "w3shNhou1fxBcMHc_9KAA5iLphy47wKDDn_v3WPk6co",
      title: "Title",
      description: "what you get sse quis justo quis neque aliqua pulvinar id et tortor. Aliquam sagittis, elit aliquam maxim",
      contentType: "image/jpeg",
      amount: 25,
      usd: 1262.0,
      claimed: "4/25"
    }
  ]
};

export function Funding() {
  return (
    <div>
      <FundingPage config={fundingConfig} />
    </div>
  );
}
