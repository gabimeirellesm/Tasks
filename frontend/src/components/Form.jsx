import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

function Form() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  /* status */
  const optionsStatus = ["Completed", "In progress", "Pending"];
  const [selectedOptionStatus, setSelectedOptionStatus] = useState("");
  /* deadline */
  const [deadline, setDeadline] = useState("");
  const currentDate = new Date();
  const isValidDate = /^\d{4}-\d{2}-\d{2}$/;
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const [year, month, day] = deadline.split("-").map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();
  /* created at */
  const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(
    2,
    "0"
  )}-${String(currentDate.getDate()).padStart(2, "0")}`;

  const refreshPage = () => {
    window.location.reload();
  };

  const handleCreateTask = () => {
    /* conditions for deadline */
    if (!isValidDate.test(deadline)) {
      alert("Please enter a valid date in the format yyyy-mm-dd.");
      return;
    }
    if (month < 1 || month > 12) {
      alert("Month should be between 1 and 12.");
      return;
    } else if (day < 1 || day > daysInMonth) {
      alert(`Day should be between 1 and ${daysInMonth}.`);
      return;
    } else if (
      year < currentYear ||
      (year === currentYear && month - 1 < currentMonth)
    ) {
      alert("Deadline should be a future date in the format yyyy-mm-dd");
      return;
    }

    const taskData = {
      title: title,
      description: description,
      created: formattedDate,
      deadline: deadline,
      status: selectedOptionStatus,
    };

    axios
      .post("https://64e48df4c555638029136b4f.mockapi.io/tasks", taskData)
      .then((response) => {
        const createdTask = response.data;
        setTasks([...tasks, createdTask]);

        setTitle("");
        setDescription("");
        setDeadline("");
        setSelectedOptionStatus("");
        refreshPage();
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };

  const handleCancelCreateTask = () => {
    setTitle("");
    setDescription("");
    setDeadline("");
    setSelectedOptionStatus("");
  };

  return (
    <div>
      <StyledForm>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label>
          Deadline:
          <input
            type="text"
            value={deadline}
            placeholder="yyyy-mm-dd"
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>
        <br />
        <label>Status:</label>
        <select
          value={selectedOptionStatus}
          onChange={(e) => setSelectedOptionStatus(e.target.value)}
        >
          <option value="status">Select an option</option>
          {optionsStatus.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <br />
        <Button type="button" onClick={handleCreateTask}>
          Create Task
        </Button>
        <DeleteButton onClick={handleCancelCreateTask}>Clear</DeleteButton>
      </StyledForm>
    </div>
  );
}
const StyledForm = styled.form`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 20vw;
  height: 80vh;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    width: 90%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 16px;
  }

  textarea {
    width: 90%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 16px;
  }

  select {
    width: 90%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-bottom: 16px;
  }
`;
const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 0.5vw 1vh;
  cursor: pointer;
  margin-right: 16px;
  font-size: 70%;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;
export default Form;
