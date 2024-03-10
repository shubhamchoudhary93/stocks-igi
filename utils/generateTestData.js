import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default generateTestData = async () => {
  try {
    const docRef = collection(db, "stocks");
    await addDoc(docRef, {
      name: "F class 1mm",
      category: "F class",
      opening: 0,
      current: 0,
      dateUpdated: Timestamp.fromDate(new Date()),
    });

    await addDoc(docRef, {
      name: "F class 2mm",
      category: "F class",
      opening: 0,
      current: 0,
      dateUpdated: Timestamp.fromDate(new Date()),
    });

    await addDoc(docRef, {
      name: "F class 3mm",
      category: "F class",
      opening: 0,
      current: 0,
      dateUpdated: Timestamp.fromDate(new Date()),
    });

    await addDoc(docRef, {
      name: "B class 1mm",
      category: "B class",
      opening: 0,
      current: 0,
      dateUpdated: Timestamp.fromDate(new Date()),
    });

    await addDoc(docRef, {
      name: "B class 2mm",
      category: "B class",
      opening: 0,
      current: 0,
      dateUpdated: Timestamp.fromDate(new Date()),
    });

    await addDoc(docRef, {
      name: "Pioneer 1ltr",
      category: "Varnish",
      opening: 0,
      current: 0,
      dateUpdated: Timestamp.fromDate(new Date()),
    });
  } catch (e) {
    Alert.alert(e.message);
  }
};
