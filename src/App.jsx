import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { SideBar } from './components/SideBar.jsx'
import { HomePage } from './components/Pages/HomePage/HomePage.jsx'
import { NewTaskForm } from './components/NewTaskForm.jsx';

function App() {
  
  return (
    <main>
      <SideBar />
      <HomePage />
      <NewTaskForm />
    </main>  
  )
}

export default App
