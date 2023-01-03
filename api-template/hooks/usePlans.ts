import React from "react";
import { usePagesStateDisptch, usePagesStateValue } from "../lib/builder";
import { useAxios } from "./useAxios";

export default function usePlans() {
  const plans = usePagesStateValue("plans") ?? [];

  const loadingPlans = usePagesStateValue("loaders.plans");

  const { updateApps, toggleAppsLoader } = useActions();
  const axios = useAxios();

  async function updateAll() {
    try {
      toggleAppsLoader(true);
      const response = await axios.get("/api/p");
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

  const couldBeEmpty = !plans?.length && !loadingPlans;

  React.useEffect(() => {
    if (couldBeEmpty) updateAll();
  }, [couldBeEmpty]);

  return plans;
}

function useActions() {
  const dispatchToPages = usePagesStateDisptch();
  const plans = usePagesStateValue("plans");
  const loaders = usePagesStateValue("loaders");
  const loadingPlans = usePagesStateValue("loaders.plans");
  const updateApps = React.useCallback(
    (payload: any) => {
      const type = "update_all";
      const key = "plans";
      dispatchToPages({ payload, type, key });
    },
    [plans]
  );

  const toggleAppsLoader = React.useCallback(
    (state: boolean) => {
      const type = "update_all";
      const key = "loaders";
      let payload = { ...loaders, plans: state };
      dispatchToPages({
        payload,
        type,
        key,
      });
    },
    [plans, loaders, loadingPlans]
  );
  return { updateApps, toggleAppsLoader };
}

export const useAppActions = useActions;
