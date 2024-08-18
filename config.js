import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAT-CwA2zvNXmQD_5GNEnCbnnFiQL_otcQ",
  authDomain: "blogging-app-920.firebaseapp.com",
  projectId: "blogging-app-920",
  storageBucket: "blogging-app-920.appspot.com",
  messagingSenderId: "839736832764",
  appId: "1:839736832764:web:4272987796ce53ad481d79",
  measurementId: "G-6492YE5J0M",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore(app);
