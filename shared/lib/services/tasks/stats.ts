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
   * POST /tasks
   */
  export const setTask = (taskId: number | string) => {
    return serverApi.post<TasksApiTypes.SetTaskResponse>(`/task/${taskId}`);
  };
}
