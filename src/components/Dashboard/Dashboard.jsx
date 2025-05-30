import {
  getProjectsByOwner,
  getAllTasksByProjectId,
  getToDoTasksByTaskId,
} from "../../firestoreService";
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { SideBar } from "../SideBar.jsx";
import { HomePage } from "../Pages/HomePage/HomePage.jsx";
import { NewTaskForm } from "../Forms/NewTaskForm.jsx";
import { NewFormContainer } from "../Forms/NewFormContainer.jsx";
import { NewProjectForm } from "../Forms/NewProjectForm.jsx";
import { NewToDoTaskForm } from "../Forms/NewToDoTaskForm.jsx";
import { TaskDetailPage } from "../Pages/TaskDetailPage/TaskDetailPage.jsx";

const buttonName = {
  NEW_PROJECT: "new-project",
  NEW_TASK: "new-task",
  NEW_TODO_TASK: "new-todo-task",
};

let childForm;

export default function Dashboard() {
  const [showNewFormContainer, setShowNewFormContainer] = useState(false);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [taskRefreshTrigger, setTaskRefreshTrigger] = useState(0);
  const [todoTaskRefreshTrigger, setTodoTaskRefreshTrigger] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [isViewInTaskDetailPage, setIsViewInTaskDetailPage] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(0);

  useEffect(() => {
    const fetchProjectsAndTasks = async () => {
      try {
        const user = auth.currentUser;
        const myProjects = await getProjectsByOwner(user.uid);
        setProjects(() => myProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjectsAndTasks();
  }, [refreshTrigger]);

  useEffect(() => {
    if (!selectedProjectId) return;
    const fetchTasks = async () => {
      try {
        const tasks = await getAllTasksByProjectId(selectedProjectId);
        setTasks(tasks);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchTasks();
  }, [selectedProjectId, taskRefreshTrigger]);

  useEffect(() => {
    if (!selectedTaskId) return;
    const fetchProjectsAndTasks = async () => {
      try {
        const todoTaskList = await getToDoTasksByTaskId(selectedTaskId);
        setTodoTasks(todoTaskList);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjectsAndTasks();
  }, [selectedTaskId, todoTaskRefreshTrigger]);

  const refreshProjects = () => setRefreshTrigger((prev) => prev + 1);
  const refreshTask = () => setTaskRefreshTrigger((prev) => prev + 1);
  const refreshTodoTask = () => setTodoTaskRefreshTrigger((prev) => prev + 1);

  let handleCloseNewFormContainer = (clickedButton) => {
    switch (clickedButton) {
      case buttonName.NEW_PROJECT:
        childForm = (
          <NewProjectForm
            onClickClose={() =>
              handleCloseNewFormContainer(buttonName.NEW_PROJECT)
            }
            refreshProjects={refreshProjects}
          />
        );
        break;
      case buttonName.NEW_TASK:
        childForm = (
          <NewTaskForm
            onClickClose={() =>
              handleCloseNewFormContainer(buttonName.NEW_TASK)
            }
            projectId={selectedProjectId}
            refreshTasks={refreshTask}
          />
        );
        break;
      case buttonName.NEW_TODO_TASK:
        childForm = (
          <NewToDoTaskForm
            onClickClose={() =>
              handleCloseNewFormContainer(buttonName.NEW_TODO_TASK)
            }
            selectedTaskId={selectedTaskId}
            refreshTodoTask={refreshTodoTask}
          />
        );
        break;
      default:
        console.log("Unknown button clicked");
        childForm = null;
    }
    setShowNewFormContainer((prev) => !prev);
  };

  return (
    <main>
      <SideBar
        onClickNewProject={handleCloseNewFormContainer}
        clickableButtons={buttonName}
        projects={projects}
        selectedProjectId={selectedProjectId}
        onChangeSelectedProjectId={(projectId) => {
          setSelectedProjectId(projectId);
        }}
      />
      {!isViewInTaskDetailPage ? (
        <HomePage
          onClickNewTask={handleCloseNewFormContainer}
          clickableButtons={buttonName}
          tasks={tasks}
          showTaskDetailPage={() => setIsViewInTaskDetailPage(true)}
          onChangeSelectedTaskId={(taskId) => {
            setSelectedTaskId(taskId);
          }}
        />
      ) : (
        <TaskDetailPage
          onClickNewToDoTask={handleCloseNewFormContainer}
          clickableButtons={buttonName}
          todoTasks={todoTasks}
        />
      )}

      <NewFormContainer
        isShowNewFormContainer={showNewFormContainer}
        onClickClose={handleCloseNewFormContainer}
      >
        {childForm}
      </NewFormContainer>
    </main>
  );
}
