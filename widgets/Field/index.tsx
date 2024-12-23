import { ChangeEvent, ChangeEventHandler, FC, Ref } from "react";
import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography/Typography";
import { Label } from "@/shared/ui/Label";
import { Button } from "@/shared/ui/Button/Button";
import FileIcon from "@/public/images/svg/guild/file.svg";
import { Textarea } from "@/shared/ui/Textarea";
import { twMerge } from "tailwind-merge";
import { AnimatePresence } from "framer-motion";
import { ErrorSpan } from "@/shared/ui/Field/shared/ErrorSpan";
import { FieldError } from "react-hook-form";

export interface IFieldProps {
  keyForLabel?: string;
  label?: string;
  labelDescription?: string;
  errorText?: string;
  value?: string | any;
  onChange: (
    value: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | string,
  ) => void;
  isError?: boolean;
  placeholder?: string;
  type?: string;
  inputRef?: any;
  isTextArea?: boolean;
  isCorrect?: boolean;
  buttonClassName?: string;
  error?: FieldError | undefined;
}

export const Field: FC<IFieldProps> = ({
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
  buttonClassName,
  error,
}) => {
  const validationValue = value && type !== "file" ? value : "";

  return (
    <div className={"flex w-full flex-col gap-[1px]"}>
      {!!label && (
        <Label
          className="ml-[10px]"
          keyForLabel={keyForLabel!}
          label={label}
          labelDescription={labelDescription}
        />
      )}

      {type === "file" && (
        <Button
          className={twMerge(
            "h-[48px] items-center justify-start border-[2px] px-3",
            !isError && value && "border-blue-900",
            error && "border-red",
            buttonClassName,
          )}
          variant={"select"}
          type="button"
          onClick={() => inputRef?.current.click()}
        >
          <Typography
            tag={"p"}
            className={"w-full text-[17px] font-normal leading-6 text-white-900"}
          >
            Attach Avatar
          </Typography>
          <div>
            <FileIcon />
          </div>
        </Button>
      )}

      {isTextArea ? (
        <Textarea
          id={keyForLabel}
          name={keyForLabel}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        ></Textarea>
      ) : (
        <Input
          id={keyForLabel}
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
      )}

      <AnimatePresence>{error && <ErrorSpan error={error} />}</AnimatePresence>

      {isError && (
        <Typography
          tag={"span"}
          className={"text-right text-[13px] font-normal leading-4 text-red"}
        >
          {errorText}
        </Typography>
      )}
    </div>
  );
};
