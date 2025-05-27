// firestoreService.js

import { db, storage } from "./firebase";
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

export async function uploadAndGetImageUrl(file) {
  let imageUrl = null;
  if (file) {
    const storageRef = ref(storage, `tasks/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    imageUrl = await getDownloadURL(storageRef);
  } else {
    console.warn("No file provided for upload.");
  }
  return imageUrl;
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
