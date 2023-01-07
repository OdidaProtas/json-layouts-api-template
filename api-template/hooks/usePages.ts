import { useRouter } from "next/router";
import React from "react";
import { usePagesStateValue } from "../lib/builder";
import helloWorld from "../lib/defaultApp";
import useApps from "./useApps";
import { useAxios } from "./useAxios";
import useSubdomainApp from "./useSubdomainApp";
import useIsWhiteListSubdomain from "./useWhiteListSubdomains";

export default function usePages() {
  const pages = usePagesStateValue("pages");

  const router = useRouter();
  const { id: appId } = router.query;

  const loadingPages = usePagesStateValue("loaders.pages");

  const { updatePages, togglePagesLoader } = usePagesActions();
  const axios = useAxios();

  const apps = useApps();

  async function updateAll() {
    togglePagesLoader(true);
    try {
      const response = await axios.get(`/api/page/${appId}`);
      const data = response.data;
      if (data.length) {
        updatePages([...data]);
      } else updatePages([helloWorld]);
      togglePagesLoader(false);
      return;
    } catch (e) {
      console.error(e);
      togglePagesLoader(false);
    }
  }

  const [subdomain] = useSubdomainApp(apps);
  const isWhiteListSubdomain = useIsWhiteListSubdomain(subdomain);

  const couldBeEmpty =
    !pages.length &&
    (loadingPages === null || loadingPages === undefined) &&
    !loadingPages;

  React.useEffect(() => {
    if (appId && (!subdomain || isWhiteListSubdomain)) updateAll();
  }, [appId, subdomain]);

  return [...pages];
}

export function usePagesActions() {
  const dispatchToPages = usePagesStateValue("dispatch");
  const pages = usePagesStateValue("pages");
  const loaders = usePagesStateValue("loaders");
  const loadingPages = usePagesStateValue("loaders.pages");
  const updatePages = React.useCallback(
    (payload: any) => {
      const type = "update_all";
      const key = "pages";
      dispatchToPages({ payload, type, key });
    },
    [pages]
  );

  const togglePagesLoader = React.useCallback(
    (state: boolean) => {
      const type = "update_all";
      const key = "loaders";
      let payload = { ...loaders, pages: state };
      dispatchToPages({
        payload,
        type,
        key,
      });
    },
    [pages, loaders, loadingPages]
  );
  return { updatePages, togglePagesLoader };
}
