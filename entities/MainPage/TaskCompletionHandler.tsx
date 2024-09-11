"use client";

import { Localstorage, LocalStorageKeys } from "@/shared/constants/localstorage-keys";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export const TaskCompletionHandler = () => {
  useEffect(() => {
    const compliedTask = localStorage.getItem(LocalStorageKeys.CompliedTask);
    if (!compliedTask) return;

    const parsedTask = JSON.parse(compliedTask) as Localstorage.CompliedTaskRawType;
    const earned = Intl.NumberFormat("en-US").format(parsedTask.earned);
    toast.success(`Task complied +${earned}`);

    localStorage.removeItem(LocalStorageKeys.CompliedTask);
  }, []);

  return <Toaster />;
};
