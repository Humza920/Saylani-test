// Importing Firebase modules
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

// Importing auth and db instances
import { auth, db } from "./config.js";

// Selecting HTML elements
const title = document.querySelector("#post-title"); // Title input
const content = document.querySelector("#post-content"); // Content input
const form = document.querySelector("#post-form"); // Post form
const posts = document.querySelector("#posts-list"); // Posts list
const logout = document.querySelector(".logout-btn"); // Logout button
const userName = document.querySelector("#userName"); // User name
const edit = document.querySelector("edit-btn"); // Edit button
const dele = document.querySelector("#delete-btn"); // Delete button

// Initialize post array
let postArr = [];
let fullName;

// Get data from Firestore
async function geTData() {
  // Get posts collection
  const querySnapshot = await getDocs(collection(db, "posts"));

  // Get users collection
  const querySnapshot1 = await getDocs(collection(db, "users"));

  // Loop through users collection
  querySnapshot1.forEach((doc) => {
    fullName = doc.data().username;
    userName.innerHTML = fullName;
  });

  // Loop through posts collection
  querySnapshot.forEach((doc) => {
    postArr.push(doc.data());
  });

  // Render posts
  renderScreen();
}

// Call geTData function
geTData();

// Render posts on screen
async function renderScreen() {
  // Clear posts list
  posts.innerHTML = "";

  // Loop through post array
  postArr.map((item, index) => {
    posts.innerHTML += `
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">
            <h6>${item.createdAt}</h6>
          </div>
        </div>
        <div class="card-body">
          <h2 class="card-title text-center">${item.title}</h2>
          <p class="card-text mt-3 text-center">${item.content}</p>
          <div id="buttons" class="d-flex gap-3 justify-content-centre ">
            <button class="btn btn-primary btn-sm" id="edit-btn" data-id="${item.id}">Edit</button>
            <button class="btn btn-danger btn-sm" id="delete-btn" data-id="${item.id}">Delete</button>
          </div>
        </div>
      </div>
    `;
  });
}

// Call renderScreen function
renderScreen();

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Get user UID
    const uid = user.uid;
    console.log(uid);
  } else {
    // Redirect to index.html
    window.location = "index.html";
  }
});

// Add event listener to form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Check input fields
  if (title.value === "" || content.value === "") {
    alert("Fill inputs");
  } else {
    try {
      // Add new post to Firestore
      const docRef = await addDoc(collection(db, "posts"), {
        title: title.value,
        content: content.value,
        createdAt: new Date().toISOString(),
      });

      // Add new post to post array
      postArr.push({
        title: title.value,
        content: content.value,
        createdAt: new Date().toISOString(),
      });

      console.log(postArr);
      console.log("Document written with ID: ", docRef.id);

      // Clear input fields
      title.value = "";
      content.value = "";

      // Get updated data
      geTData();

      // Render updated posts
      renderScreen();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
});

// Add event listener to logout button
logout.addEventListener("click", (e) => {
  e.preventDefault();

  // Sign out user
  signOut(auth)
    .then(() => {
      alert("Logout successful");
      window.location = "index.html";
    })
    .catch((error) => {
      console.error(error);
    });
});
