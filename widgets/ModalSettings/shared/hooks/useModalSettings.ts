import { useModal } from "@/shared/hooks/useModal";
import { MouseEvent, useEffect, useState } from "react";

export const useModalSettings = () => {
  const { onClose, modalData } = useModal();
  const { isOpen, type } = modalData;
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);
  const [language, setLanguage] = useState<"English" | "Russian">("English");

  const isModalOpen = isOpen && type === "settings";

  const onOpenLanguageChange = () => setIsOpenLanguage(true);
  const onCloseLanguageChange = () => setIsOpenLanguage(false);
  const onCloseWindowOrLang = () => {
    if (!isOpenLanguage) {
      onClose();
    } else {
      onCloseLanguageChange();
    }
  };

  useEffect(() => {
    if (!isModalOpen && isOpenLanguage) {
      onCloseLanguageChange();
    }
  }, [isModalOpen, isOpenLanguage]);

  const onCloseHandler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const onToggleLanguage = (lang: string) => {
    if (lang === "English") {
      setLanguage("English");
    } else {
      setLanguage("Russian");
    }
  };

  return {
    isOpenLanguage,
    isModalOpen,
    language,
    onToggleLanguage,
    onCloseHandler,
    onCloseWindowOrLang,
    onOpenLanguageChange,
  };
};
