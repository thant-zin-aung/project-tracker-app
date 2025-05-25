import { useState } from 'react'
import { db, auth } from './firebase';
import viteLogo from '/vite.svg'
import './App.css'
import { SideBar } from './components/SideBar.jsx'
import { HomePage } from './components/Pages/HomePage/HomePage.jsx'
import { NewTaskForm } from './components/Forms/NewTaskForm.jsx';
import { NewFormContainer } from './components/Forms/NewFormContainer.jsx';
import { NewProjectForm } from './components/Forms/NewProjectForm.jsx';

const buttonName = {
  NEW_PROJECT: 'new-project',
  NEW_TASK: 'new-task',
};

let childForm;
function handleClickedButton(name) {
  switch (name) {
    case buttonName.NEW_PROJECT:
      return <NewProjectForm />;
      break;
    case buttonName.NEW_TASK:
      return <NewTaskForm />
      break;
    default:
      console.log('Unknown button clicked');
      return null;
  }
}

function App() {
  const [showNewFormContainer, setShowNewFormContainer] = useState(false);
  let handleCloseNewFormContainer = (clickedButton) => {
      childForm = handleClickedButton(clickedButton);
      setShowNewFormContainer(prev => !prev);
  }
  return (
    <main>
      <SideBar onClickNewTask={handleCloseNewFormContainer} clickableButtons={buttonName}/>
      <HomePage onClickNewTask={handleCloseNewFormContainer} clickableButtons={buttonName}/>
      <NewFormContainer isShowNewFormContainer={showNewFormContainer} onClickClose={handleCloseNewFormContainer}>
        {childForm}
      </NewFormContainer>
    </main>  
  )
}

export default App
