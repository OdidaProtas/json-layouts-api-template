import React, { useState } from "react";
import { usePagesStateDisptch, usePagesStateValue } from "../lib/builder";
import { useAxios } from "./useAxios";

export default function useDetail(apiData) {
  const [loading, setLoading] = useState(false);
  const [components, setComponents] = useState(null);
  const [error, setError] = useState(false);

  const axios = useAxios();

  const { setResourceData, setResourceLoder } = useDetailActions();

  const detailStateResource =
    usePagesStateValue(`details`)[apiData?.id]?.itemId;
  const itemId = detailStateResource;

  async function getRow() {
    try {
      if (itemId) {
        setResourceLoder(apiData.id, true);
        setError(false);
        const res = await axios.post(`/api/resource/detail`, {
          ...apiData,
          itemId,
        });
        if (res.data) {
          setComponents(res.data);
          setResourceData(apiData.id, res.data);
          setResourceLoder(apiData.id, false);
        }
        setResourceLoder(apiData.id, false);
      }
    } catch (e) {
      setError(true);
      setResourceLoder(apiData.id, false);
    }
  }

  React.useEffect(() => {
    if (itemId) getRow();
  }, [itemId]);

  return [components, loading, error];
}

export function useDetailActions() {
  const dispatch = usePagesStateDisptch();
  const details = usePagesStateValue("details");
  function addResourceId(resourceId, itemId) {
    const type = "update_all";
    const payload = {
      ...details,
      [resourceId]: {
        itemId: itemId,
      },
    };
    const key = "details";
    dispatch({ type, key, payload });
  }

  function setResourceLoder(resourceId, state) {
    const type = "update_all";
    const payload = {
      ...details,
      [resourceId]: {
        ...(details ?? {})[resourceId],
        loading: state,
      },
    };
    const key = "payload";
    dispatch({ type, key, payload });
  }

  function setResourceData(resourceId, data) {
    const type = "update_all";
    const payload = {
      ...details,
      [resourceId]: {
        ...(details ?? {})[resourceId],
        loading: data,
      },
    };
    const key = "payload";
    dispatch({ type, key, payload });
  }

  return { addResourceId, setResourceLoder, setResourceData };
}
