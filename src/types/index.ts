export interface PhaseType {
  name: string;
  phaseId: number;
  completed: boolean;
  locked: boolean;
  tasks: TaskType[];
}
export interface TaskType {
  name: string;
  taskId: number;
  completed: boolean;
  locked: boolean;
}
export interface StartupType {
  name: string;
  phases: PhaseType[];
  startupId: number;
}

export interface initialStateTypes {
  isAuthorized: boolean;
  loading: boolean;
  hasErrors: boolean;
  data: StartupType[];
}

export interface finalStateTypes {
  app: {
    isAuthorized: boolean;
    loading: boolean;
    hasErrors: boolean;
    data: StartupType[];
  };
}
