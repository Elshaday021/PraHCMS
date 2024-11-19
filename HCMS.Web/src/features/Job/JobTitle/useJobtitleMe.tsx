import { useMemo } from "react";
import { SelectOption } from "../../../types";
import { useGetAllLookupsQuery } from "../../../app/api";
export const useJobtitleMe = () => {
  const { data } = useGetAllLookupsQuery();
  const { jobTitlesLookups, jobTitles } = useMemo(() => {
    const jobTitlesLookups = (data?.jobTitles || []).map<SelectOption>(
      ({ id, title, description }) => ({
        label: title || description || "",
        value: id,
      })
    );
    return { jobTitlesLookups, jobTitles: data?.jobTitles || [] };
  }, [data]);
  return {
    jobTitles,
    jobTitlesLookups,
  };
};
