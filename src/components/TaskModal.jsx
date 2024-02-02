import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import React, { useEffect, useState } from "react";
import { useTodo } from "../Context/TodoContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 2,
};

const TaskModal = () => {
  const { open, handleClose, todo, setTodo, addTodo, updateTodo } = useTodo();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  };

  const handleSubmit = () => {
    if (todo?.id) {
      const updatedTodo = { ...todo };
      updateTodo(updatedTodo);
    } else {
      const newTodo = {
        ...todo,
        id: uuid(),
      };
      addTodo(newTodo);
    }
    handleClose();
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Stack sx={style} spacing={2}>
        <FormControl fullWidth>
          <FormLabel>Title: </FormLabel>
          <TextField
            id="title"
            name="title"
            value={todo.title}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Description: </FormLabel>
          <TextField
            id="description"
            name="description"
            value={todo.description}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </FormControl>
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Priority:
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="priority"
            value={todo.priority}
            onChange={handleChange}
            row
          >
            <FormControlLabel value="low" control={<Radio />} label="Low" />
            <FormControlLabel
              value="medium"
              control={<Radio />}
              label="Medium"
            />
            <FormControlLabel value="high" control={<Radio />} label="High" />
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Due date:</FormLabel>
          <TextField
            type="date"
            name="dueDate"
            value={todo?.dueDate}
            onChange={handleChange}
          />
        </FormControl>

        <Button variant="contained" onClick={handleSubmit}>
          {todo?.id ? "Update Task" : "Add Task"}
        </Button>
      </Stack>
    </Modal>
  );
};

export default TaskModal;
