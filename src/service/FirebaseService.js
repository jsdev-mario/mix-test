// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../constants/config";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ProjectService from "./firebase/ProjectService";
import FileService from "./firebase/FileService";

export const FBCollections = {
  PROJECTS: "projects",
};

export const FBStorage = {
  FILES: "files",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const projectService = new ProjectService(firestore);
const fileService = new FileService(storage);

export { firestore, projectService, fileService };
