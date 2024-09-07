import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/shared/ui/Accordion";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IAccordionListItemProps {
  title: string;
  description: string;
  index: number;
}

export const AccordionListItem: FC<IAccordionListItemProps> = ({ title, description, index }) => {
  return (
    <AccordionItem value={`${index}-1`}>
      <AccordionTrigger>
        <Typography
          tag={"p"}
          className={"w-[calc(100%-32px)] text-left text-[17px] font-bold leading-6 text-white-900"}
        >
          {title}
        </Typography>
      </AccordionTrigger>
      <AccordionContent>
        <Typography
          tag={"p"}
          className={"w-[calc(100%-32px)] text-[17px] font-normal leading-6 text-white-800"}
        >
          {description}
        </Typography>
      </AccordionContent>
    </AccordionItem>
  );
};
