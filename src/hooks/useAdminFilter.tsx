import { useEffect, useState } from "react";

const useAdminFilter = () => {
  const [filter, setFilter] = useState<Record<string, string[]>>({
    departments: [],
    permissions: [],
  });

  //부서 변경
  const setDept = (dept: string[]) => {
    setFilter((prev) => ({ ...prev, departments: dept }));
  };

  //권한 변경
  const setPerm = (perm: string[]) => {
    setFilter((prev) => ({ ...prev, permissions: perm }));
  };

  return { filter, setDept, setPerm };
};

export default useAdminFilter;
