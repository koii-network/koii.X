import { useState, useCallback } from "react";
// context
import { useFinnie } from "components/context/finnie";
// Dropzone
import { useDropzone } from "react-dropzone";
// ui
import { Box, Center, Text, Stack, FormControl, FormLabel, Input, Textarea, IconButton, Button, Image } from "@chakra-ui/react";
// icons
import { RiArrowLeftLine, RiDeleteBinLine } from "react-icons/ri";
// Form
import { useForm } from "react-hook-form";
// utils
import { getMediaType } from "services/utils";

export function DragAndDropUploader() {
  /* Finnie */
  const {
    state: { connectFinnie, isLoading, isFinnieConnected }
  } = useFinnie();

  const [{ step, status, data }, setState] = useState<{ step: number; status: string; data: any }>({ step: 1, status: "idle", data: null });

  function goToStep(step: number) {
    setState(prevState => ({ ...prevState, step }));
  }
  function doReset() {
    setState({ step: 1, status: "idle", data: null });
  }

  /* Dropzone */
  const onDropAccepted = useCallback(async acceptedFiles => {
    setState(prevState => ({ ...prevState, step: 2, data: { ...data?.prevState, file: acceptedFiles[0], fileThumbnail: URL.createObjectURL(acceptedFiles[0]) } }));
  }, []);
  /* Only images and videos to be uploaded with max file size 15mb. */
  const { getRootProps, getInputProps } = useDropzone({ onDropAccepted, accept: "image/*, video/*", multiple: false, maxSize: 15728640 });

  /* Add nft details form */

  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (values: any) => {
    console.log({ values });
  };
  return (
    <Box bg="gray.50" p="2" rounded="md">
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
      {/* Step 2: Add nft details */}
      {step === 2 && (
        <Box maxW="500px" mx="auto" p="2" as="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Top bar */}
          <Stack direction="row" align="center">
            <IconButton aria-label="go-back" variant="ghost" icon={<RiArrowLeftLine size="20px" />} onClick={() => goToStep(1)} />
            <Text>Add details to your nft</Text>
          </Stack>
          <Stack w="100%" direction={{ base: "column", lg: "row" }} mt="2" spacing="4">
            {/* Thumbnail */}
            <Box mx={{ base: "auto", lg: "unset" }} w="112px" h="112px" flexShrink="0" rounded="sm" overflow="hidden">
              <MediaContainer fileThumbnail={data?.fileThumbnail} file={data?.file} />
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
                <Input {...register("tags")} placeholder="nsfw,art,holiday, ...etc" />
              </FormControl>
              <FormControl id="description" size="sm">
                <FormLabel>Description</FormLabel>
                <Textarea {...register("description")} rows={2} fontSize="sm" />
              </FormControl>
              {/* Bottom bar */}
              <Stack direction="row" align="center">
                <IconButton aria-label="reset" variant="ghost" colorScheme="red" icon={<RiDeleteBinLine size="20px" />} ml="auto!important" onClick={doReset} />
                {isFinnieConnected ? (
                  <Button onClick={connectFinnie} isLoading={isLoading}>
                    Connect finnie
                  </Button>
                ) : (
                  <Button type="submit" flex="1" isLoading={status === "loading"}>
                    Continue
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      )}

      {/* Step 3: Confirm */}
    </Box>
  );
}

const MediaContainer = ({ file, fileThumbnail }: { file: any; fileThumbnail: any }) => {
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
