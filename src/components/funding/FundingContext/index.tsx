import React from "react";
import config from "components/funding/funding-config";

interface ConfigInterface {
  title: string;
  companyLogo: string;
  companyName: string;
  goal: number;
  images: Array<{ src: string }>;
  socials: Record<string, string>;
  paymentType: string | "eth";
  fundContract: string;
  tokenContract: string;
  about: JSX.Element;
  faqs?: Array<{ question: string; answer: string }>;
  nfts: Array<Record<string, any>>;
}

const defaultConfig: ConfigInterface = config;

const initialState = {
  config: defaultConfig,
  isFundModalOpen: false
};

type ActionType = { type: "CHANGE_FIELDS"; payload: Record<string, any> } | { type: "TOGGLE_FUND_MODAL" } | { type: "CLOSE_FUND_MODAL" };

const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case "CHANGE_FIELDS":
      const { payload } = action;
      return { ...state, ...payload };
    case "TOGGLE_FUND_MODAL":
      return { ...state, isFundModalOpen: !state?.isFundModalOpen };
    case "CLOSE_FUND_MODAL":
      return { ...state, isFundModalOpen: false };
    default:
      throw new Error(`No action type found for fundingReducer`);
  }
};

interface ContextInterface {
  state: {
    config: ConfigInterface;
    isFundModalOpen: boolean;
  };
  dispatch: React.Dispatch<ActionType>;
}

const Context = React.createContext<ContextInterface | null>({
  state: initialState,
  dispatch: () => null
});

const ContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

function useContext() {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error(`useFunding must be used inside FundingProvider`);
  }
  return context;
}

export { ContextProvider as FundingProvider, useContext as useFunding };
