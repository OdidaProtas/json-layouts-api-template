import React from "react";
import { usePagesStateDisptch, usePagesStateValue } from "../lib/builder";
import { useAxios } from "./useAxios";

export default function useProfiles() {
  const profiles = usePagesStateValue("profiles") ?? [];

  const loadingProfiles = usePagesStateValue("loaders.;profiles");

  const { updateApps, toggleAppsLoader } = useActions();
  const axios = useAxios();

  async function updateAll() {
    try {
      toggleAppsLoader(true);
      const response = await axios.get("/api/profiles");
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

  React.useEffect(() => {
    if (!loadingProfiles) updateAll();
  }, []);

  return profiles;
}

function useActions() {
  const dispatchToPages = usePagesStateDisptch();
  const profiles = usePagesStateValue("profiles");
  const loaders = usePagesStateValue("loaders");
  const loadingProfiles = usePagesStateValue("loaders.profiles");
  const updateApps = React.useCallback(
    (payload: any) => {
      const type = "update_all";
      const key = "profiles";
      dispatchToPages({ payload, type, key });
    },
    [profiles]
  );

  const toggleAppsLoader = React.useCallback(
    (state: boolean) => {
      const type = "update_all";
      const key = "loaders";
      let payload = { ...loaders, profiles: state };
      dispatchToPages({
        payload,
        type,
        key,
      });
    },
    [profiles, loaders, loadingProfiles]
  );
  return { updateApps, toggleAppsLoader };
}

export const useAppActions = useActions;
