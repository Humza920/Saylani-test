import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import { auth } from "./config.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } else {
    window.location = "index.html";
  }
});

const logout = document.querySelector(".logout-btn");

logout.addEventListener("click", (e)=> {
    e.preventDefault();
  signOut(auth)
    .then(() => {
        alert("Logout successfull")
        window.location ="index.html"
    })
    .catch((error) => {
        console.error(error);
    });
});
