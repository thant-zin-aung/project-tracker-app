import {
  getAllUsers,
  getUserInfo,
  getProjectsByOwner,
  getAllTasksByProjectId,
  getAllProjectsIncludingUser,
  getToDoTasksByTaskId,
  getTaskById,
  getTasksByProjectSeparated,
  getTasksByUserSeparated,
  getProjectInfoByProjectId,
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
import { InviteUserForm } from "../Forms/InviteUserForm.jsx";

const buttonName = {
  NEW_PROJECT: "new-project",
  NEW_TASK: "new-task",
  NEW_TODO_TASK: "new-todo-task",
  INVITE_USER_FORM: "invite-user-form",
};

let childForm;

export default function Dashboard() {
  const [allUser, setAllUser] = useState([]);
  const [loginUser, setLoginUser] = useState({});
  const [showNewFormContainer, setShowNewFormContainer] = useState(false);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({});
  const [tasks, setTasks] = useState({
    toDoTasks: [],
    inProgressTasks: [],
    doneTasks: [],
  });
  const [todoTasks, setTodoTasks] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [taskRefreshTrigger, setTaskRefreshTrigger] = useState(0);
  const [todoTaskRefreshTrigger, setTodoTaskRefreshTrigger] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [isViewInTaskDetailPage, setIsViewInTaskDetailPage] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(0);
  const [selectedTask, setSelectedTask] = useState({});

  useEffect(() => {
    const fetchAllUserInfo = async () => {
      try {
        const allUserInfo = await getAllUsers();
        setAllUser(allUserInfo);
      } catch (error) {
        console.error("Error fetching all userInfo:", error);
      }
    };
    fetchAllUserInfo();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = auth.currentUser;
        const userInfo = await getUserInfo(user.uid);
        setLoginUser(userInfo);
      } catch (error) {
        console.error("Error fetching userInfo:", error);
      }
    };
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchCurrentProjectInfo = async () => {
      try {
        const currentProjectInfo = await getProjectInfoByProjectId(
          selectedProjectId
        );
        setCurrentProject(currentProjectInfo);
      } catch (error) {
        console.error("Error fetching current project info:", error);
      }
    };
    fetchCurrentProjectInfo();
  }, [selectedProjectId]);

  useEffect(() => {
    const fetchProjectsAndTasks = async () => {
      try {
        const user = auth.currentUser;
        const myProjects = await getAllProjectsIncludingUser(user.uid);
        setProjects(() => myProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjectsAndTasks();
  }, [refreshTrigger]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let seperateTasks;
        if (!selectedProjectId) {
          seperateTasks = await getTasksByUserSeparated(auth.currentUser.uid);
        } else {
          seperateTasks = await getTasksByProjectSeparated(selectedProjectId);
        }
        setTasks(seperateTasks);
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
        const currentTask = await getTaskById(selectedTaskId);
        setSelectedTask(currentTask);
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
      case buttonName.INVITE_USER_FORM:
        childForm = (
          <InviteUserForm
            onClickClose={() =>
              handleCloseNewFormContainer(buttonName.INVITE_USER_FORM)
            }
            refreshTasks={refreshTask}
            allUser={allUser}
            loginUser={loginUser}
            selectedProjectId={selectedProjectId}
            currentProject={currentProject}
          />
        );
        break;
      default:
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
          loginUser={loginUser}
          onClickNewTask={handleCloseNewFormContainer}
          clickableButtons={buttonName}
          seperateTasks={tasks}
          showTaskDetailPage={() => setIsViewInTaskDetailPage(true)}
          onChangeSelectedTaskId={(taskId) => {
            setSelectedTaskId(taskId);
          }}
        />
      ) : (
        <TaskDetailPage
          onClickNewToDoTask={handleCloseNewFormContainer}
          clickableButtons={buttonName}
          selectedTask={selectedTask}
          todoTasks={todoTasks}
          refreshTodoTask={refreshTodoTask}
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
