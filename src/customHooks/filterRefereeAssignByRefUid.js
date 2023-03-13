import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  onSnapshot,
} from "firebase/firestore";

const db = getFirestore();

export const filterRefereeAssignByRefUid = async (cupId, refUid) => {
  try {
    const docRef = doc(db, "cups", cupId);
    const docSnap = await getDoc(docRef);
    const cupData = docSnap.data();
    const filteredAssigns = cupData.gamesCategory.reduce((acc, category) => {
      const filteredAssignsInCategory = category.refereeAssign.filter(
        (assign) => assign.refUid === refUid
      );
      return acc.concat(filteredAssignsInCategory);
    }, []);
    return filteredAssigns;
  } catch (error) {
    console.error("Error filtering assigns: ", error);
    return [];
  }
};

export const filterCupsByRefUid = (refUid) => {
  return new Promise((resolve, reject) => {
    const q = query(
      collection(db, "cups"),
      where("cupInfo.cupState", "==", "대회중")
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const filteredCups = [];

        querySnapshot.forEach((doc) => {
          const cupData = doc.data();
          const filteredAssigns = cupData.gamesCategory.reduce(
            (acc, category) => {
              const filteredAssignsInCategory = category.refereeAssign?.filter(
                (assign) => assign.refUid === refUid
              );
              return acc.concat(filteredAssignsInCategory);
            },
            []
          );

          if (filteredAssigns?.length > 0) {
            const filteredCategories = cupData.gamesCategory.filter(
              (category) => {
                const filteredAssignsInCategory =
                  category.refereeAssign?.filter(
                    (assign) => assign.refUid === refUid
                  );
                return filteredAssignsInCategory?.length > 0;
              }
            );
            filteredCups.push({
              id: doc.id,
              ...cupData,
              gamesCategory: filteredCategories,
            });
          }
        });

        resolve(filteredCups);
      },
      (error) => {
        console.error("Error filtering cups: ", error);
        reject(error);
      }
    );

    return unsubscribe;
  });
};

export const filterCupsByRefUidOld = async (refUid) => {
  try {
    const q = query(
      collection(db, "cups"),
      where("cupInfo.cupState", "==", "대회중")
    );
    const querySnapshot = await getDocs(q);
    const filteredCups = [];

    querySnapshot.forEach((doc) => {
      const cupData = doc.data();
      const filteredAssigns = cupData.gamesCategory.reduce((acc, category) => {
        const filteredAssignsInCategory = category.refereeAssign?.filter(
          (assign) => assign.refUid === refUid
        );
        return acc.concat(filteredAssignsInCategory);
      }, []);

      if (filteredAssigns?.length > 0) {
        const filteredCategories = cupData.gamesCategory.filter((category) => {
          const filteredAssignsInCategory = category.refereeAssign?.filter(
            (assign) => assign.refUid === refUid
          );
          return filteredAssignsInCategory?.length > 0;
        });
        filteredCups.push({
          id: doc.id,
          ...cupData,
          gamesCategory: filteredCategories,
        });
      }
    });

    return filteredCups;
  } catch (error) {
    console.error("Error filtering cups: ", error);
    return [];
  }
};
