import { usePagesStateDisptch, usePagesStateValue } from "../lib/builder";

export default function useNav() {
  const pages = usePagesStateValue("pages", []);
  const pageIndex = usePagesStateValue("pageIndex", 0);
  const dispatch = usePagesStateDisptch();
  return {
    push(path) {
      const newPage = pages.find((page) => page.path === path);
      const index = pages.indexOf(newPage);
      if (index > -1) {
        const type = "update_all";
        const payload = index;
        const key = "pageIndex";
        console.log("yaay");
        dispatch({ type, key, payload });
      }
    },
    goBack() {},
    canGoBack() {},
  };
}
