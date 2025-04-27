import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { title } from "process";

interface IconAccordionProps {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: React.ReactNode;
}

export const IconAccordion = ({
  label,
  icon: Icon,
  children,
}: IconAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="w-full border rounded-sm ">
      <AccordionItem className="" value="item-1">
        <AccordionTrigger className="flex gap-6 px-4 justify-between hover:no-underline">
          <div className="flex gap-6 ">
            <Icon className="w-5 text-blue-500" />
            <span>{label}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4  grid grid-cols-2 gap-x-16 gap-y-8">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
