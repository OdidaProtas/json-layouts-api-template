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
      if (res.data) {
        setTaken(res.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    handleCheck();
  }, [id]);

  return [taken, loading];
}
