"use client";

import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Field } from "@/widgets/Field";
import { Button } from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography/Typography";

interface ICreateGuildFieldsProps {
}

export const CreateGuildFields: FC<ICreateGuildFieldsProps> = () => {
  const inputFileRef = useRef<any>(null);
  const needBalance = 500;
  const bones = "0,000";
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState<File>();
  const [link, setLink] = useState("https://t.me/");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    let selectedFile = e.currentTarget?.files[0];
    const allowedTypes = ["image/png", "image/jpeg"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setIsError(true);
      setErrorMessage("Error Format Send PNG or JPGE");
    } else {
      setIsError(false);
      setErrorMessage("");
    }
    setAvatar(selectedFile);
  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value);
  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.currentTarget.value);
  const onChangeLink = (e: ChangeEvent<HTMLInputElement>) => setLink(e.currentTarget.value);

  useEffect(() => {
    if (
      name.length === 0 ||
      !avatar ||
      isError ||
      !(Number(bones) >= needBalance)
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [avatar, isError, name.length]);

  return (
    <div className={"w-full flex flex-col gap-2 z-[10]"}>
      <Field keyForLabel={"name"}
             label={"Name Guild"}
             value={name}
             onChange={onChangeName}
             isError={false}
             placeholder={"Name"}
             type={"text"}
             isCorrect={isCorrect}
      />

      <Field keyForLabel={"description"}
             label={"Description Guild"}
             value={description}
             onChange={onChangeDescription}
             isError={false}
             placeholder={"Up to 300 characters"}
             isTextArea
      />

      <Field keyForLabel={"link"}
             label={"Link to the Guild"}
             labelDescription={"Telegram only"}
             errorText={"Invalid link"}
             value={link}
             onChange={onChangeLink}
             isError={false}
             placeholder={"Link"}
             type={"url"}
      />
      <Field keyForLabel={"avatar"}
             label={"Choose avatar for Guild"}
             labelDescription={"Telegram only"}
             errorText={errorMessage}
             onChange={handleFile}
             isError={isError}
             type={"file"}
             inputRef={inputFileRef}
             value={!!avatar}
      />

      <div className={"w-full flex flex-col gap-4 pt-2"}>
        <Button variant={"primary"}
                disabled={isDisabled}
                className={"text-[18px] font-bold leading-6 text-white-900"}
        >
          Create Guild
        </Button>

        <div className={"w-full flex flex-col items-center gap-1"}>
          <Typography tag={"span"}
                      className={"text-white-800"}
          >
            You need {needBalance} bones
          </Typography>
          <Typography tag={"span"}
                      className={"text-red"}
          >
            Your balance {bones} bones
          </Typography>
        </div>
      </div>
    </div>
  );
};