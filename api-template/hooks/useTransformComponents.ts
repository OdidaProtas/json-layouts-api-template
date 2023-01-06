import React, { useState } from "react";
import { useAxios } from "./useAxios";

export default function useTransformComponents(apiData) {
  const [loading, setLoading] = useState(false);
  const [components, setComponents] = useState(null);
  const [error, setError] = useState(false);

  const axios = useAxios();

  async function updateComponents() {
    try {
      if (apiData.type && apiData.id && apiData.procedure) {
        setLoading(true);
        setError(false);
        const res = await axios.post(`/api/resource/transform`, apiData);
        if (res.data) {
          setComponents(res.data);
          setLoading(false);
        }
        setLoading(false);
      }
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  }

  React.useEffect(() => {
    if (!loading) updateComponents();
  }, []);

  return [components, loading, error];
}
