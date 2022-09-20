import { React, useState } from "react";
import {
  CheckboxField,
  Menu,
  MenuButton,
  Flex,
  Text,
  TextField,
  TextAreaField,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { deleteTodo as _deleteTodo, editTodo as _editTodo } from "./Api";

function Todo(props) {
  const { id, description, isComplete, fetchTodos } = props;
  const [checked, setChecked] = useState(isComplete);
  const [isEdit, setIsEdit] = useState(false);

  const deleteTodo = async () => {
    await _deleteTodo(id);
    fetchTodos();
  };

  const editTodo = async () => {
    setIsEdit(true);
  };

  const confirmEdit = async e => {
    if (e.key === "Enter") {
      await _editTodo(id, e.target.value);
      await fetchTodos();
      setIsEdit(false);
    }
  };

  const handleComplete = async e => {
    setChecked(e.target.checked);
  };

  return (
    <Flex margin="10px 0" alignItems="center" gap={0}>
      <Flex className="todo-item__task">
        <CheckboxField
          checked={checked}
          onChange={handleComplete} //TODO: handle PUT request
        />
        {!isEdit && (
          <Text maxWidth="120px" textDecoration={checked && "line-through"}>
            {description}
          </Text>
        )}
        {isEdit && (
          <TextAreaField defaultValue={description} onKeyDown={confirmEdit} />
        )}
      </Flex>
      <Menu className="todo-item__settings" size="small">
        <MenuButton onClick={editTodo}>Edit</MenuButton>
        <MenuButton onClick={deleteTodo}>Delete</MenuButton>
      </Menu>
    </Flex>
  );
}

export default Todo;
