import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js";

const form = document.querySelector("#registerForm");
const name = document.querySelector("#registername");
const password = document.querySelector("#registerPassword");
const email = document.querySelector("#registerEmail");

form.addEventListener("submit", (e) => {
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
});
