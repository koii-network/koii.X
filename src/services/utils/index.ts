export const getNftsStats = (nfts: any) =>
  nfts.reduce(
    (acc: any, current: any) => {
      acc[0] += current.attention;
      acc[1] += current.reward;

      return acc;
    },
    [0, 0]
  );

export const formatDigitNumber = (val: any) => {
  if (typeof val !== "number") return 0;
  if (val) return val.toLocaleString("en-US", { maximumFractionDigits: 2 });
  else return 0;
};

export const getMediaType = (fileType: any) => {
  let mediaType = fileType;
  if (fileType) {
    if (fileType.includes("image/")) {
      mediaType = "image";
    } else if (fileType.includes("video/")) {
      mediaType = "video";
    }
  }
  return mediaType;
};
