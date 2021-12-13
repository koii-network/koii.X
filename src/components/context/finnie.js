import React from "react";
// api
import { connectToExtension, getAddress, initExtension } from "services/api";

const Context = React.createContext(null);
Context.displayName = "FinnieContext";

const actionTypes = {
  changeValue: "CHANGE_VALUE"
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.changeValue:
      const { payload } = action;
      return { ...state, ...payload };
    default:
      throw new Error(`No action type found for finnieReducer`);
  }
};

const initializer = () => {
  return {
    walletAddress: null,
    isError: false,
    isLoading: false,
    isFinnieConnected: false
  };
};

function ContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, null, initializer);

  /* Helper Functions */
  const connectFinnie = async () => {
    let address;
    try {
      dispatch({
        type: "CHANGE_VALUE",
        payload: { isLoading: true, isError: null, isFinnieConnected: false }
      });
      // Check if extension exists and get permissions.
      await initExtension();
      // Connect to extension
      await connectToExtension();
      // Get finnie address
      await getAddress().then(res => {
        if (res.status === 200) {
          /* Done, we have the address */
          address = res?.data;
          dispatch({
            type: "CHANGE_VALUE",
            payload: { walletAddress: address, isFinnieConnected: true, isLoading: false, isError: null }
          });
        } else {
          throw new Error("Error getting finnie address!");
        }
      });
    } catch (error) {
      dispatch({
        type: "CHANGE_VALUE",
        payload: { isLoading: false, isError: error, walletAddress: null, isFinnieConnected: false }
      });
    }
    return address;
  };

  return <Context.Provider value={{ state: { ...state, connectFinnie }, dispatch }}>{children}</Context.Provider>;
}

function useContext() {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error(`useFinnie must be used inside FinnieProvider`);
  }
  return context;
}

export { ContextProvider as FinnieProvider, useContext as useFinnie };
