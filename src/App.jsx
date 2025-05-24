import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { SideBar } from './components/SideBar.jsx'
import { HomePage } from './components/Pages/HomePage/HomePage.jsx'
import { NewTaskForm } from './components/NewTaskForm.jsx';

function App() {
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  let handleCloseNewTaskForm = () => {
        setShowNewTaskForm(prev => !prev);
  }
  return (
    <main>
      <SideBar />
      <HomePage onClickNewTask={handleCloseNewTaskForm}/>
      <NewTaskForm isShowNewTaskForm={showNewTaskForm} onClickClose={handleCloseNewTaskForm}/>
    </main>  
  )
}

export default App
