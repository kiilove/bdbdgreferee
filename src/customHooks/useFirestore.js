import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const useFirestore = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getDocument = async (collectionName, collectionId) => {
    console.log(collectionId);
    try {
      const docSnapshot = await getDoc(doc(db, collectionName, collectionId));
      if (docSnapshot.exists()) {
        setData({ id: docSnapshot.id, ...docSnapshot.data() });
      } else {
        setError({ message: "Document does not exist" });
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const readData = async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(documents);
      setData(documents);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const addData = async (collectionName, newData, callback) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), newData);
      const addedData = { id: docRef.id, ...newData };
      callback && callback();
    } catch (error) {
      setError(error);
    }
  };

  const deleteData = async (collectionName, id, callback) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      setData((prevState) => prevState.filter((item) => item.id !== id));
      callback && callback();
    } catch (error) {
      setError(error);
    }
  };

  const updateData = async (collectionName, id, updatedData, callback) => {
    try {
      await updateDoc(doc(db, collectionName, id), updatedData);
      setData((prevState) =>
        prevState.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        )
      );
      callback && callback();
    } catch (error) {
      setError(error);
    }
  };

  return {
    data,
    loading,
    error,
    getDocument,
    readData,
    addData,
    deleteData,
    updateData,
  };
};

export default useFirestore;
