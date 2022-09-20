import { API } from "aws-amplify";

export async function fetchTodos() {
  return API.get("todosApi", "/todos", {})
    .then(res => {
      return JSON.parse(res.body);
    })
    .catch(err => {
      console.log(err.response);
    });
}

export async function createTodo(description) {
  return API.post("todosApi", "/todos", { body: { description } })
    .then(res => {
      return JSON.parse(res.body);
    })
    .catch(err => {
      console.log(err.response);
    });
}

export async function editTodo(id, description) {
  const req = {
    id,
    description,
  };
  return API.post("todosApi", "/todos", { body: req })
    .then(res => {
      console.log(res.body);
      return res.body;
    })
    .catch(err => {
      console.log(err.body);
    });
}

export async function deleteTodo(id) {
  return API.del("todosApi", `/todos/${id}`, {})
    .then(res => {
      console.log(res.body); //TODO: modify to return deleted item
    })
    .catch(err => {
      console.log(err.body);
    });
}
