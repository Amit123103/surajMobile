import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEDh28jNITSNzDTzwxWHlbbgVtNVvcdRM",
  authDomain: "company-22a56.firebaseapp.com",
  projectId: "company-22a56",
  storageBucket: "company-22a56.firebasestorage.app",
  messagingSenderId: "747119827148",
  appId: "1:747119827148:web:2a0900ce7ee8538dcc4a69",
  measurementId: "G-42YZGPTNG9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = "amitsingh6394366374@gmail.com";
const password = "AdminPassword123!";

async function createAdmin() {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Successfully created test user!");
    console.log("Email:", email);
    console.log("Password:", password);
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log("Test user already exists!");
      console.log("Email:", email);
      console.log("Password:", password);
    } else {
      console.error("Error creating user:", error);
    }
    process.exit(1);
  }
}

createAdmin();
