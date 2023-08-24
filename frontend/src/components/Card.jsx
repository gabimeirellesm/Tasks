import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

function Card() {
  const [tasks, setTasks] = useState([]);
  const optionsStatus = ["Completed", "In progress", "Pending"];

  useEffect(() => {
    axios
      .get("https://64e48df4c555638029136b4f.mockapi.io/tasks")
      .then((response) => {
        const data = response.data;
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [taskData, setTaskData] = useState([]);

  const handleEditTask = (task) => {
    setTaskData({ ...task });
    setIsEditing(true);
  };

  const handleSaveEditedTask = async () => {
    const taskId = taskData.id;

    const updatedTaskData = {
      ...taskData,
      ...editedTask,
    };

    if (isEditing) {
      try {
        const response = await axios.put(
          `https://64e48df4c555638029136b4f.mockapi.io/tasks/${taskId}`,
          updatedTaskData
        );
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? response.data : task
        );

        setTasks(updatedTasks);
        setTaskData(response.data);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  useEffect(() => {
    handleSaveEditedTask();
  }, [editedTask]);

  const handleDeleteTask = async () => {
    console.log("taskData", taskData.id);
    const taskId = taskData.id;
    try {
      await axios.delete(
        `https://64e48df4c555638029136b4f.mockapi.io/tasks/${taskId}`
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    handleDeleteTask();
  }, []);

  const handleCancelEditedTask = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <StyledGrid>
        {isEditing ? (
          <StyledForm>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={taskData.title}
                onChange={(e) => setEditedTask({ title: e.target.value })}
              ></input>
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={taskData.description}
                onChange={(e) =>
                  setEditedTask({
                    description: e.target.value,
                  })
                }
              ></input>
            </label>
            <label>
              Created at:
              <input
                type="text"
                name="created"
                value={taskData.created}
                readOnly
              ></input>
            </label>
            <label>
              Deadline:
              <input
                type="text"
                name="deadline"
                value={taskData.deadline}
                onChange={(e) => setEditedTask({ deadline: e.target.value })}
              ></input>
            </label>
            <label>
              Status:
              <select
                value={taskData.status}
                onChange={(e) => setEditedTask({ status: e.target.value })}
              >
                {optionsStatus.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <Button onClick={handleSaveEditedTask}>Save</Button>
            <Button onClick={handleCancelEditedTask}>Cancel</Button>
            <DeleteButton onClick={handleDeleteTask}>Delete</DeleteButton>
          </StyledForm>
        ) : (
          tasks.map((task) => (
            <StyledCard key={task.id}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>Created at: {task.created}</p>
              <p>Deadline: {task.deadline}</p>
              <p>Status: {task.status}</p>
              <Button onClick={() => handleEditTask(task)}>Edit Task</Button>
            </StyledCard>
          ))
        )}
      </StyledGrid>
    </div>
  );
}

const StyledCard = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  background-color: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 10vw;
  margin-top: 16px;
  margin-bottom: 16px;

  h2 {
    margin-top: 0;
  }

  p {
    margin: 8px 0;
    font-size: 70%;
  }
`;

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

const StyledGrid = styled.div`
  width: 80vw;
  height: 80vh;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-column-gap: 16px;
  grid-row-gap: 16px;
`;

export default Card;
