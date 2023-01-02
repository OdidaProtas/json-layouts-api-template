import React from "react";
import { useAxios } from "./useAxios";

export default function useIsUniqueAppId(id) {
  const [tOut, setTout] = React.useState(null);
  const [loading, setLoading] = React.useState(null);
  const [taken, setTaken] = React.useState(false);

  const axios = useAxios();

  async function handleCheck() {
    setLoading(true);
    try {
      const res = await axios.get(`/api/a/unique/${id}`);
      if (res.data === false || res.data) {
        setTaken(res.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (id) {
      if (tOut) {
        if (tOut) clearTimeout(tOut);
        setTout(null);
      }
      const timeOut = setTimeout(() => {
        handleCheck();
      }, 690);
      setTout(timeOut);
    } else {
      if (tOut) {
        if (tOut) clearTimeout(tOut);
        setTout(null);
      }
    }
    return () => {
      if (tOut) clearTimeout(tOut);
      setTout(null);
    };
  }, [id]);

  return [taken, loading];
}
