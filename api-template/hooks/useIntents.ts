import useNav from "./useNav";

export default function useIntents() {
  const nav = useNav();
  return { nav };
}
