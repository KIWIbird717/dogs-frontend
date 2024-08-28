import { ChangeEvent, FC, useState } from "react";
import { Input } from "@/shared/ui/Input";

interface ISearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const Search: FC<ISearchProps> = ({ value, onChange }) => {
  const [searchValue, setSearchValue] = useState(value ? value : null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value);
    setSearchValue(e.currentTarget.value);
  };

  return (
    <Input
      value={searchValue || ""}
      isIcon
      placeholder={"Search Guild"}
      onChange={onChangeHandler}
      type={"text"}
    />
  );
};
