import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import TableArea from "./components/table/table";
import { InfoArea } from "./components/Info/info-area";

const Page = () => {
  return (
    <div className="flex gap-6">
      <TableArea />
      <InfoArea />
    </div>
  );
};

export default Page;
