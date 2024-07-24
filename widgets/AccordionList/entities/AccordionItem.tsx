import { FC } from "react";
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from "@/shared/ui/Accordion";
import { Typography } from "@/shared/ui/Typography/Typography";

interface IAccordionListItemProps {
  title: string,
  description: string,
  index: number,
}

export const AccordionListItem: FC<IAccordionListItemProps> = (
  {
    title,
    description,
    index,
  },
) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={`${index}-1`}>
        <AccordionTrigger>
          <Typography tag={"p"}
                      className={"text-[17px] text-left leading-6 font-bold text-white-900 w-[calc(100%-32px)]"}
          >
            {title}
          </Typography>
        </AccordionTrigger>
        <AccordionContent>
          <Typography tag={"p"}
                      className={"text-[17px] leading-6 font-normal text-white-800 w-[calc(100%-32px)]"}
          >
            {description}
          </Typography>

        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};