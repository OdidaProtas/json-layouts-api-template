import React from "react";
import { usePagesStateDisptch, usePagesStateValue } from "../lib/builder";
import { useAxios } from "./useAxios";
import { useRouter } from "next/router";

export default function useApi() {
  const router = useRouter();
  const queryId = router.query.id;

  const api = usePagesStateValue("api", []);

  const loadingApis = usePagesStateValue("loaders.api", 0);

  const { updateApps, toggleAppsLoader } = useActions();
  const axios = useAxios();

  async function updateAll() {
    try {
      toggleAppsLoader(true);
      const response = await axios.get(`/api/builder/${queryId}`);
      const data = response.data;
      if (data) {
        updateApps(data);
        toggleAppsLoader(false);
        return;
      }
      toggleAppsLoader(false);
    } catch (e) {
      toggleAppsLoader(false);
    }
  }

  const couldBeEmpty = loadingApis === 0 && Boolean(queryId);

  React.useEffect(() => {
    if (couldBeEmpty) updateAll();
  }, [couldBeEmpty]);

  return [api ?? []];
}

function useActions() {
  const dispatchToPages = usePagesStateDisptch();
  const resourceGroups = usePagesStateValue("api");
  const loaders = usePagesStateValue("loaders");
  const loadingApps = usePagesStateValue("loaders.api");
  const updateResourceGrps = React.useCallback(
    (payload: any) => {
      const type = "update_all";
      const key = "api";
      dispatchToPages({ payload, type, key });
    },
    [resourceGroups]
  );

  const toggleResourceGroupsLoader = React.useCallback(
    (state: boolean) => {
      const type = "update_all";
      const key = "loaders";
      let payload = { ...loaders, api: state };
      dispatchToPages({
        payload,
        type,
        key,
      });
    },
    [resourceGroups, loaders, loadingApps]
  );
  return {
    updateApps: updateResourceGrps,
    toggleAppsLoader: toggleResourceGroupsLoader,
  };
}

export const useResourceGroupsActions = useActions;
