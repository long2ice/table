import { Select } from "@mantine/core";
import { useRequest } from "ahooks";
import React from "react";
import { DashboardAPI } from "../../api-caller/dashboard";
import { useParams, useNavigate } from "react-router-dom";

interface IDashboardSelector {
}

export function DashboardSelector({}: IDashboardSelector) {
  const { id } = useParams()
  const navigate = useNavigate();
  const changeID = React.useCallback((id: string) => {
    navigate(`/${id}`);
  }, []);

  const { data: options = [], loading, refresh } = useRequest(async () => {
    const { data } = await DashboardAPI.list();
    return data.map(d => ({
      label: d.name,
      value: d.id
    }))
  }, {
    refreshDeps: [],
  });

  React.useEffect(() => {
    if (!id && options.length > 0) {
      changeID(options[0].value);
    }
  }, [id, options])

  const handleChange = React.useCallback((selectedID: string | null) => {
    if (!selectedID) {
      return;
    }
    changeID(selectedID)
  }, []);

  return (
    <Select clearable={false} value={id} onChange={handleChange} data={options} />
  )
}