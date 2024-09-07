"use client";

import { Localstorage, LocalstorageKeys } from "@/shared/constants/localstorage-keys";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export const TaskCompletionHandler = () => {
  useEffect(() => {
    const compliedTask = localStorage.getItem(LocalstorageKeys.CompliedTask);
    if (!compliedTask) return;

    const parsedTask = JSON.parse(compliedTask) as Localstorage.CompliedTaskRawType;
    const earned = Intl.NumberFormat("en-US").format(parsedTask.earned);
    toast.success(`Task complied +${earned}`);
  }, []);

  return <Toaster />;
};
