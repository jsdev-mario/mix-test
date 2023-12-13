import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
} from "firebase/firestore";
import { FBCollections } from "../FirebaseService";
import { ref, set } from "firebase/database";

export default class ProjectService {
  constructor(firestore) {
    this.firestore = firestore;
  }

  getProject = (projectId) => {
    return getDoc(doc(this.firestore, FBCollections.PROJECTS, projectId));
  };

  getProjects = async () => {
    let projects = [];
    const querySnapshot = await getDocs(
      collection(this.firestore, FBCollections.PROJECTS)
    );
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data["id"] = doc.id;
      projects.push(data);
    });

    return projects;
  };

  addProject = (params) => {
    return addDoc(collection(this.firestore, FBCollections.PROJECTS), params);
  };

  saveProject = (projectId, params) => {
    return setDoc(
      doc(this.firestore, FBCollections.PROJECTS, projectId),
      params
    );
  };

  updateProject = (projectId, params) => {
    return updateDoc(
      doc(this.firestore, FBCollections.PROJECTS, projectId),
      params
    );
  };
}
