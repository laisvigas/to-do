import { addDoc, collection, deleteDoc, getDocs, getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import app from "./firebase.config";

const db = getFirestore(app);

import { getAuth } from "firebase/auth";

async function saveTask(data) {
    const auth = getAuth(); 
    const user = auth.currentUser; 
    if (!user) {
        throw new Error("No user is logged in.");
    }

    const tasks = collection(db, "to-do");
    const taskWithUser = {
        ...data,
        uid: user.uid, 
    };
    const docRef = await addDoc(tasks, taskWithUser);
    return { id: docRef.id, ...taskWithUser };
}

async function getTasks() {
    const auth = getAuth(); 
    const user = auth.currentUser; 
    if (!user) {
        throw new Error("No user is logged in.");
    }

    const tasks = collection(db, "to-do");
    const querySnapshot = await getDocs(tasks);
    return querySnapshot.docs
        .map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }))
        .filter((task) => task.uid === user.uid);
}


async function deleteTask(id) {
    const tasks = collection(db, "to-do");
    const document = doc(tasks, id);
    await deleteDoc(document);
}

async function updateTask(id, updateData) {
    const tasks = collection(db, "to-do");
    const document = doc(tasks, id);
    await updateDoc(document, updateData);
}

async function getTaskById(id) {
    try {
        const docRef = doc(db, "to-do", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            throw new Error("Task not found");
        }
    } catch (error) {
        console.error("Error fetching the task:", error);
        throw error;
    }
}

export { saveTask, getTasks, deleteTask, updateTask, getTaskById };
