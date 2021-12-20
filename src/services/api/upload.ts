import Arweave from "arweave";
// utils
import { poll } from "services/api";
import { getFileData } from "services/utils";
import axios from "services/axios";

const arweaveOptions = {
  host: "arweave.net", // Hostname or IP address for a Arweave host
  port: 443, // Port
  protocol: "https", // Network protocol http or https
  timeout: 20000, // Network request timeouts in milliseconds
  logging: false // Enable network request logging
};

declare global {
  interface Window {
    koiiWallet?: any;
    dataLayer?: any;
  }
}

/**
 * Initiates arweave object if on window or uses library otherwise
 * @returns Initiated arweave object
 */
async function initArweave() {
  let arweave: any;
  try {
    arweave = await poll(() => (Window as any).Arweave, 5000, 200);
  } catch (error) {
    arweave = Arweave;
  }
  arweave = new arweave(arweaveOptions);

  return arweave;
}

interface InitializeArTxProps {
  walletAddress: string;
  data: Record<string, any>;
}
export const initializeArTx = async ({ walletAddress, data }: InitializeArTxProps) => {
  try {
    // init arweave
    let arweave = await initArweave();

    const balances: any = {};
    // How much is the user willing to pay to get % ownership
    balances[walletAddress] = 1;
    // Today's date
    const createdAt = Math.floor(new Date().getTime() / 1000).toString();
    // get data buffer from the uploaded file.
    const [dataBuffer] = await getFileData(data?.fileThumbnail);

    const initialState = {
      owner: walletAddress,
      title: data?.name,
      name: data?.username,
      description: data?.description,
      ticker: "KOINFT",
      balances,
      contentType: data?.file?.type,
      createdAt,
      tags: data?.tags?.split?.(",") || [],
      isNsfw: data?.isNsfw
    };
    // Create transaction
    let tx = await createArTx(dataBuffer, initialState);
    let txFee = await arweave.transactions.getPrice(tx.data_size);

    return {
      txFee,
      tx,
      initialState
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 *  Creates transaction and adds appropriate tags
 *
 * @param {object} dataBuffer Content Buffer Data
 * @param {object} initialState arweave state object
 *
 * @returns transaction with tags added
 */
export const createArTx = async (dataBuffer: any, initialState: any) => {
  // init arweave
  let arweave = await initArweave();
  try {
    let tx = await arweave.createTransaction({ data: dataBuffer });

    /* 
      now we add tags for the transaction
      only upload nft to Koii will require this set of tags
      others will have different tags
    */

    tx.addTag("Content-Type", initialState?.contentType);
    tx.addTag("Network", "Koii");
    tx.addTag("Action", "marketplace/Create");
    tx.addTag("App-Name", "SmartWeaveContract");
    tx.addTag("App-Version", "0.3.0");
    tx.addTag("Contract-Src", "r_ibeOTHJW8McJvivPJjHxjMwkYfAKRjs-LjAeaBcLc");
    tx.addTag("Init-State", JSON.stringify(initialState));
    tx.addTag("NSFW", initialState?.isNsfw);

    return tx;
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 *  Creates transaction and adds appropriate tags
 *
 * @param {object} tx arweave transaction
 * @param {object} initialState arweave state object
 * @param {File} media file to be uploaded
 *
 * @returns transaction with tags added
 */
export const signArTx = async (tx: any, initialState: any, media: any) => {
  try {
    /* 
    First, we sign the transaction using Finnie.
  */
    await window.koiiWallet.sign(tx);

    /* 
    With a signed transaction, now we can upload it to the chain
  */
    await uploadArTx(tx);

    const body = {
      data: {
        ...initialState,
        id: tx.id
      },
      media
    };

    /* 
    The last step is to register it into Koii using Finnie
  */
    await window.koiiWallet.registerData(tx.id);

    await generateCardWithData(body).catch(() => {});

    return {
      tx: tx
    };
  } catch (error: any) {
    throw new Error(error);
  }
};

/**
 *  Creates transaction and adds appropriate tags
 *
 * @param {object} tx arweave transaction
 *
 * @returns transaction with tags added
 */
export const uploadArTx = async (tx: any) => {
  // init arweave
  let arweave = await initArweave();
  let uploader;
  try {
    uploader = await arweave.transactions.getUploader(tx);
    fireGTM(uploader);

    while (!uploader.isComplete) {
      await uploader.uploadChunk();
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const fireGTM = (data: any) => {
  const dataLayer = window.dataLayer;
  dataLayer?.push?.({ tag: data, event: "custom" });
};

export const generateCardWithData = async (body: any) => {
  return await axios.post(`https://api.koii.live/generateCardWithData`, body, {
    transformRequest: (data, headers: any) => {
      headers.common["Access-Control-Allow-Origin"] = "*";
      return data;
    },
    baseURL: undefined
  });
};
