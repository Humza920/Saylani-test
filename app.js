import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js";

const form = document.querySelector("#loginForm");
const password = document.querySelector("#loginPassword");
const email = document.querySelector("#loginEmail");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        
        email.value= ""
        password.value= ""

      const user = userCredential.user;

      console.log(user);
      alert("LOGIN SUCCESSFULL")

      window.location = "dashbored.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      
    });
});