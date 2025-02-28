import { useMemo } from "react";
import { SelectOption } from "../../../types";
import { useGetAllLookupsQuery } from "../../../app/api/HCMSApi";
import { SelectChangeEvent } from "@mui/material";

export const useJobCatagory = () => {
  const { data } = useGetAllLookupsQuery();

  const { JobCatagoryLookups, jobCatagories } = useMemo(() => {
    const JobCatagoryLookups = (data?.jobCatagories || []).map<SelectOption>(
      ({ value, name, description }) => ({
        label: name || description || "",
        value: value,
      })
    );

    return { JobCatagoryLookups, jobCatagories: data?.jobCatagories || [] };
  }, [data]);
  return {
    jobCatagories,
    JobCatagoryLookups,
  };
};
//custom hook return the jobCategory lookup
