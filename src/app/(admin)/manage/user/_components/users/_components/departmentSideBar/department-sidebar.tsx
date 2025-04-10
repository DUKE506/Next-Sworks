import { useAdminStore } from "@/store/admin-store";
import React from "react";

const DepartmentSideBar = () => {
  const { departmentList, setAdminsByDepartment } = useAdminStore();

  return (
    <div className="flex flex-col gap-6 px-3 pt-6 flex-1/8">
      <span className="text-lg text-muted-foreground px-3">부서</span>
      <div className="flex flex-col gap-4">
        {departmentList.map((dept, idx) => {
          return (
            <DepartItem
              key={idx}
              label={dept.name}
              value={dept.value.toString()}
              onClick={() => setAdminsByDepartment(dept)}
            />
          );
        })}
      </div>
    </div>
  );
};

const DepartItem = ({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick: () => void;
}) => {
  const { selectedDepartment } = useAdminStore();

  return (
    <div
      className={`flex justify-between p-3 rounded-sm
        ${
          selectedDepartment?.name == label
            ? "bg-[var(--primary-light-color)]"
            : null
        } hover:cursor-pointer`}
      onClick={onClick}
    >
      <span
        className={`text-xs ${
          selectedDepartment?.name == label
            ? "text-[var(--primary-color)]"
            : null
        }`}
      >
        {label}
      </span>
      <span
        className={`text-xs ${
          selectedDepartment?.name == label
            ? "text-[var(--primary-color)]"
            : "text-muted-foreground"
        }`}
      >
        ({value})
      </span>
    </div>
  );
};

export default DepartmentSideBar;
