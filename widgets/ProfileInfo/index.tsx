import { FC, useMemo } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import { useModal } from "@/shared/hooks/useModal";
import { useUser } from "@/shared/hooks/useUser";

interface IProfileInfoProps {
}

export const ProfileInfo: FC<IProfileInfoProps> = () => {
  const {age} = useUser()
  const {onOpenModal} = useModal()

  const onOpenEditAgeModal = () => onOpenModal("editAge", {})

  const items = useMemo(() => [
    {
      title: "Age",
      value: age,
      onClick: onOpenEditAgeModal,
    }, {
      title: "Breed",
      value: "Husky",
      onClick: () => {
      },
    }, {
      title: "Country",
      value: "Ukraine",
      onClick: () => {
      },
    },
  ], [age, onOpenEditAgeModal]);

  return (
    <div className={"w-full flex gap-1"}>
      {items.map((item, i) => {
        return <Button key={i}
                       onClick={item.onClick}
                       className={"flex flex-col h-full min-h-[62px] gap-1 items-center justify-center w-1/3 rounded-xl py-2 px-3 bg-black-400 border border-black-300"}
        >
          <Typography tag={"span"}
                      className={"font-normal text-[15px] leading-[18px] text-center text-white-800"}
          >
            {item.title}
          </Typography>

          <Typography tag={"p"}
                      className={"text-[17px] leading-6 font-bold text-center text-white-900"}
          >
            {item.value}
          </Typography>
        </Button>;
      })}
    </div>
  );
};