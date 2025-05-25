import { useState } from "react";
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
  let handleCloseNewFormContainer = (clickedButton) => {
    //   childForm = handleClickedButton(clickedButton);
    switch (clickedButton) {
      case buttonName.NEW_PROJECT:
        childForm = (
          <NewProjectForm
            onClickClose={() =>
              handleCloseNewFormContainer(buttonName.NEW_PROJECT)
            }
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
      />
      <HomePage
        onClickNewTask={handleCloseNewFormContainer}
        clickableButtons={buttonName}
      />
      <NewFormContainer
        isShowNewFormContainer={showNewFormContainer}
        onClickClose={handleCloseNewFormContainer}
      >
        {console.log("Child Form: ", childForm)}
        {childForm}
      </NewFormContainer>
    </main>
  );
}
