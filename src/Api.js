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

export async function deleteTodo(id) {
  return API.del("todosApi", `/todos/${id}`, {})
    .then(res => {
      console.log(res.body);
    })
    .catch(err => {
      console.log(err.body);
    });
}
