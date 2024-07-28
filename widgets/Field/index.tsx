import { ChangeEvent, ChangeEventHandler, FC, Ref } from "react";
import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Label } from "@/shared/ui/Label";
import { Button } from "@/shared/ui/Button/Button";
import FileIcon from "@/public/images/svg/guild/file.svg";
import { Textarea } from "@/shared/ui/Textarea";
import { twMerge } from "tailwind-merge";

interface IFieldProps {
  keyForLabel?: string;
  label?: string;
  labelDescription?: string;
  errorText?: string;
  value?: string | any;
  onChange: (
    value: ChangeEvent<HTMLInputElement> |
      ChangeEvent<HTMLTextAreaElement>
      | string) => void;
  isError: boolean;
  placeholder?: string;
  type?: string;
  inputRef?: any;
  isTextArea?: boolean;
  isCorrect?: boolean;
  buttonClassName?: string
}

export const Field: FC<IFieldProps> = (
  {
    keyForLabel,
    labelDescription,
    label,
    errorText,
    value,
    onChange,
    isError,
    placeholder,
    type,
    inputRef,
    isTextArea,
    isCorrect,
    buttonClassName
  },
) => {

  const validationValue = (value && type !== "file") ? value : "";

  return (
    <div className={"w-full flex flex-col gap-2"}>
      {!!label && <Label keyForLabel={keyForLabel!}
              label={label}
              labelDescription={labelDescription}
      />}


      {type === "file" && <Button className={twMerge(
        "h-[48px] items-center justify-start px-3 border-[2px]",
        !isError && value && "border-blue-900",
        isError && "border-red",
        buttonClassName,

      )}
                                  variant={"select"}
                                  onClick={() => inputRef?.current.click()}
      >
        <Typography tag={"p"}
                    className={"text-[17px] font-normal leading-6 text-white-900 w-full"}
        >
          Attach Avatar
        </Typography>
        <div>
          <FileIcon />
        </div>
      </Button>}

      {isTextArea
        ? <Textarea id={keyForLabel}
                    name={keyForLabel}
                    onChange={onChange}
                    value={value}
                    placeholder={placeholder}
        >

        </Textarea>
        : <Input id={keyForLabel}
                 name={keyForLabel}
                 placeholder={placeholder}
                 value={validationValue}
                 type={type ? type : "text"}
                 onChange={onChange}
                 isInputError={isError}
                 ref={inputRef}
                 hidden={type === "file"}
                 className={twMerge(isCorrect && "border-[2px] border-green")}
        />
      }

      {isError && (
        <Typography tag={"span"} className={"text-red text-[13px] font-normal leading-4 text-right"}>
          {errorText}
        </Typography>
      )}

    </div>
  );
};