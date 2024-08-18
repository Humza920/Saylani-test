import {
  collection,
  addDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

import { signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

import { db, auth } from "./config.js";

let dataArr = [];

let title = document.querySelector("#post-title");
let content = document.querySelector("#post-content");
let form = document.querySelector("#post-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  async function setData() {
    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        title: title.value,
        content: content.value,
      });

      title.value = "";
      content.value = "";

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  setData();

  const cardRender = document.querySelector("#card-publish");

  async function getData() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      dataArr.push(doc.data());

      function render() {
        cardRender.innerHTML = "";
        dataArr.map((item) => {
          cardRender.innerHTML += `<div class="card bg-[#eef0eb]  w-[100%] shadow-2xl mx-[10px] border border-[2px] mt-4" >
         <div class="card-body">
      <h2 class="card-title">Title: ${item.title}</h2>
      <p> Description: ${item.blogDescription}</p>
    </div>
    <div/>`;
        });
      }

      render();
    });
  }

  getData();

  //  async function getData() {
  //    const querySnapshot = await getDocs(collection(db, "users"));
  //    querySnapshot.forEach((doc) => {
  //      dataArr.push(doc.data());

  //      console.log(dataArr);
  //    });

  //    function render() {
  //      cardRender.innerHTML = "";
  //      dataArr.map((item) => {
  //        cardRender.innerHTML += `
  //        <div class="card bg-[#e5d9f2] max-w-[100%] shadow-2xl mx-[20px] border-[gray] mt-4" >
  //        <div class="card-body">
  //        <h2 class="card-title">${item.title}</h2>
  //        <p>${item.blogDescription}</p>
  //        </div>
  //        <div/>`;
  //       });
  //     }

  //     render();

  //     // location.reload()
  //   }

  //   getData();
});

const logouBtn = document.querySelector("#logout-btn");

logouBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      alert("You are sucessfully logged out");
      window.location = "login.html";
    })
    .catch((error) => {
      alert(error);
    });
});
