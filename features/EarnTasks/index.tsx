"use client";

import { Header } from "@/widgets/Header";
import { useState } from "react";
import { TaskList } from "@/entities/TaskList";
import useSWR from "swr";
import { TasksService } from "@/shared/lib/services/tasks/stats";
import { RewardTaskList } from "@/entities/RewardTaskList";
import { ModalEarn } from "@/widgets/ModalEarn";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";
import { TabCategory } from "@/shared/types/tab-category";
import { AnimatePresence } from "framer-motion";
import { Tabs } from "./shared/Tabs";

export const EarnTasks = () => {
  const [toggle, setToggle] = useState<TabCategory>("rewards");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<TasksApiTypes.TasksDto | null>(null);

  const { data, mutate } = useSWR("/task", TasksService.getTasks);
  const tasks = data?.data;

  const notFoundTasks = tasks?.length === 0 ? "There are no tasks" : null;

  const handleModalOpen = ({ data }: { data: TasksApiTypes.TasksDto }) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };
  return (
    <>
      <ModalEarn
        isOpen={isModalOpen}
        data={{ task: modalData }}
        onClose={handleCloseModal}
        onComplete={(compliedTask) => {
          if (!compliedTask) return;
          if (!data) return;
          if (!tasks) return;

          const compliedTaskIndex = tasks?.findIndex((rawTask) => rawTask.id === compliedTask.id);
          delete tasks[compliedTaskIndex];

          mutate({ ...data, data: tasks });
        }}
      />

      <Header />

      <Tabs state={toggle} onChange={(category) => setToggle(category)} />

      <div className="z-[2] flex h-fit flex-col">
        <AnimatePresence>
          {toggle === "rewards" && (
            <RewardTaskList
              notFoundTasks={notFoundTasks}
              tasks={tasks || []}
              onOpen={handleModalOpen}
              toggle={toggle}
            />
          )}
          {toggle === "tasks" && (
            <TaskList
              notFoundTasks={notFoundTasks}
              onOpen={handleModalOpen}
              tasks={tasks || []}
              toggle={toggle}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
