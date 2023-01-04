import { useRouter } from "next/router";
import { usePagesStateValue } from "../lib/builder";
import useApps from "./useApps";

export default function useSubdomainApp(apps = []) {
  const { asPath } = useRouter();
  const urldata =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const URL = `${urldata}${asPath}`;
  const subdomain = (URL?.split(".")[0] ?? "")?.split("//")[1];

  const app = apps.find((app) => app.appId === subdomain) ?? { drafts: "[]" };

  const loadingApps = usePagesStateValue("loaders.apps");

  return [subdomain, app, loadingApps];
}
