import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import "./App.css";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { createTodo as _createTodo, fetchTodos as _fetchTodos } from "./Api";
import { Card, Heading, TextField } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App() {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const newTodoList = await _fetchTodos();
    setTodoList(newTodoList);
  };

  const getTodoList = () => {
    return (
      <div>
        {todoList.map(todo => (
          <Todo {...todo} fetchTodos={fetchTodos} />
        ))}
      </div>
    );
  };

  const createTodo = async e => {
    if (e.key === "Enter") {
      const newTodo = await _createTodo(input);
      setTodoList([...todoList, newTodo]);
      setInput("");
    }
  };

  return (
    <div className="wrapper">
      <Card className="todo-wrapper" variation="elevated">
        <Heading className="header" level={1}>
          TODO LIST
        </Heading>
        <div className="body">
          <TextField
            autoComplete="none"
            className="input"
            label="Add a Todo"
            onChange={e => setInput(e.currentTarget.value)}
            placeholder="e.g. CS3219 quiz"
            value={input}
            onKeyDown={createTodo}
          />
          {getTodoList()}
        </div>
      </Card>
    </div>
  );
}

export default App;
