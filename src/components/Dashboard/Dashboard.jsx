import {
  getProjectsByOwner,
  getAllTasksByProjectId,
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
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [taskRefreshTrigger, setTaskRefreshTrigger] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState(0);

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

  const refreshProjects = () => setRefreshTrigger((prev) => prev + 1);
  const refreshTask = () => setTaskRefreshTrigger((prev) => prev + 1);

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
      {/* <HomePage
        onClickNewTask={handleCloseNewFormContainer}
        clickableButtons={buttonName}
        tasks={tasks}
      /> */}
      <TaskDetailPage
        onClickNewToDoTask={handleCloseNewFormContainer}
        clickableButtons={buttonName}
      />
      <NewFormContainer
        isShowNewFormContainer={showNewFormContainer}
        onClickClose={handleCloseNewFormContainer}
      >
        {childForm}
      </NewFormContainer>
    </main>
  );
}
