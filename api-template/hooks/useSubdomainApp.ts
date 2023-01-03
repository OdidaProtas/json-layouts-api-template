import { useRouter } from "next/router";
import React from "react";
import { usePagesStateDisptch, usePagesStateValue } from "../lib/builder";
import { useAxios } from "./useAxios";

export default function useSubdomainApp() {
  const apps = usePagesStateValue("apps") ?? [];

  const router = useRouter();

  const { asPath } = useRouter();
  const urldata =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${urldata}${asPath}`;
  const subdomain = (URL?.split(".")[0] ?? "")?.split("//")[1];


  const app = apps.find((app) => app.appId === subdomain);
  
  console.log(subdomain, URL, app)

  const loadingApps = usePagesStateValue("loaders.apps");

  const { updateApps, toggleAppsLoader } = useActions();
  const axios = useAxios();

  async function updateAll() {
    try {
      toggleAppsLoader(true);
      const response = await axios.get("/api/a");
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
    if (!loadingApps && !apps.length) updateAll();
  }, [loadingApps, apps]);

  return [subdomain, app, loadingApps];
}

function useActions() {
  const dispatchToPages = usePagesStateDisptch();
  const apps = usePagesStateValue("apps");
  const loaders = usePagesStateValue("loaders");
  const loadingApps = usePagesStateValue("loaders.apps");
  const updateApps = React.useCallback(
    (payload: any) => {
      const type = "update_all";
      const key = "apps";
      dispatchToPages({ payload, type, key });
    },
    [apps]
  );

  const toggleAppsLoader = React.useCallback(
    (state: boolean) => {
      const type = "update_all";
      const key = "loaders";
      let payload = { ...loaders, apps: state };
      dispatchToPages({
        payload,
        type,
        key,
      });
    },
    [apps, loaders, loadingApps]
  );
  return { updateApps, toggleAppsLoader };
}
