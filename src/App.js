import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { CSVLink, CSVDownload } from "react-csv";


// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2yHNFMz5YvI13E2-8sic4urS-TtqEFbo",
  authDomain: "kubadili-3c51a.firebaseapp.com",
  databaseURL: "https://kubadili-3c51a.firebaseio.com",
  projectId: "kubadili-3c51a",
  storageBucket: "kubadili-3c51a.appspot.com",
  messagingSenderId: "722390114947",
  appId: "1:722390114947:web:4a64c6dc47090a693f31b6"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Get a reference to the database service

var db = firebase.firestore();

let dataArrayDef = [];

function App() {

  const [stateData, setState] = useState([]);
  const [lengthData, setLength] = useState(0);

  const inputEl = useRef(null);

  useEffect(() => {

    let citiesRef = db.collection('documents');



    let query = citiesRef.get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }

        setLength(snapshot.size)

        snapshot.forEach(doc => {
          let dataToArray = doc.data();
          console.log(doc.id, '=>', JSON.stringify(dataToArray));
          // console.log(doc.id, '=>', doc.data());

          // let __data = Object.keys(dataToArray).reduce((a, b) => a.concat(dataToArray[b]), [])
          // dataArrayDef.push(__data)

          dataArrayDef.push(dataToArray)
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }, [])


  const csvData = ["name","lastName", "company", "email", "country","document"];
  

  const check = () => {
    let __data = dataArrayDef.filter(item => item.document).map(item =>
      csvData.reduce((a, b) => a.concat(item[b]), [])
    );

    setState([ csvData, ...__data ])

    setTimeout(() => inputEl.current.link.click(), 3000);
  }

  return (<div className="content">
    <span className="bnt-download" onClick={check}>Descargar</span>
    <CSVLink filename="Kubadili" separator=";" style={{ display: "none" }} ref={inputEl} data={stateData}>Download me</CSVLink>

  </div>
  );
}

export default App;
