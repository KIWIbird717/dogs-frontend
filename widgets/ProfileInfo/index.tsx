import { FC, useCallback, useMemo } from "react";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";
import { useModal } from "@/shared/hooks/useModal";
import { useUser } from "@/shared/hooks/useUser";
import { useRouter } from "next/navigation";
import { useCountries } from "@/shared/hooks/useCountries";
import { useAppSelector } from "@/shared/lib/redux-store/hooks";

interface IProfileInfoProps {}

export const ProfileInfo: FC<IProfileInfoProps> = () => {
  const { push } = useRouter();
  const { breedKey, age, country } = useAppSelector((store) => store.user);
  const { onOpenModal } = useModal();
  const { currentCountryName } = useCountries();

  const onOpenEditAgeModal = useCallback(() => onOpenModal("editAge"), [onOpenModal]);

  const items = useMemo(
    () => [
      {
        title: "Age",
        value: age ? age : "-",
        onClick: onOpenEditAgeModal,
      },
      {
        title: "Breed",
        value: breedKey,
        onClick: () => push("/profile/breed"),
      },
      {
        title: "Country",
        value: country ? currentCountryName : "-",
        onClick: () => push("/profile/country"),
      },
    ],
    [age, breedKey, country, currentCountryName, push],
  );

  return (
    <div className={"flex w-full gap-1"}>
      {items.map((item, i) => {
        return (
          <Button
            key={i}
            onClick={item.onClick}
            className={
              "flex h-full min-h-[62px] w-1/3 flex-col items-center justify-center gap-1 rounded-xl border border-black-300 bg-black-400 px-3 py-2"
            }
          >
            <Typography
              tag={"span"}
              className={"text-center text-[15px] font-normal leading-[18px] text-white-800"}
            >
              {item.title}
            </Typography>

            <Typography
              tag={"p"}
              className={"text-center text-[17px] font-bold leading-6 text-white-900"}
            >
              {item.value}
            </Typography>
          </Button>
        );
      })}
    </div>
  );
};
