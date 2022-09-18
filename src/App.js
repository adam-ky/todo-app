import React, { useEffect, useState } from "react";
import "./App.css";
import { Amplify, API } from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    API.get("todosApi", "/todos", {})
      .then(res => {
        console.log(res.body);
        setTodoList(JSON.parse(res.body));
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  const test = () => {
    console.log(todoList);
    console.log("todo list has type of:", typeof todoList);
    return todoList.map(todo => <p>{todo.description}</p>);
  };

  return <div>{test()}</div>;
}

export default App;
