import './App.css';
import firebase from "firebase/app"
import firebaseConfig from './firebase.config';
import "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
// firebase.initializeApp(firebaseConfig);
function App() {
  const [mainUser, setMainUser] = useState({})
  console.log(mainUser);
  //provider
  const provider = new firebase.auth.GoogleAuthProvider();
  const githubProvider = new firebase.auth.GithubAuthProvider();
  const FcebookProvider = new firebase.auth.FacebookAuthProvider();

  //handler 1
  const handlerForGoogle = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setMainUser(user)
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        // console.log(errorMessage);
      });
  }
  //handler 2
  const handlerForFacebook = () => {
    firebase
      .auth()
      .signInWithPopup(FcebookProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        console.log(user, credential);
      })
      .catch((error) => {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  //handler 3
  const githubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage);
      });
  }
  return (
    <div className="App mt-5">
      <button onClick={handlerForGoogle} className="btn btn-primary">Sing With Google</button>
      <br />
      <button onClick={handlerForFacebook} className="btn btn-primary mt-1">Sing With Facebook</button>
      <br />
      <button className="btn btn-primary mt-1" onClick={githubSignIn}> Sign in with github</button>
      <h4>Hi, {mainUser.displayName}, Happy to see you</h4>
      <img src={mainUser.photoURL} alt="" />
    </div>
  );
}

export default App;
