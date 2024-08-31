import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { useModalSettings } from "@/widgets/ModalSettings/shared/hooks/useModalSettings";
import { Settings } from "@/widgets/ModalSettings/entities/Settings";
import { Language } from "@/widgets/ModalSettings/entities/Language";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const MotionDiv = dynamic(() => import("framer-motion").then((mod) => mod.motion.div));


interface IModalSettingsProps {
}

export const ModalSettings: FC<IModalSettingsProps> = () => {
  const {
    isModalOpen,
    language,
    isOpenLanguage,
    onOpenLanguageChange,
    onToggleLanguage,
    onCloseWindowOrLang,
    onCloseHandler,
  } = useModalSettings();

  const containerHeight = isOpenLanguage ? 212 : 346;



  return (
    <AnimatePresence>
      {isModalOpen && (
        <MotionDiv
          className="fixed left-0 top-0 z-[100] flex h-full w-full flex-col items-center justify-center"
          initial={{ backgroundColor: "rgba(0, 0, 0, 0)", opacity: 0 }}
          animate={{ backgroundColor: "rgba(0, 0, 0, 0.3)", opacity: 1 }}
          exit={{ backgroundColor: "rgba(0, 0, 0, 0)", opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onCloseHandler}
        >
          <MotionDiv
            className="relative w-[344px] flex-col rounded-xl border border-black-300 p-4 pb-6 shadow-buttonNoAccent"
            initial={{ height: 346, opacity: 0 }}
            animate={{ height: containerHeight, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              {isOpenLanguage ? (
                <MotionDiv
                  key="language"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <Language
                    language={language}
                    onCloseWindowOrLang={onCloseWindowOrLang}
                    onToggleLanguage={onToggleLanguage}
                  />
                </MotionDiv>
              ) : (
                <MotionDiv
                  key="settings"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                >
                  <Settings
                    language={language}
                    onCloseWindowOrLang={onCloseWindowOrLang}
                    onOpenLanguageChange={onOpenLanguageChange}
                  />
                </MotionDiv>
              )}
            </AnimatePresence>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};
