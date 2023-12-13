import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FBStorage } from "../FirebaseService";

export default class FileService {
  constructor(storage) {
    this.storage = storage;
  }

  uploadFile = (file) => {
    return new Promise(async (resolve, reject) => {
      const storageRef = ref(this.storage, `/${FBStorage.FILES}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log("===== percent: ", percent);
        },
        (err) => {
          console.log(err);
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
            resolve(url);
          });
        }
      );
    });
  };
}
