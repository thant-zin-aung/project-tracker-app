// import { useState } from 'react'
// import { db, auth } from './firebase';
// import viteLogo from '/vite.svg'
// import './App.css'
// import { SideBar } from './components/SideBar.jsx'
// import { HomePage } from './components/Pages/HomePage/HomePage.jsx'
// import { NewTaskForm } from './components/Forms/NewTaskForm.jsx';
// import { NewFormContainer } from './components/Forms/NewFormContainer.jsx';
// import { NewProjectForm } from './components/Forms/NewProjectForm.jsx';

// const buttonName = {
//   NEW_PROJECT: 'new-project',
//   NEW_TASK: 'new-task',
// };

// let childForm;
// function handleClickedButton(name) {
//   switch (name) {
//     case buttonName.NEW_PROJECT:
//       return <NewProjectForm />;
//       break;
//     case buttonName.NEW_TASK:
//       return <NewTaskForm />
//       break;
//     default:
//       console.log('Unknown button clicked');
//       return null;
//   }
// }

// function App() {
//   const [showNewFormContainer, setShowNewFormContainer] = useState(false);
//   let handleCloseNewFormContainer = (clickedButton) => {
//       childForm = handleClickedButton(clickedButton);
//       setShowNewFormContainer(prev => !prev);
//   }
//   return (
//     <main>
//       <SideBar onClickNewTask={handleCloseNewFormContainer} clickableButtons={buttonName}/>
//       <HomePage onClickNewTask={handleCloseNewFormContainer} clickableButtons={buttonName}/>
//       <NewFormContainer isShowNewFormContainer={showNewFormContainer} onClickClose={handleCloseNewFormContainer}>
//         {childForm}
//       </NewFormContainer>
//     </main>  
//   )
// }

// export default App


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;



