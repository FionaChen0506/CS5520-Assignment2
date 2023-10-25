import { collection, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
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

export async function updateInDB(entryId, updateEntry) {
  try {
      const entryRef = doc(database, 'Expenses', entryId);
      await setDoc(entryRef, updateEntry,  { merge: true });
      console.log('Updated');
  } catch (err) {
      console.log(err);
  }
}

