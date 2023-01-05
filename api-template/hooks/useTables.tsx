import { useRouter } from "next/router";
import React from "react";
import { usePagesStateDisptch, usePagesStateValue } from "../lib/builder";
import { useAxios } from "./useAxios";

export default function useTables() {
  const router = useRouter();
  const queryId = router.query.id;

  const tables = usePagesStateValue("tables", []);

  const data = (tables ?? []).filter(({ id }) => id === queryId)[0];

  const loadingtables = usePagesStateValue("loaders.tables", 0);

  const { updateApps, toggleAppsLoader } = useTableActions();
  const axios = useAxios();

  async function addRow(data) {
    let allTables = [...tables, data];
    updateApps(allTables);
  }

  async function updateAll() {
    try {
      toggleAppsLoader(true);
      const response = await axios.get(`/api/resource/table/${queryId}`);
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

  const couldBeEmpty = loadingtables === 0 && queryId;

  React.useEffect(() => {
    if (couldBeEmpty) updateAll();
  }, [couldBeEmpty]);

  return { ...data, addRow };
}

export function useTableActions() {
  const dispatchToPages = usePagesStateDisptch();
  const tables = usePagesStateValue("tables");
  const loaders = usePagesStateValue("loaders");
  const loadingApps = usePagesStateValue("loaders.tables");
  const updateResourceGrps = React.useCallback(
    (payload: any) => {
      const type = "update_all";
      const key = "tables";
      dispatchToPages({ payload, type, key });
    },
    [tables]
  );

  const toggletablesLoader = React.useCallback(
    (state: boolean) => {
      const type = "update_all";
      const key = "loaders";
      let payload = { ...loaders, tables: state };
      dispatchToPages({
        payload,
        type,
        key,
      });
    },
    [tables, loaders, loadingApps]
  );
  return {
    updateApps: updateResourceGrps,
    toggleAppsLoader: toggletablesLoader,
  };
}
