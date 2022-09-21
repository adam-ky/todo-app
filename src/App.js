import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import "./App.css";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import {
  createTodo as _createTodo,
  fetchTodos as _fetchTodos,
  fetchQuote as _fetchQuote,
} from "./Api";
import { Card, Heading, Text, TextField } from "@aws-amplify/ui-react";

Amplify.configure(awsconfig);

function App() {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetchTodos();
    fetchQuote();
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

  const fetchQuote = async () => {
    if (!quote) {
      const response = await _fetchQuote();
      const { q, a } = response;
      setQuote(`"${q}"—${a}`);
    }
  };

  const getQuoteElement = () => {
    return (
      <Text color="grey" fontStyle="italic" textAlign="center" margin="0 30px">
        {quote}
      </Text>
    );
  };

  return (
    <div className="wrapper">
      <Card className="todo-wrapper" variation="elevated">
        <Heading className="header" level={1}>
          TODO LIST
        </Heading>
        {getQuoteElement()}
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
