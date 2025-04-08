import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import TableArea from "./components/table/table";
import { InfoArea } from "./components/Info/info-area";

const Page = () => {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex gap-6">
        <TableArea />
        <InfoArea />
      </div>
      <Card className="h-full"></Card>
    </div>
  );
};

export default Page;
