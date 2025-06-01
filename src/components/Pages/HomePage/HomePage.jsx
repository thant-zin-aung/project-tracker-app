import Header from "./Header/Header";
import { TaskContainer } from "./TaskContainer";
import PageStyle from "./HomePage.module.css";

export function HomePage({
  loginUser,
  onClickNewTask,
  clickableButtons,
  seperateTasks,
  showTaskDetailPage,
  onChangeSelectedTaskId,
}) {
  return (
    <div className={PageStyle.page}>
      <Header loginUser={loginUser} />
      <TaskContainer
        onClickNewTask={onClickNewTask}
        clickableButtons={clickableButtons}
        seperateTasks={seperateTasks}
        showTaskDetailPage={showTaskDetailPage}
        onChangeSelectedTaskId={onChangeSelectedTaskId}
      />
    </div>
  );
}
