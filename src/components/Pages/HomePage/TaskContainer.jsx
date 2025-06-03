import { TaskRow } from "./TaskRow";

const sectionStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "50px",
};

export function TaskContainer({
  loginUser,
  allUser,
  onClickNewTask,
  clickableButtons,
  seperateTasks,
  showTaskDetailPage,
  onChangeSelectedTaskId,
  setIsCardMenuVisible,
  isCardMenuVisible,
}) {
  const { toDoTasks, inProgressTasks, doneTasks } = seperateTasks;
  return (
    <section style={sectionStyle}>
      {/* {console.log(toDoTasks)}
      {console.log(inProgressTasks)}
      {console.log(doneTasks)} */}
      <TaskRow
        onClickNewTask={() => onClickNewTask(clickableButtons.NEW_TASK)}
        taskImage="https://images.unsplash.com/photo-1676594037928-4ae848ffec58?q=80&w=2728&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        taskRowTitle="To Do"
        tasks={toDoTasks}
        showTaskDetailPage={showTaskDetailPage}
        onChangeSelectedTaskId={onChangeSelectedTaskId}
        setIsCardMenuVisible={(flag) => setIsCardMenuVisible(flag)}
        isCardMenuVisible={isCardMenuVisible}
        loginUser={loginUser}
        allUser={allUser}
      />
      <TaskRow
        onClickNewTask={() => onClickNewTask(clickableButtons.NEW_TASK)}
        taskImage="https://images.unsplash.com/photo-1672009190560-12e7bade8d09?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        taskRowTitle="In Progress"
        tasks={inProgressTasks}
        showTaskDetailPage={showTaskDetailPage}
        onChangeSelectedTaskId={onChangeSelectedTaskId}
        setIsCardMenuVisible={(flag) => setIsCardMenuVisible(flag)}
        isCardMenuVisible={isCardMenuVisible}
        loginUser={loginUser}
        allUser={allUser}
      />
      <TaskRow
        onClickNewTask={() => onClickNewTask(clickableButtons.NEW_TASK)}
        taskImage="https://images.unsplash.com/photo-1576502200916-3808e07386a5?q=80&w=2665&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        taskRowTitle="Done"
        tasks={doneTasks}
        showTaskDetailPage={showTaskDetailPage}
        onChangeSelectedTaskId={onChangeSelectedTaskId}
        setIsCardMenuVisible={(flag) => setIsCardMenuVisible(flag)}
        isCardMenuVisible={isCardMenuVisible}
        loginUser={loginUser}
        allUser={allUser}
      />
    </section>
  );
}
