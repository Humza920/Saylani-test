import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { auth, db } from "./config.js"; // Import auth and db from config

const form = document.querySelector("#registerForm"); // Select form element
const name = document.querySelector("#registername"); // Select name input
const password = document.querySelector("#registerPassword"); // Select password input
const email = document.querySelector("#registerEmail"); // Select email input

form.addEventListener("submit", async (e) => {
  // Handle form submission
  e.preventDefault(); // Prevent default form action

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Handle successful registration
      const user = userCredential.user;

      name.value = ""; // Clear input fields
      email.value = "";
      password.value = "";

      console.log(user); // Log registered user
      alert("REGISTERATION SUCCESSFULL");
      window.location = "index.html"; // Redirect to index.html
    })
    .catch((error) => {
      // Handle registration errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage); // Log error message
    });

  try {
    const docRef = await addDoc(collection(db, "users"), {
      // Add user to Firestore
      username: name.value,
      email: email.value,
      createdAt: new Date(), // Timestamp document creation
    });
    console.log("Document written with ID: ", docRef.id); // Log document ID
  } catch (e) {
    console.error("Error adding document: ", e); // Log Firestore errors
  }
});
