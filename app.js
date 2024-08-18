import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js";  // Import auth from config

const form = document.querySelector("#loginForm");  // Select form element
const password = document.querySelector("#loginPassword");  // Select password input
const email = document.querySelector("#loginEmail");  // Select email input

form.addEventListener("submit", (e) => {  // Handle form submission
  e.preventDefault();  // Prevent default form action

  signInWithEmailAndPassword(auth, email.value, password.value)  // Sign in with Firebase Auth
    .then((userCredential) => {  // Handle successful login
        
        email.value= "";  // Clear email input
        password.value= "";  // Clear password input

      const user = userCredential.user;

      console.log(user);  // Log logged-in user
      alert("LOGIN SUCCESSFUL");

      window.location = "dashbored.html";  // Redirect to dashboard
    })
    .catch((error) => {  // Handle login errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);  // Log error message
    });
});