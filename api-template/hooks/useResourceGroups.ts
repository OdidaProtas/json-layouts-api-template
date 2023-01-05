import React from "react";
import { usePagesStateDisptch, usePagesStateValue } from "../lib/builder";
import { useAxios } from "./useAxios";
import { useRouter } from "next/router";

export default function useResourceGroups() {
  const router = useRouter();
  const queryId = router.query.id;

  const resourceGroups = usePagesStateValue("resourceGroups", []);

  const loadingResourceGroups = usePagesStateValue("loaders.resourceGroups", 0);


  const { updateApps, toggleAppsLoader } = useActions();
  const axios = useAxios();

  async function updateAll() {
    try {
      toggleAppsLoader(true);
      const response = await axios.get(`/api/resource/${queryId}`);
      const data = response.data;
      if (data) {
        updateApps(data.resourceGroups);
        toggleAppsLoader(false);
        return;
      }
      toggleAppsLoader(false);
    } catch (e) {
      toggleAppsLoader(false);
    }
  }

  const couldBeEmpty = loadingResourceGroups === 0 && Boolean(queryId);

  React.useEffect(() => {
    if (couldBeEmpty) updateAll();
  }, [couldBeEmpty]);

  return resourceGroups ?? [];
}

function useActions() {
  const dispatchToPages = usePagesStateDisptch();
  const resourceGroups = usePagesStateValue("resourceGroups");
  const loaders = usePagesStateValue("loaders");
  const loadingApps = usePagesStateValue("loaders.resourceGroups");
  const updateResourceGrps = React.useCallback(
    (payload: any) => {
      const type = "update_all";
      const key = "resourceGroups";
      dispatchToPages({ payload, type, key });
    },
    [resourceGroups]
  );

  const toggleResourceGroupsLoader = React.useCallback(
    (state: boolean) => {
      const type = "update_all";
      const key = "loaders";
      let payload = { ...loaders, resourceGroups: state };
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
