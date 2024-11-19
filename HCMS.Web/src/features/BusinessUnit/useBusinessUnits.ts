import { useMemo } from "react";
import { SelectOption } from "../../types";
import { useGetAllLookupsQuery } from "../../app/api/HCMSApi";

export const useBusinessUnit = () => {
  const { data } = useGetAllLookupsQuery();

  const { businessUnitLookups, branches } = useMemo(() => {
    const businessUnitLookups = (data?.businessUnits || []).map<SelectOption>(
      ({ id, name, businessUnitID }) => ({
        label: name || businessUnitID || "",
        value: id,
      })
    );
    return { businessUnitLookups, branches: data?.businessUnits || [] };
  }, [data]);
  return {
    branches,
    businessUnitLookups,
  };
};

//customized hook the hook
export const useBussinsUnit = () => {
  const { data } = useGetAllLookupsQuery();
  const { businessUnitLookups, branches } = useMemo(() => {
    const businessUnitLookups = (data?.businessUnits || []).map<SelectOption>(
      ({ id, name, businessUnitID }) => ({
        label: name || businessUnitID || "",
        value: id,
      })
    );
    return { businessUnitLookups, branches: data?.businessUnits || [] };
  }, [data]);
  return { branches, businessUnitLookups };
};
//customized Query

export const UseBussinessunit = () => {
  const { data } = useGetAllLookupsQuery();
  const { bussinessUnitLookups, branches } = useMemo(() => {
    const bussinessUnitLookups = (data?.businessUnits || []).map<SelectOption>(
      ({ id, name, businessUnitID }) => ({
        label: name || businessUnitID || "",
        valaue: id,
      })
    );
    return { bussinessUnitLookups, branches: data?.businessUnits || [] };
  }, [data]);
  return { branches, bussinessUnitLookups };
};
