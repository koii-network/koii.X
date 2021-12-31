import { useState, useCallback, ReactNode } from "react";
// context
import { useFinnie } from "components/finnie";
// Dropzone
import { useDropzone } from "react-dropzone";
// ui
import { Box, Center, Text, Stack, FormControl, FormLabel, Input, Textarea, IconButton, Button, Image, Checkbox, Alert, AlertIcon, Spinner, SimpleGrid, Link } from "@chakra-ui/react";
// icons
import { RiArrowLeftLine, RiDeleteBinLine, RiCloseFill } from "react-icons/ri";
// Form
import { useForm } from "react-hook-form";
// utils
import { convertToAr, getMediaType } from "services/utils";
// api
import { initializeArTx, signArTx } from "api/upload";

export function DragAndDropUploader() {
  /* Finnie */
  const {
    state: { connectFinnie, walletAddress, isLoading, walletBalance, isFinnieConnected }
  } = useFinnie();

  const [{ step, status, data }, setState] = useState<{ step: number; status: string; data: any }>({ step: 1, status: "idle", data: null });

  /* Dropzone */
  const onDropAccepted = useCallback(async acceptedFiles => {
    setState(prevState => ({ ...prevState, step: 2, data: { ...data?.prevState, file: acceptedFiles[0], fileThumbnail: URL.createObjectURL(acceptedFiles[0]) } }));
  }, []);
  /* Only images and videos to be uploaded with max file size 15mb. */
  const { getRootProps, getInputProps } = useDropzone({ onDropAccepted, accept: "image/*, video/*", multiple: false, maxSize: 15728640 });

  /* Add nft details form */
  const { handleSubmit, register, reset } = useForm();
  const onSubmit = async (values: any) => {
    try {
      let address: any;
      setState(prevState => ({ ...prevState, status: "loading" }));
      // connect to finnie -if not-
      if (!isFinnieConnected) {
        address = await connectFinnie(true);
      }
      // Initialize a tx to get it's fee.
      await initializeArTx({ walletAddress: walletAddress || address, data: { ...data, ...values } }).then(res => {
        setState(prevState => ({ ...prevState, data: { ...prevState?.data, ...res } }));
      });
      setState(prevState => ({ ...prevState, step: 3, status: "idle", data: { ...prevState?.data, ...values } }));
    } catch (error) {
      setState(prevState => ({ ...prevState, status: "error" }));
    }
  };

  /* helper functions */
  function goToStep(step: number) {
    setState(prevState => ({ ...prevState, step }));
  }
  function doReset() {
    setState({ step: 1, status: "idle", data: null });
    reset();
  }
  async function doSignArTx() {
    try {
      setState(prevState => ({ ...prevState, status: "loading" }));
      await signArTx(data?.tx, data?.initialState, data?.file);
      setState(prevState => ({ ...prevState, step: 4, status: "success", data: { tx: prevState?.data?.tx } }));
    } catch (error) {
      setState(prevState => ({ ...prevState, status: "error" }));
    }
  }

  /* Derived states */
  const isNotEnoughBalance = Number(convertToAr(data?.txFee)) > walletBalance?.ar;

  return (
    <DragAndDropContainer isLoading={isLoading || status === "loading"}>
      {/* Step 1: Drag Container */}
      {step === 1 && (
        <Center flexDir="column" w="100%" bg="gray.100" border="1px dashed" p="2" borderColor="blue.500" rounded="md" cursor="pointer" {...getRootProps()}>
          <input {...getInputProps()} />
          <Box direction="column" maxW="500px" mx="auto">
            <Text fontWeight="600" fontSize="2xl">
              Drag, Drop, Earn.
            </Text>
            <Text fontSize="sm">Click or drag n' drop here to upload. </Text>
          </Box>
        </Center>
      )}
      {/* Step 2: Add nft details + connect to finnie */}
      {step === 2 && (
        <Box maxW="500px" mx="auto" p="2" as="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Top bar */}
          <Stack direction="row" align="center">
            <IconButton aria-label="go-back" variant="ghost" icon={<RiArrowLeftLine size="20px" />} onClick={() => goToStep(1)} />
            <Text fontWeight="600">Add details to your nft</Text>
          </Stack>
          <Stack w="100%" direction={{ base: "column", lg: "row" }} mt="2" spacing="4">
            {/* Thumbnail */}
            <Box mx={{ base: "auto", lg: "unset" }} w="112px" h="112px" flexShrink="0" rounded="sm" overflow="hidden">
              <ThumbnailContainer fileThumbnail={data?.fileThumbnail} file={data?.file} />
            </Box>

            {/* Form */}
            <Stack w="100%">
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input {...register("name", { required: true })} />
              </FormControl>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input {...register("username", { required: true })} />
              </FormControl>
              <FormControl id="tags">
                <FormLabel>Tags</FormLabel>
                <Stack direction="row" align="center">
                  <Input {...register("tags")} placeholder="nsfw,art,holiday, ...etc" />
                  <Checkbox {...register("isNsfw")} flexShrink="0">
                    NSFW
                  </Checkbox>
                </Stack>
              </FormControl>
              <FormControl id="description" size="sm">
                <FormLabel>Description</FormLabel>
                <Textarea {...register("description")} rows={2} fontSize="sm" />
              </FormControl>
              {/* Bottom bar */}
              <Stack direction="row" align="center">
                <IconButton aria-label="reset" variant="ghost" colorScheme="red" icon={<RiDeleteBinLine size="20px" />} ml="auto!important" onClick={doReset} />
                <Button type="submit" isLoading={isLoading} flex="1">
                  Continue
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      )}

      {/* Step 3: Check ar balance + Confirm */}
      {step === 3 && (
        <Box maxW="500px" mx="auto" p="2">
          {/* Top bar */}
          <Stack direction="row" align="center">
            <IconButton aria-label="go-back" variant="ghost" icon={<RiArrowLeftLine size="20px" />} onClick={() => goToStep(2)} />
            <Text fontWeight="600">Confirm purchase</Text>
          </Stack>

          <Stack w="100%" direction={{ base: "column", lg: "row" }} mt="2" spacing="4">
            {/* Thumbnail */}
            <Box mx={{ base: "auto", lg: "unset" }} w="112px" h="112px" flexShrink="0" rounded="sm" overflow="hidden">
              <ThumbnailContainer fileThumbnail={data?.fileThumbnail} file={data?.file} />
            </Box>

            {/* Form */}
            <Stack w="100%">
              <Text>{data?.name}</Text>
              <Text>by: {data?.username}</Text>
              <SimpleGrid columns={2}>
                <Text>ESTIMATED COSTS:</Text>
                <div>
                  <Text>
                    <strong>{convertToAr(data?.txFee)} AR</strong>
                  </Text>
                  <Text>
                    <strong>1.00 KOII</strong>
                  </Text>
                </div>
              </SimpleGrid>
              {/* Bottom bar */}
              <Stack direction="row" align="center">
                <IconButton aria-label="reset" variant="ghost" colorScheme="red" icon={<RiDeleteBinLine size="20px" />} ml="auto!important" onClick={doReset} />
                <Button isLoading={status === "loading"} isDisabled={isNotEnoughBalance} flex="1" onClick={doSignArTx}>
                  Confirm
                </Button>
              </Stack>
              {status === "error" && (
                <Alert status="error" fontSize="sm" p="2">
                  <AlertIcon />
                  There was an error processing your request
                </Alert>
              )}
              {isNotEnoughBalance && (
                <Alert status="error" fontSize="sm" p="2">
                  <AlertIcon />
                  You don't have enough AR.
                </Alert>
              )}
            </Stack>
          </Stack>
        </Box>
      )}
      {/* Step 4: Done. */}
      {step === 4 && (
        <Box maxW="500px" mx="auto" p="2" as="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Top bar */}
          <Stack direction="row" align="center">
            <IconButton aria-label="go-back" variant="ghost" icon={<RiCloseFill size="20px" />} onClick={doReset} />
            <Text fontWeight="600">You’ve got an Atomic NFT!</Text>
          </Stack>

          <Stack w="100%" mt="2">
            <Alert status="success" fontSize="sm" p="2">
              <AlertIcon />
              <Text>Successfully uploaded </Text>
              <Button as={Link} href={`https://koii.live/${data?.tx?.id}.html`} isExternal size="xs" ml="4">
                Check your nft
              </Button>
            </Alert>
          </Stack>
        </Box>
      )}
    </DragAndDropContainer>
  );
}

const DragAndDropContainer = ({ children, isLoading }: { children: ReactNode; isLoading: boolean }) => {
  return (
    <Box bg="gray.50" p="2" rounded="md" pos="relative" zIndex="1">
      {/* Loading wrapper */}
      {isLoading && (
        <Center w="100%" h="100%" bg="rgba(255, 255, 255, 0.8)" pos="absolute" left="50%" top="50%" transform="translate(-50%,-50%)" zIndex="999" pointerEvents="initial">
          <Spinner />
        </Center>
      )}
      {children}
    </Box>
  );
};

const ThumbnailContainer = ({ file, fileThumbnail }: { file: any; fileThumbnail: any }) => {
  const mediaType = getMediaType(file?.type);
  return (
    <>
      {mediaType === "image" ? (
        <Image src={fileThumbnail} alt="nft-preview" boxSize="100%" objectFit="cover" />
      ) : (
        <Box as="video" height="100%" width="100%" muted autoPlay playsInline>
          <source src={fileThumbnail} />
        </Box>
      )}
    </>
  );
};
