import { useRouter } from "next/router";
import React from "react";
import { usePagesStateDisptch, usePagesStateValue } from "../lib/builder";
import { useAxios } from "./useAxios";

export default function useResourceGroups() {
  const router = useRouter();
  const queryId = router.query.id;

  const resourceGroup = usePagesStateValue("resourceGroup") ?? [];

  const data = (resourceGroup ?? []).filter(({ id }) => id === queryId)[0];

  const loadingresourceGroup = usePagesStateValue("loaders.resourceGroup");

  const { updateApps, toggleAppsLoader } = useActions();
  const axios = useAxios();

  async function updateAll() {
    try {
      toggleAppsLoader(true);
      const response = await axios.get(`/api/resource/group/${queryId}`);
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

  const couldBeEmpty = !resourceGroup && !loadingresourceGroup;

  React.useEffect(() => {
    if (queryId) updateAll();
  }, [queryId]);

  return data;
}

function useActions() {
  const dispatchToPages = usePagesStateDisptch();
  const resourceGroup = usePagesStateValue("resourceGroup");
  const loaders = usePagesStateValue("loaders");
  const loadingApps = usePagesStateValue("loaders.resourceGroup");
  const updateResourceGrps = React.useCallback(
    (payload: any) => {
      const type = "update_all";
      const key = "resourceGroup";
      dispatchToPages({ payload, type, key });
    },
    [resourceGroup]
  );

  const toggleresourceGroupLoader = React.useCallback(
    (state: boolean) => {
      const type = "update_all";
      const key = "loaders";
      let payload = { ...loaders, resourceGroup: state };
      dispatchToPages({
        payload,
        type,
        key,
      });
    },
    [resourceGroup, loaders, loadingApps]
  );
  return {
    updateApps: updateResourceGrps,
    toggleAppsLoader: toggleresourceGroupLoader,
  };
}
