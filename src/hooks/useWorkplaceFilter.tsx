import { useState } from "react";

const useWorkplaceFilter = () => {
  const [filter, setFilter] = useState<Record<string, string[] | string>>({
    //상태
    status: [],
    //검색어
    search: "",
    //현재 페이지
    page: "1",
    //볼 개수
    pageSize: "20",
  });

  //상태 변경
  const setStatus = (stat: string[]) => {
    setFilter((prev) => ({ ...prev, status: stat }));
  };

  //검색어 변경
  const setSearch = (search: string) => {
    setFilter((prev) => ({ ...prev, search }));
  };

  //현재페이지
  const setPage = (page: string) => {
    setFilter((prev) => ({ ...prev, page }));
  };

  //조회 개수
  const setPageSize = (pageSize: string) => {
    setFilter((prev) => ({ ...prev, pageSize }));
  };

  return { filter, setStatus, setSearch, setPage, setPageSize };
};

export default useWorkplaceFilter;
