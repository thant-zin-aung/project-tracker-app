import { getProjectsByOwner } from "../../firestoreService";
import { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { SideBar } from "../SideBar.jsx";
import { HomePage } from "../Pages/HomePage/HomePage.jsx";
import { NewTaskForm } from "../Forms/NewTaskForm.jsx";
import { NewFormContainer } from "../Forms/NewFormContainer.jsx";
import { NewProjectForm } from "../Forms/NewProjectForm.jsx";

const buttonName = {
  NEW_PROJECT: "new-project",
  NEW_TASK: "new-task",
};

let childForm;

export default function Dashboard() {
  const [showNewFormContainer, setShowNewFormContainer] = useState(false);
  const [projects, setProjects] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchMyProjects = async () => {
      try {
        const user = auth.currentUser;
        const myProjects = await getProjectsByOwner(user.uid);
        setProjects(myProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchMyProjects();
  }, [refreshTrigger]);

  const refreshProjects = () => setRefreshTrigger((prev) => prev + 1);

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
      />
      <HomePage
        onClickNewTask={handleCloseNewFormContainer}
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
