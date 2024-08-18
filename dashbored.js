import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import { auth, db } from "./config.js";

const title = document.querySelector("#post-title");
const content = document.querySelector("#post-content");
const form = document.querySelector("#post-form");
const posts = document.querySelector("#posts-list");
const logout = document.querySelector(".logout-btn");
const userName = document.querySelector("#userName");
const edit = document.querySelector("edit-btn");
const dele = document.querySelector("#delete-btn");

let postArr = [];
let fullName ;


async function geTData() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const querySnapshot1 = await getDocs(collection(db, "users"));

  querySnapshot1.forEach((doc) => {
    fullName = doc.data().username
    userName.innerHTML = fullName
  });
  querySnapshot.forEach((doc) => {
    postArr.push(doc.data())
  });
  renderScreen()
}

geTData()


async function renderScreen() {
  posts.innerHTML = ''
  postArr.map((item, index) => {
    // console.log(item);
    posts.innerHTML += `<div class="card">
  <div class="card-header">
    <div class="d-flex justify-content-between align-items-center">
    <h6>${item.createdAt}</h6>
    </div>
  </div>
  <div class="card-body">
    <h2 class="card-title text-center">${item.title}</h2>
    <p class="card-text mt-3 text-center">${item.content}</p>
    <div id="buttons" class="d-flex gap-3 justify-content-centre ">
    <button class="btn btn-primary btn-small" id="edit-btn" data-id="${item.id}
    ">Edit</button>
    <button class="btn btn-danger btn-small" id="delete-btn" data-id="${item.id}
    ">Delete</button>
    </div>
  </div>
</div>`})
}
renderScreen()





onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
  } else {
    window.location = "index.html";
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (title.value === "" || content.value === "") {
    alert("please fill input");
  } else {

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title: title.value,
        content: content.value,
        createdAt: new Date().toISOString(),
      });
      postArr.push({
        title: title.value,
        content: content.value,
        createdAt: new Date().toISOString(),
      });
      console.log(postArr);
      console.log("Document written with ID: ", docRef.id);
      title.value = "";
      content.value = "";
      geTData()
      renderScreen()
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
});

logout.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      alert("Logout successfull");
      window.location = "index.html";
    })
    .catch((error) => {
      console.error(error);
    });
});
