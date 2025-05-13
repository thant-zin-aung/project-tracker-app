import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import { SideBar } from './components/SideBar.jsx'
import { Page } from './components/Pages/Page.jsx'

function App() {
  
  return (
    <main>
      <SideBar />
      <Page />
    </main>  
  )
}

export default App
