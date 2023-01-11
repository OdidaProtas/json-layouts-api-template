import { usePagesStateDisptch, usePagesStateValue } from "../lib/builder";
import { useAxios } from "./useAxios";
import { useDetailActions } from "./useRow";

export default function useNav() {
  const pages = usePagesStateValue("pages", []);
  const pageIndex = usePagesStateValue("pageIndex", 0);
  const dispatch = usePagesStateDisptch();
  const { addResourceId } = useDetailActions();
  const axios = useAxios();
  return {
    push(path) {
      const newPage = pages.find((page) => page.path === path);
      const index = pages.indexOf(newPage);
      if (index > -1) {
        const type = "update_all";
        const payload = index;
        const key = "pageIndex";
        dispatch({ type, key, payload });
      }
    },
    focus(resourceId, itemId) {
      addResourceId(resourceId, itemId);
    },
    goBack() {},
    canGoBack() {},
    async delete(id, onError = (err) => {}, onSuccess = (data) => {}) {
      try {
        const res = await axios.delete(`/row/${id}`);
        onSuccess(res.data);
      } catch (e) {
        onError(e);
      }
    },
  };
}
