// import React from "react";
// import { Popover, PopoverContent, PopoverTrigger } from "../popover";
// import { FormControl } from "../form";
// import { Button } from "../button";
// import { cn } from "@/lib/utils";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { Calendar } from "../calendar";
// import { ko } from "date-fns/locale";

// const DatePicker = ({ field }: { field: any }) => {
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <FormControl>
//           <Button
//             variant={"outline"}
//             className={cn(
//               "min-w-[240px] w-full pl-3 text-left font-normal",
//               !field.value && "text-muted-foreground"
//             )}
//           >
//             {field.value ? (
//               format(field.value, "yyyy-MM-dd")
//             ) : (
//               <span>날짜를 선택하세요.</span>
//             )}
//             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//           </Button>
//         </FormControl>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0" align="start">
//         <Calendar
//           mode="single"
//           locale={ko}
//           selected={field.value}
//           onSelect={field.onChange}
//           // disabled={(date) =>
//           //   date > new Date() || date < new Date("1900-01-01")
//           // }
//           initialFocus
//         />
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default DatePicker;
