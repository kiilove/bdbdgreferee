import { useState, useEffect } from "react";

const useCheckReferee = (collectionName, refCupId, refGameId, refereeId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = firestore();
    const unsubscribe = db
      .collection(collectionName)
      .where("refCupId", "==", refCupId)
      .where("refGameId", "==", refGameId)
      .where("refRefereeUid", "==", refereeId)
      .onSnapshot(
        (querySnapshot) => {
          if (querySnapshot.empty) {
            setData(null);
            setLoading(false);
          } else {
            setData(querySnapshot.docs[0].data());
            setLoading(false);
          }
        },
        (error) => {
          setError(error);
          setLoading(false);
        }
      );
    return () => {
      unsubscribe();
    };
  }, [collectionName, refCupId, refGameId, refereeId]);

  return { data, loading, error };
};

export default useCheckReferee;
