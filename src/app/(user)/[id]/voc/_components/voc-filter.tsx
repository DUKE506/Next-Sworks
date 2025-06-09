import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MultiSelect from "@/components/ui/custom-select/multi-select";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import { VocInputChannel, VocStatus, VocType } from "@/types/(user)/voc/voc";
import {
  Hourglass,
  Layers,
  MapPin,
  NotebookPen,
  RotateCcw,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const building = [
  {
    name: "본관",
  },
  {
    name: "별관",
  },
];

const VocFilter = () => {
  const router = useRouter();
  const [filterChannel, setFilterChannel] = useState<string[]>([]);
  const [filterLocation, setFilterLocation] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams();
    filterChannel.map((d) => params.append("channel", d));
    filterLocation.map((d) => params.append("location", d));
    filterType.map((d) => params.append("type", d));
    filterStatus.map((d) => params.append("status", d));
    router.push(`?${params.toString()}`);
  }, [router, filterChannel, filterLocation, filterType, filterStatus]);

  const handleClear = () => {
    setFilterChannel([]);
    setFilterLocation([]);
    setFilterType([]);
    setFilterStatus([]);
  };

  return (
    <div className="border-b border-t py-4 px-2">
      <div className="flex px-0 justify-between">
        <Input className="w-60 rounded-sm" placeholder="민원인" />
        <div className="flex gap-4 items-center ">
          <MultiSelect
            placeholder="민원구분"
            data={VocInputChannel}
            selected={filterChannel}
            icon={NotebookPen}
            onClick={(data) => setFilterChannel(data)}
          />
          {/* <MultiSelect
            placeholder="위치"
            data={building}
            selected={filterLocation}
            icon={MapPin}
            onClick={(data) => setFilterLocation(data)}
          /> */}
          <MultiSelect
            placeholder="민원유형"
            data={VocType}
            selected={filterType}
            icon={Layers}
            onClick={(data) => setFilterType(data)}
          />
          <MultiSelect
            placeholder="상태"
            data={VocStatus}
            selected={filterStatus}
            icon={Hourglass}
            onClick={(data) => setFilterStatus(data)}
          />
          <RotateCcw
            className="w-5 cursor-pointer text-[var(--description-title-color)] hover:text-black"
            onClick={() => handleClear()}
          />
        </div>
      </div>
    </div>
  );
};

export default VocFilter;
