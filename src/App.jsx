import { useState } from 'react'
import { db, auth } from './firebase';
import viteLogo from '/vite.svg'
import './App.css'
import { SideBar } from './components/SideBar.jsx'
import { HomePage } from './components/Pages/HomePage/HomePage.jsx'
import { NewTaskForm } from './components/NewTaskForm.jsx';
import { NewFormContainer } from './components/NewFormContainer.jsx';

function App() {
  const [showNewFormContainer, setShowNewFormContainer] = useState(false);
  let handleCloseNewFormContainer = () => {
        setShowNewFormContainer(prev => !prev);
  }
  return (
    <main>
      <SideBar />
      <HomePage onClickNewTask={handleCloseNewFormContainer}/>
      <NewFormContainer isShowNewFormContainer={showNewFormContainer} onClickClose={handleCloseNewFormContainer}>
        <NewTaskForm />
      </NewFormContainer>
    </main>  
  )
}

export default App
