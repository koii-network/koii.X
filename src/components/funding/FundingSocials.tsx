import React from "react";
import { Stack, IconButton, Link, StackProps } from "@chakra-ui/react";
// icons
import { FaDiscord } from "react-icons/fa";
import { RiTwitterLine, RiFacebookFill, RiGlobalLine, RiGithubLine } from "react-icons/ri";

interface Props extends StackProps {
  socials: {
    website?: string;
    twitter?: string;
    discord?: string;
    facebook?: string;
    github?: string;
  };
}

const socialButtonStyles = {
  size: "16px",
  boxSize: "24px",
  variant: "ghost",
  rounded: "full",
  isExternal: true,
  _focus: {
    bg: "transparent",
    boxShadow: "none"
  },
  _active: {
    bg: "transparent"
  },
  _hover: {
    bg: "transparent"
  }
};
export function FundingSocials({ socials, ...restProps }: Props) {
  return (
    <Stack w="100%" justify="flex-start" align="center" spacing="4" direction="row" {...restProps}>
      {/* Social Share */}
      {socials?.website && <IconButton as={Link} href={socials?.website} aria-label="twitter" icon={<RiGlobalLine size="30px" />} {...socialButtonStyles} />}
      {socials?.twitter && <IconButton as={Link} href={socials?.twitter} aria-label="twitter" icon={<RiTwitterLine size="30px" />} {...socialButtonStyles} />}
      {socials?.discord && <IconButton as={Link} href={socials?.discord} aria-label="discord" icon={<FaDiscord size="30px" />} {...socialButtonStyles} />}
      {socials?.facebook && <IconButton as={Link} href={socials?.facebook} aria-label="facebook" icon={<RiFacebookFill size="30px" />} {...socialButtonStyles} />}
      {socials?.github && <IconButton as={Link} href={socials?.github} aria-label="github" icon={<RiGithubLine size="30px" />} {...socialButtonStyles} />}
    </Stack>
  );
}
