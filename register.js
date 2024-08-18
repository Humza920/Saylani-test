import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { auth , db } from "./config.js";

const form = document.querySelector("#registerForm");
const name = document.querySelector("#registername");
const password = document.querySelector("#registerPassword");
const email = document.querySelector("#registerEmail");

form.addEventListener("submit", async(e) => {
  e.preventDefault();

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;

      name.value = "";
      email.value = "";
      password.value = "";

      console.log(user);
      alert("REGISTERATION SUCCESSFULL")
      window.location = "index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });


    try {
      const docRef = await addDoc(collection(db, "users"), {
          username: name.value,
          email: email.value,
          createdAt : new Date()
      });
      console.log("Document written with ID: ", docRef.id);

  } catch (e) {
      console.error("Error adding document: ", e);

  }
});
