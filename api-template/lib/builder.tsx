import React from "react";

import reducer from "./reducer";
import { nestedObjectReducer } from "./nestedObjectReducer";
import helloWorld from "./defaultApp";

const initialState = {
  pages: [],
  dispatch: () => {},
  loaders: {},
  theme: null,
  appId: null,
  apps: [],
  pageIndex: 0,
  navigation: {
    page: "/",
    child: "/",
    history: ["/"],
  },
};

export const PagesContext = React.createContext(initialState);

interface IPagesProvider {
  children: React.ReactNode;
}

export const PagesContextProvider: React.FC<IPagesProvider> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(
    reducer as any,
    initialState as any
  );
  return (
    <PagesContext.Provider value={{ ...(state as any), dispatch }}>
      {children}
      <style jsx>{`
        /* width */
        ::-webkit-scrollbar {
          width: 4px;
          border-radius: 4px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
          background: blue;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: blue;
        }
      `}</style>
    </PagesContext.Provider>
  );
};

export const usePagesStateValue = (label = "", defaultState = undefined) => {
  const keys = label.split(".");
  const state = React.useContext(PagesContext);
  const interest = (state as any)[keys[0]] ?? null;
  const data = React.useMemo(
    () => keys.reduce(nestedObjectReducer, interest),
    [interest, label]
  );
  return data ?? defaultState ?? null;
};

export const usePagesStateDisptch = () => usePagesStateValue("dispatch");
