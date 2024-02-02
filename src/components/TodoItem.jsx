import { Button, Checkbox, Chip, Stack, Typography } from "@mui/material";
import { Pencil, Trash } from "phosphor-react";
import React, { useState } from "react";
import { useTodo } from "../Context/TodoContext";

const color = {
  low: "success",
  medium: "warning",
  high: "error",
};

const TodoItem = ({ todo }) => {
  const { handleOpen, deleteTodo, updateTodo } = useTodo();
  const [checked, setChecked] = useState(todo?.status === "completed");

  const handleChange = (e) => {
    setChecked(e.target.checked);
    const updatedTodo = {
      ...todo,
      status: checked ? "incompleted" : "completed",
    };
    updateTodo(updatedTodo);
  };
  return (
    <Stack
      gap={1}
      sx={{
        borderRadius: "10px",
        backgroundColor: checked ? "#30c48d" : "white",
      }}
      p={1}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          sx={{
            color: "black",
            "&.Mui-checked": {
              color: "grey",
            },
          }}
        />
        <Stack spacing={0.5}>
          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography variant="subtitle1">{todo?.title}</Typography>
            <Chip
              size="small"
              label={todo?.priority}
              color={color[todo?.priority]}
              sx={{ paddingX: "10px" }}
            />
          </Stack>
          <Typography variant="caption">{todo?.description}</Typography>
          <Typography variant="caption" color={"grey"}>
            {todo?.dueDate}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction={"row"} spacing={2} justifyContent={"space-around"}>
        <Button
          variant="text"
          color="warning"
          startIcon={<Pencil />}
          fullWidth
          onClick={() => handleOpen(todo)}
        >
          Edit
        </Button>
        <Button
          variant="text"
          color="error"
          startIcon={<Trash />}
          fullWidth
          onClick={() => deleteTodo(todo)}
        >
          Delete
        </Button>
      </Stack>
    </Stack>
  );
};

export default TodoItem;
