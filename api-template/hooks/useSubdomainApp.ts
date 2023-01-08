import { useRouter } from "next/router";
import React from "react";
import { usePagesStateValue } from "../lib/builder";
import { usePagesActions } from "./usePages";

export default function useSubdomainApp(apps = []) {
  const { asPath } = useRouter();
  const urldata =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${urldata}${asPath}`;
  const subdomain = (URL?.split(".")[0] ?? "")?.split("//")[1];

  const app = apps.find((app) => app.appId === subdomain) ?? {
    drafts: "[]",
    id: "",
  };

  const loadingApps = usePagesStateValue("loaders.apps");

  const { updatePages } = usePagesActions();

  // React.useEffect(() => {
  //   if (app.id) {
  //     updatePages(JSON.parse(app.drafts ?? "[]"));
  //   }
  // }, [app]);

  return [subdomain, app, loadingApps];
}
