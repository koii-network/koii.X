import React from "react";

export default function useKoii() {
  const [{ status, error }, setState] = React.useState({ status: "idle", error: null });
  const uploadNft = async () => {
    setState(prevState => ({ ...prevState, status: "loading", error: null }));
    try {
      /* Upload the nft here */
    } catch (error) {
      /* Error handling */
      setState(prevState => ({ ...prevState, status: "error", error }));
    }
  };
  return { status, error, uploadNft };
}
