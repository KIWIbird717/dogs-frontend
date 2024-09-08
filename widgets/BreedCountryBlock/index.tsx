import { FC } from "react";
import { Input } from "@/shared/ui/Input";
import { NotFound } from "@/shared/ui/NotFound";
import { BreedCountryList } from "@/widgets/BreedCountryList";
import { IBreedCountry } from "@/app/profile/country/page";

interface IBreedCountryBlockProps {
  items: IBreedCountry[];
  item: string;
  onClick: (value: string) => void;
  onChange: (value: string) => void;
  setClearValue: () => void;
  value: string;
  pageName: "country" | "breed";
}

export const BreedCountryBlock: FC<IBreedCountryBlockProps> = ({
  items,
  item,
  onClick,
  onChange,
  value,
  setClearValue,
  pageName,
}) => {
  if (!items) return null;

  const filteredItems = items.filter((breed) =>
    breed.name.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div className={"z-[10] flex w-full flex-col gap-4 overflow-y-auto"}>
      <div className={""}>
        <Input
          isIcon
          placeholder={"Search Breed"}
          value={value}
          type={"search"}
          onClear={setClearValue}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>

      <div className={"flex w-full flex-col gap-2 overflow-y-scroll pb-[112px]"}>
        {filteredItems.length > 0 ? (
          <BreedCountryList items={filteredItems} onClick={onClick} item={item} />
        ) : (
          <NotFound title={pageName} searchValue={value} onClick={setClearValue} />
        )}
      </div>
    </div>
  );
};
