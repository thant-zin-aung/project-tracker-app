// firestoreService.js

import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

export async function getUserInfo(userId) {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      console.log("User document not found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
}

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

export async function updateProject(projectId, updates) {
  const projectDoc = doc(db, "projects", projectId);
  await updateDoc(projectDoc, updates);
}

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

export async function getTaskById(taskId) {
  try {
    const taskDoc = doc(db, "tasks", taskId);
    const docSnapshot = await getDoc(taskDoc);
    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      console.warn(`No task found with ID: ${taskId}`);
      return null;
    }
  } catch (error) {
    console.error("Error getting task by ID:", error);
    throw error;
  }
}

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
    const docs = (await getDocs(q)).docs;
    const todoTasks = docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return todoTasks;
  } catch (error) {
    console.error("Error fetching To-Do Tasks:", error);
    throw error;
  }
}

export async function deleteToDoTask(todoTaskId) {
  try {
    const todoTaskDoc = doc(db, "todoTasks", todoTaskId);
    await deleteDoc(todoTaskDoc);
    alert(`Successfully deleted todoTask with ID: ${todoTaskId}`);
  } catch (error) {
    console.error("Error deleting todoTask:", error);
    throw error;
  }
}

export async function getTasksByProjectSeparated(projectId) {
  const tasksRef = collection(db, "tasks");
  const q = query(
    tasksRef,
    where("projectId", "==", projectId),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  const tasks = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const taskTodoPromises = tasks.map(async (task) => {
    const todoTasks = await getToDoTasksByTaskId(task.id);
    const totalTodos = todoTasks.length;
    const finishedTodos = todoTasks.filter(
      (todo) => todo.isFinish === true
    ).length;

    const progressPercent =
      totalTodos === 0 ? 0 : Math.round((finishedTodos / totalTodos) * 100);

    task.totalTodos = totalTodos;
    task.finishedTodos = finishedTodos;
    task.progressPercent = progressPercent;

    return { task, todoTasks };
  });

  const taskTodoResults = await Promise.all(taskTodoPromises);

  const toDoTasks = [];
  const inProgressTasks = [];
  const doneTasks = [];

  for (const { task, todoTasks } of taskTodoResults) {
    if (todoTasks.length === 0) {
      toDoTasks.push(task);
    } else {
      const allFinished = todoTasks.every((todo) => todo.isFinish === true);
      const allNotFinished = todoTasks.every((todo) => todo.isFinish === false);
      if (allFinished) {
        doneTasks.push(task);
      } else if (allNotFinished) {
        toDoTasks.push(task);
      } else {
        inProgressTasks.push(task);
      }
    }
  }

  return { toDoTasks, inProgressTasks, doneTasks };
}

export async function getTasksByUserSeparated(userId) {
  try {
    const projectsRef = collection(db, "projects");
    const qProjects = query(projectsRef, where("ownerId", "==", userId));
    const projectsSnapshot = await getDocs(qProjects);
    const projectIds = projectsSnapshot.docs.map((doc) => doc.id);

    if (projectIds.length === 0) {
      return { toDoTasks: [], inProgressTasks: [], doneTasks: [] };
    }

    const tasksRef = collection(db, "tasks");
    const qTasks = query(
      tasksRef,
      where("projectId", "in", projectIds),
      orderBy("createdAt", "desc")
    );
    const tasksSnapshot = await getDocs(qTasks);
    const tasks = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const taskTodoPromises = tasks.map(async (task) => {
      const todoTasks = await getToDoTasksByTaskId(task.id);
      const totalTodos = todoTasks.length;
      const finishedTodos = todoTasks.filter(
        (todo) => todo.isFinish === true
      ).length;

      const progressPercent =
        totalTodos === 0 ? 0 : Math.round((finishedTodos / totalTodos) * 100);

      task.totalTodos = totalTodos;
      task.finishedTodos = finishedTodos;
      task.progressPercent = progressPercent;

      return { task, todoTasks };
    });

    const taskTodoResults = await Promise.all(taskTodoPromises);

    const toDoTasks = [];
    const inProgressTasks = [];
    const doneTasks = [];

    for (const { task, todoTasks } of taskTodoResults) {
      if (todoTasks.length === 0) {
        toDoTasks.push(task);
      } else {
        const allFinished = todoTasks.every((todo) => todo.isFinish === true);
        const allNotFinished = todoTasks.every(
          (todo) => todo.isFinish === false
        );
        if (allFinished) {
          doneTasks.push(task);
        } else if (allNotFinished) {
          toDoTasks.push(task);
        } else {
          inProgressTasks.push(task);
        }
      }
    }

    return { toDoTasks, inProgressTasks, doneTasks };
  } catch (error) {
    console.error("Error fetching tasks by user:", error);
    throw error;
  }
}
