import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Amplify, API } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  const [myMessage, setMyMessage] = useState("");

  // useEffect(() => {
  //   exampleFectch();
  // }, []);

  // async function exampleFectch() {
  //   API.get("TaskTodo", "/tasks", {})
  //     .then(res => {
  //       setMyMessage(res.success);
  //       console.log(`Response: ${res}`);
  //     })
  //     .catch(err => {
  //       console.log(err.response);
  //     });
  // }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>{myMessage}</p>
    </div>
  );
}

export default App;
