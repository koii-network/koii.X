// ui
import { Box, Grid, Flex, Stack, Text, Image, Button, Link, Tabs, TabList, TabPanels, Tab, TabPanel, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from "@chakra-ui/react";
import { FundingNav, FundingGallery, FundingSocials, FundingBar, FundingContent, FundingCard } from "components/funding";
// icons
import { RiExternalLinkLine } from "react-icons/ri";

interface Props {
  config: {
    title: string;
    images: Array<{ src: any }>;
    companyName: string;
    companyLogo: string;
    socials: Record<string, any>;
    raised: number;
    goal: number;
    fundContract: string;
    tokenContract: string;
    about: any;
    faqs: Array<Record<string, any>>;
    nfts: Array<Record<string, any>>;
  };
}

export function FundingPage({ config }: Props) {
  function openFundingModal() {}
  return (
    <Box>
      <FundingNav title={config?.title} openFundingModal={openFundingModal} />
      <Box bg="#F5F5F5" color="blue.500" py={{ base: "8", lg: "16" }} minH="100vh">
        <Box mx="auto" maxW="1180px" px="4">
          {/* Grid #1 */}
          <Grid templateColumns={{ base: "1fr", lg: "640px 1fr" }} gap={{ base: 8, lg: 12 }} minW="0">
            {/* Slider */}
            <FundingGallery images={config?.images} />
            {/* Project Details */}
            <Flex order={{ base: "1", lg: "2" }} flexDir="column" justify="flex-start" pt={{ base: "0", lg: "8" }}>
              <Text as="h2" fontSize="32px" fontWeight="600" noOfLines={2} mb="2" lineHeight="normal">
                {config?.title}
              </Text>
              <Text noOfLines={2} lineHeight="normal">
                Fighting plagiarism with a searchable, creator-owned world wide registry. Get rewarded for your work.
              </Text>

              {/* Company */}
              <Stack direction="row" spacing="18px" align="center" mt="22px" mb={{ base: "30px", lg: "60px" }}>
                {/* Logo */}
                <Image src={config?.companyLogo} alt="logo" boxSize="52px" rounded="full" />
                <div>
                  <Text fontSize="lg" mb="2px">
                    {config?.companyName}
                  </Text>
                  <FundingSocials socials={config?.socials} />
                </div>
              </Stack>
              {/* Bar */}
              <FundingBar raised={config?.raised} goal={config?.goal} />

              {/* Actions */}

              <Stack direction="row" spacing="4" my="25px">
                <Button size="md">Back Project</Button>
                <Button size="md" variant="outline">
                  Back with a Different Currency
                </Button>
              </Stack>

              <Stack direction="row" spacing="4">
                <Button as={Link} href={config?.fundContract} isExternal size="xs" rightIcon={<RiExternalLinkLine />} colorScheme="gray" isActive>
                  Fund Contract
                </Button>
                <Button as={Link} href={config?.tokenContract} isExternal size="xs" rightIcon={<RiExternalLinkLine />} colorScheme="gray" isActive>
                  Token Contract
                </Button>
              </Stack>
            </Flex>
          </Grid>

          <Box as="hr" mt="40px" mb="20px" borderColor="#cdcde4" />
          <Grid templateColumns={{ base: "1fr", lg: "716px 1fr" }} gap={{ base: 8, lg: 16 }} minW="0">
            {/* About */}
            <Tabs>
              <TabList>
                <Tab>About</Tab>
                <Tab>FAQ</Tab>
              </TabList>

              <TabPanels>
                {/* About */}
                <TabPanel>
                  <FundingContent>{config?.about}</FundingContent>
                </TabPanel>
                {/* FAQ */}
                <TabPanel>
                  <Accordion>
                    {config?.faqs?.map((faq: any, idx: number) => (
                      <AccordionItem key={idx}>
                        <h2>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              {faq?.question}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>{faq?.answer}</AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabPanel>
              </TabPanels>
            </Tabs>
            {/* Nfts */}
            <Stack w="100%" spacing="8" mt="8">
              {config?.nfts?.map((nft: any, idx: number) => (
                <FundingCard key={idx} item={nft} />
              ))}
            </Stack>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
