import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBfjH4JsT57MJT46lpB9XOHXM5dmqSGyCE",
  authDomain: "fir-project-a83ec.firebaseapp.com",
  projectId: "fir-project-a83ec",
  storageBucket: "fir-project-a83ec.appspot.com",
  messagingSenderId: "39635429426",
  appId: "1:39635429426:web:4fcfb368496ee6d3a1b42b",
  measurementId: "G-XSG5PSCEBL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);