import { useRouter } from "next/router";
import React from "react";
import { usePagesStateDisptch, usePagesStateValue } from "../lib/builder";
import { useAxios } from "./useAxios";

export default function useCategory() {
  const categories = usePagesStateValue("categories") ?? [];

  const router = useRouter();

  const id = router.query.id;

  const category = categories.find((cat) => cat.id === id);

  const loadingCategories = usePagesStateValue("loaders.categories");

  const { updateApps, toggleAppsLoader } = useActions();
  const axios = useAxios();

  async function updateAll() {
    try {
      toggleAppsLoader(true);
      const response = await axios.get("/api/c");
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
    updateAll();
  }, []);

  return category;
}

function useActions() {
  const dispatchToPages = usePagesStateDisptch();
  const categories = usePagesStateValue("categories");
  const loaders = usePagesStateValue("loaders");
  const loadingCategroies = usePagesStateValue("loaders.categories");
  const updateApps = React.useCallback(
    (payload: any) => {
      const type = "update_all";
      const key = "categories";
      dispatchToPages({ payload, type, key });
    },
    [categories]
  );

  const toggleAppsLoader = React.useCallback(
    (state: boolean) => {
      const type = "update_all";
      const key = "loaders";
      let payload = { ...loaders, categories: state };
      dispatchToPages({
        payload,
        type,
        key,
      });
    },
    [categories, loaders, loadingCategroies]
  );
  return { updateApps, toggleAppsLoader };
}

export const useAppActions = useActions;
