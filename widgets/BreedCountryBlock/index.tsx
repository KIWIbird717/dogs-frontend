import { FC } from "react";
import { IBreedCountry } from "@/app/profile/breed/page";
import { Input } from "@/shared/ui/Input";
import { NotFound } from "@/shared/ui/NotFound";
import { BreedCountryList } from "@/widgets/BreedCountryList";

interface IBreedCountryBlockProps {
  items: IBreedCountry[];
  item: string;
  onClick: (value: string) => void;
  onChange: (value: string) => void;
  setClearValue: () => void;
  value: string;
}

export const BreedCountryBlock: FC<IBreedCountryBlockProps> = (
  {
    items,
    item,
    onClick,
    onChange,
    value,
    setClearValue,
  },
) => {

  const filteredItems = items.filter((breed) =>
    breed.value.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div className={"w-full flex flex-col gap-4 overflow-y-auto z-[10]"}>
      <div className={""}>
        <Input isIcon
               placeholder={"Search Breed"}
               value={value}
               type={"search"}
               onClear={setClearValue}
               onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>

      <div className={"w-full flex flex-col gap-2 overflow-y-scroll pb-[112px]"}>
        {filteredItems.length > 0
          ? <BreedCountryList items={filteredItems}
                              onClick={onClick}
                              item={item}
          />
          : <NotFound title={"breed"}
                      searchValue={value}
                      onClick={setClearValue}

          />
        }
      </div>
    </div>
  );
};