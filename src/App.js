import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import "./App.css";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { createTodo as _createTodo, fetchTodos as _fetchTodos } from "./Api";
import { Button, Card, Heading, TextField } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App() {
  const [todoList, setTodoList] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    // console.log("fetching todos...");
    const newTodoList = await _fetchTodos();
    // console.log(`Previous todo list: ${todoList}`);
    // console.log(`New todo list: ${todos}`);
    // console.log(
    //   `Are previous and new todo lists equal?: ${todos === todoList}`
    // );
    setTodoList(newTodoList);
  };

  const getTodoList = () => {
    return (
      <div>
        {todoList.map(todo => (
          <Todo {...todo} />
        ))}
      </div>
    );
  };

  const createTodo = async () => {
    const newTodo = await _createTodo(description);
    setTodoList([...todoList, newTodo]);
  };

  return (
    <div className="wrapper">
      <Card>
        <Heading className="header" level={1}>
          TODO APP
        </Heading>
        <div className="body">
          <TextField
            className="input"
            label="Create new task"
            onChange={e => setDescription(e.currentTarget.value)}
            outerEndComponent={<Button onClick={createTodo}>Create</Button>}
            placeholder="CS3219 post-lecture quiz"
          />
          {getTodoList()}
        </div>
      </Card>
    </div>
  );
}

export default App;
