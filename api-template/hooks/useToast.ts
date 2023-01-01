import { usePagesStateDisptch, usePagesStateValue } from "../lib/builder";

export default function useToast() {
  const open = usePagesStateValue("toast.open") ?? false;
  const message = usePagesStateValue("toast.message") ?? "Action complete";
  const variant = usePagesStateValue("toast.variant") ?? "success";

  const { handleShowToast, handleHideToast } = useActions();

  function showToast(severity, message) {
    handleShowToast(severity, message);
  }

  function hideToast() {
    handleHideToast();
  }

  function showAutoHideToast(severity, message) {
    handleShowToast(severity, message);
    setTimeout(() => {
      handleHideToast;
    }, 6000);
  }

  return {
    open,
    message,
    variant,
    showToast,
    hideToast,
    showAutoHideToast,
  };
}

function useActions() {
  const dispatch = usePagesStateDisptch();
  const toast = usePagesStateValue("toast") ?? {};
  function handleShowToast(severity, message) {
    const type = "update_toast";
    const key = "toast";
    dispatch({
      type,
      payload: { ...toast, severity, message, open: true },
      key,
    });
  }
  function handleHideToast() {
    const type = "update_toast";
    const key = "toast";
    dispatch({
      type,
      payload: { ...toast, severity: "success", message: "", open: false },
      key,
    });
  }
  return { handleShowToast, handleHideToast };
}
