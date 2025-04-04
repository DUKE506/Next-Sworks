import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Button>
        <Link href={"/manage/workplace"}>Admin</Link>
      </Button>
    </div>
  );
}
