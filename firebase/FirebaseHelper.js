import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { database } from "./FirebaseSetup";

export async function writeToDB(entry) {
  try {
    const docRef = await addDoc(collection(database, "Expenses"), entry);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(id) {
  try {
    await deleteDoc(doc(database, "Expenses", id));
  } catch (err) {
    console.log(err);
  }
}


