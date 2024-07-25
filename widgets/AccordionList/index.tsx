import { FC } from "react";
import { AccordionListItem } from "@/widgets/AccordionList/entities/AccordionItem";
import { Typography } from "@/shared/ui/Typography/Typography";


interface IAccordionListProps {
}

const faqs = [
  {
    title: "Why Bowl",
    description: "At Dogs Bot we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below. ",
  }, {
    title: "Why Bowl",
    description: "At Dogs Bot we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below. ",
  }, {
    title: "Why Bowl",
    description: "At Dogs Bot we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below. ",
  }, {
    title: "Why Bowl",
    description: "At Dogs Bot we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below. ",
  }, {
    title: "Why Bowl",
    description: "At Dogs Bot we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below. ",
  }, {
    title: "Why Bowl",
    description: "At Dogs Bot we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below. ",
  }, {
    title: "Why Bowl",
    description: "At Dogs Bot we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below. ",
  }, {
    title: "Why Bowl",
    description: "At Dogs Bot we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below. ",
  }, {
    title: "Why Bowl",
    description: "At Dogs Bot we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below. ",
  }, {
    title: "Why Bowl",
    description: "At Dogs Bot we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below. ",
  }, {
    title: "Why Bowl",
    description: "At Dogs Bot we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below. ",
  }, {
    title: "Why Bowl",
    description: "At Dogs Bot we expect at a day’s start is you, better and happier than yesterday. We have got you covered share your concern or check our frequently asked questions listed below. ",
  },
];

export const AccordionList: FC<IAccordionListProps> = () => {
  return (
    <div className={"w-full flex flex-col gap-4 overflow-auto z-[10]"}>

      <Typography tag={"h2"}
                  className={"text-white"}
      >
        FAQ
      </Typography>

      <div className={"w-full h-auto flex flex-col gap-2 pb-[180px] overflow-y-scroll"}>
        {faqs.map((item, i) => {
          return <AccordionListItem key={i}
                                    title={item.title}
                                    description={item.description}
                                    index={i}
          />;
        })}
      </div>
    </div>
  );
};