import { useEffect } from "react";
import { Card, Checkbox } from "antd";
import { CardWrapper } from "./styles";
import { useAppDispatch, useAppSelector } from "Hooks/Store";
import { GetStartupData, MarkTaskAsComplete } from "Redux/App/Actions/Startup";
import { data as stateData, loading as stateLoading } from "Redux/App";
import LoadingSpinner from "Components/Shared/LoadingSpinner";
import { CheckOutlined } from "@ant-design/icons";
const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(stateData);
  const loading = useAppSelector(stateLoading);

  const { phases } = data[0];

  useEffect(() => {
    dispatch(GetStartupData());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <CardWrapper>
      <div className="progress-card">
        <Card
          title="My startup progress"
          bordered={false}
          style={{ width: 300 }}
        >
          {phases?.map((phase, index) => (
            <>
              <div className="phase-name-alignment">
                <div className="phase-number ">{index + 1} </div>
                <h2 className="phase-title">
                  {phase.name} {phase.completed && <CheckOutlined />}
                </h2>
              </div>

              {phase.tasks.map((task: any) => (
                <div className="task-name-alignment">
                  <Checkbox
                    checked={task.completed}
                    onChange={(e) => {
                      dispatch(
                        MarkTaskAsComplete({
                          startupId: data && data[0].startupId,
                          taskId: task.taskId,
                          phaseId: phase.phaseId,
                          completed: e.target.checked,
                        })
                      );
                    }}
                  />
                  <b>{task.name}</b>
                </div>
              ))}
            </>
          ))}
        </Card>
      </div>
    </CardWrapper>
  );
};

export default App;
