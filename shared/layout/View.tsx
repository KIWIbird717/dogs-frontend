import { CSSProperties, FC, ReactNode } from "react";
import { cn } from "../lib/utils/cn";
import styles from "./styles.module.scss";

type Props = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
  /**
   * Появление контента внутри
   * лейаута с плавным появлением
   */
  fadeInOnLoad?: boolean;
};

/**
 * Обертка для страницы, чтобы предотвратить закрытие окна webapp
 * Подробнее в README.md
 */
export const View: FC<Props> = (props) => {
  return (
    <main
      className={cn(
        `relative h-[calc(100svh+1px)]`,
        props.className,
        styles["hidden-scrollbar"],
        props.fadeInOnLoad && styles["animate-fadeIn"],
      )}
    >
      {props.children}
    </main>
  );
};
