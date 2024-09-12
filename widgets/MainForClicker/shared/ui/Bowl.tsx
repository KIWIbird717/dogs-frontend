import { levelImages } from "@/shared/lib/utils/setBowlsByLevel";
import React, { FC } from "react";

type BowlProps = {
  level: number;
};
export const Bowl: FC<BowlProps> = (props) => {
  if (!levelImages) return null;

  return levelImages.map((bowl, index) => {
    if (props.level !== index + 1) return;
    return (
      <div
        key={`bowl-${index + 1}`}
        className="h-full w-full"
        style={{ display: props.level === index + 1 ? "block" : "none" }}
      >
        <img
          src={bowl.src}
          alt={`bowl-${index + 1}`}
          className={"h-full max-h-full w-full max-w-full scale-125 object-cover"}
          width={100}
          height={100}
        />
      </div>
    );
  });
};
