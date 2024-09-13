import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export type HeadersType = {
  id: number;
  title: ReactNode;
  description: ReactNode;
  // image: ReactNode | StaticImageData;
  image: StaticImageData;
};
