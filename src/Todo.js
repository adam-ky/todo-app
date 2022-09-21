import { React, useState } from "react";
import {
  CheckboxField,
  Button,
  Flex,
  Icon,
  Text,
  TextField,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { deleteTodo as _deleteTodo, editTodo as _editTodo } from "./Api";
import { MdDelete, MdMode } from "react-icons/md";

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
    <Flex margin="15px 0" alignItems="center" gap={0}>
      <Flex className="todo-item__task">
        <CheckboxField
          checked={checked}
          onChange={handleComplete} //TODO: handle checked with PUT request
          onFocus="none"
          size="large"
          varaition="quiet"
        />
        {!isEdit && (
          <Text
            className="todo-item__text"
            textDecoration={checked && "line-through"}
          >
            {description}
          </Text>
        )}
        {isEdit && (
          <TextField
            width="100%"
            defaultValue={description}
            onKeyDown={confirmEdit}
          />
        )}
      </Flex>
      <Button
        onFocusCapture="none"
        onClick={editTodo}
        size="large"
        variation="link"
        margin="0 5px"
      >
        <Icon as={MdMode} />
      </Button>

      <Button
        onFocus="none"
        color="red"
        onClick={deleteTodo}
        size="large"
        variation="link"
      >
        <Icon as={MdDelete} />
      </Button>
    </Flex>
  );
}

export default Todo;
