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
    console.log("doc data: " + projects[0].id);
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
