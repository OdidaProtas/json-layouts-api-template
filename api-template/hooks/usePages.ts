import { useRouter } from "next/router";
import React from "react";
import { usePagesStateValue } from "../lib/builder";
import helloWorld from "../lib/defaultApp";
import { useAxios } from "./useAxios";

export default function usePages() {
  const pages = usePagesStateValue("pages");

  const router = useRouter();
  const { id: appId } = router.query;

  const loadingPages = usePagesStateValue("loaders.pages");

  const { updatePages, togglePagesLoader } = useActions();
  const axios = useAxios();

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

  const couldBeEmpty =
    !pages.length &&
    (loadingPages === null || loadingPages === undefined) &&
    !loadingPages;

  React.useEffect(() => {
    if (appId) updateAll();
  }, [appId]);

  return [...pages];
}

function useActions() {
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
