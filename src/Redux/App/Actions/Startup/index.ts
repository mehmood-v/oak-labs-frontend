import { requestStart, requestCompleted, requestSuccess } from "../..";
import { notification } from "antd";
import { Dispatch } from "redux";
import StartupData from "startupdata.json";
import { PhaseType, StartupType, TaskType } from "types";

export function LoadStartupData() {
  return async (dispatch: Dispatch) => {
    dispatch(requestStart());
    try {
      localStorage.setItem("startupData", JSON.stringify(StartupData));
      dispatch(requestCompleted());
    } catch (error) {
      dispatch(requestCompleted());
    }
  };
}

//Get startup data
export function GetStartupData() {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(requestStart());
      const startupData = localStorage.getItem("startupData");
      if (startupData) dispatch(requestSuccess(JSON.parse(startupData)));
    } catch (error) {
      dispatch(requestCompleted());
    }
  };
}

//ADD an Mark Task and Phase as completed
export function MarkTaskAsComplete(params: {
  startupId: number;
  taskId: number;
  phaseId: number;
  completed: boolean;
}) {
  return async (dispatch: Dispatch, state: any) => {
    const stateData = state();

    const startup = stateData.app.data.find(
      (startup: StartupType) => startup.startupId === params.startupId
    );

    const checkCompletion = checkTaskCompletion(
      startup.phases,
      params.taskId,
      params.phaseId
    );
    if (checkCompletion === "found uncompleted item") {
      notification.error({
        message: "Some tasks are completed in the previous phases",
      });
      return;
    }
    const result = startup?.phases.map((phase: PhaseType) => {
      return {
        ...phase,
        tasks: phase.tasks.map((task: TaskType) => {
          if (
            task.taskId === params.taskId &&
            phase.phaseId === params.phaseId
          ) {
            return {
              ...task,
              completed: params.completed,
            };
          } else {
            return { ...task };
          }
        }),
        completed:
          phase.phaseId === params.phaseId && !params.completed
            ? false
            : phase.completed,
      };
    });

    const checkPhaseCompletion = result.map((phase: PhaseType) => {
      return {
        ...phase,
        completed:
          phase.phaseId === params.phaseId &&
          phase.tasks.filter((task) => !task.completed).length === 0
            ? true
            : phase.completed,
      };
    });

    if (checkPhaseCompletion && checkPhaseCompletion.length > 0) {
      dispatch(
        requestSuccess([
          {
            name: startup?.name,
            phases: checkPhaseCompletion,
            startupId: params.startupId,
          },
        ])
      );
    }

    localStorage.setItem(
      "startupData",
      JSON.stringify([
        {
          name: startup?.name,
          phases: checkPhaseCompletion,
          startupId: params.startupId,
        },
      ])
    );
  };
}

//Check the completion of all previous phases tasks
const checkTaskCompletion = (
  phase: PhaseType[],
  taskId: number,
  phaseId: number
) => {
  for (const phaseItem of phase) {
    if (phaseItem.phaseId === phaseId) {
      return;
    }

    for (const taskItem of phaseItem.tasks) {
      if (!taskItem.completed) {
        return "found uncompleted item";
      }
    }
  }
};
