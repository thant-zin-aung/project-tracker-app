// firestoreService.js

import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

// 1. Create a project
export async function createProject(
  name,
  description,
  ownerId,
  contributors = []
) {
  const docRef = await addDoc(collection(db, "projects"), {
    name,
    description,
    ownerId,
    contributors,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// 2. Get all projects
export async function getAllProjects() {
  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const projects = [];
  querySnapshot.forEach((doc) => {
    projects.push({ id: doc.id, ...doc.data() });
  });
  return projects;
}

export async function getProjectsByOwner(userId) {
  const projectsRef = collection(db, "projects");
  const q = query(
    projectsRef,
    where("ownerId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  const projects = [];
  querySnapshot.forEach((doc) => {
    projects.push({ id: doc.id, ...doc.data() });
  });
  return projects;
}

// 3. Get projects by user ID (filter where user is contributor)
export async function getProjectsByUser(userId) {
  const projectsRef = collection(db, "projects");
  const q = query(projectsRef, where("contributors", "array-contains", userId));
  const querySnapshot = await getDocs(q);
  const projects = [];
  querySnapshot.forEach((doc) => {
    projects.push({ id: doc.id, ...doc.data() });
  });
  return projects;
}

// 4. Update a project
export async function updateProject(projectId, updates) {
  const projectDoc = doc(db, "projects", projectId);
  await updateDoc(projectDoc, updates);
}

// 5. Delete a project
export async function deleteProject(projectId) {
  const projectDoc = doc(db, "projects", projectId);
  await deleteDoc(projectDoc);
}

export async function createTask(
  projectId,
  name,
  description,
  status = "default",
  dueDate = null,
  imageUrl = null
) {
  try {
    const taskData = {
      projectId,
      name,
      description,
      status,
      dueDate: dueDate ? dueDate : null,
      imageUrl: imageUrl || null,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "tasks"), taskData);
    alert("New task added successfully!");
    return docRef.id;
  } catch (e) {
    alert("Error adding task:", e);
    throw e;
  }
}

export async function getAllTasksByProjectId(projectId) {
  try {
    const tasksRef = collection(db, "tasks");
    const q = query(
      tasksRef,
      where("projectId", "==", projectId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });

    return tasks;
  } catch (error) {
    console.error("Error fetching tasks by projectId:", error);
    throw error;
  }
}

// Create a To-Do Task linked to a Task ID
export async function createToDoTask(
  taskId,
  priority,
  genre,
  name,
  isFinish = false
) {
  try {
    const docRef = await addDoc(collection(db, "todoTasks"), {
      taskId,
      priority,
      genre,
      name,
      isFinish,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating To-Do Task:", error);
    throw error;
  }
}

// Update isFinish field of a To-Do Task by its todoTaskId
export async function updateToDoTaskIsFinish(todoTaskId, isFinish) {
  try {
    const todoTaskRef = doc(db, "todoTasks", todoTaskId);
    await updateDoc(todoTaskRef, {
      isFinish: isFinish,
    });
  } catch (error) {
    console.error("Error updating To-Do Task isFinish:", error);
    throw error;
  }
}

export async function getToDoTasksByTaskId(taskId) {
  try {
    const todoTasksRef = collection(db, "todoTasks");
    const q = query(todoTasksRef, where("taskId", "==", taskId));
    const querySnapshot = await getDocs(q);
    const todoTasks = [];
    querySnapshot.forEach((doc) => {
      todoTasks.push({ id: doc.id, ...doc.data() });
    });
    return todoTasks;
  } catch (error) {
    console.error("Error fetching To-Do Tasks:", error);
    throw error;
  }
}
