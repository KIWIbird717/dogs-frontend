import { serverApi } from "../../axios";
import { TasksApiTypes } from "@/shared/lib/services/tasks/types";

export namespace TasksService {
  /**
   * GET /tasks
   */
  export const getTasks = () => {
    return serverApi.get<TasksApiTypes.TasksDto[]>(`/task`);
  };

  /**
   * GET /tasks
   */
  export const getTask = (taskId: number) => {
    return serverApi.get<TasksApiTypes.TasksDto>(`/task/${taskId}`);
  };

  /**
   * GET /tasks
   */
  export const setTask = (taskId: number) => {
    return serverApi.post(`/task/${taskId}`);
  };
}
