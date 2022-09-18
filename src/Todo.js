import { React, useState } from "react";
import {
  CheckboxField,
  Menu,
  MenuButton,
  Flex,
  Text,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { deleteTodo as _deleteTodo } from "./Api";

function Todo(props) {
  const { id, description, isComplete } = props;
  const [checked, setChecked] = useState(isComplete);

  const deleteTodo = async () => {
    await _deleteTodo(id);
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
        <Text maxWidth="120px" textDecoration={checked && "line-through"}>
          {description}
        </Text>
      </Flex>
      <Menu className="todo-item__settings" size="small">
        <MenuButton>Edit</MenuButton>
        <MenuButton onClick={deleteTodo}>Delete</MenuButton>
      </Menu>
    </Flex>
  );
}

export default Todo;
