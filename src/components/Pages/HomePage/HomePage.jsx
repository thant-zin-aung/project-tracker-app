import Header from "./Header/Header";
import { TaskContainer } from "./TaskContainer";
import PageStyle from "./HomePage.module.css";

export function HomePage({
  loginUser,
  allUser,
  currentProject,
  onClickNewTask,
  clickableButtons,
  seperateTasks,
  showTaskDetailPage,
  onChangeSelectedTaskId,
  setIsCardMenuVisible,
  isCardMenuVisible,
}) {
  return (
    <div className={PageStyle.page}>
      <Header
        loginUser={loginUser}
        allUser={allUser}
        currentProject={currentProject}
        onClickInviteUser={onClickNewTask}
        clickableButtons={clickableButtons}
      />
      <TaskContainer
        onClickNewTask={onClickNewTask}
        clickableButtons={clickableButtons}
        seperateTasks={seperateTasks}
        showTaskDetailPage={showTaskDetailPage}
        onChangeSelectedTaskId={onChangeSelectedTaskId}
        setIsCardMenuVisible={(flag) => setIsCardMenuVisible(flag)}
        isCardMenuVisible={isCardMenuVisible}
        loginUser={loginUser}
        allUser={allUser}
        currentProject={currentProject}
      />
    </div>
  );
}
