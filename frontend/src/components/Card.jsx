import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

function Card() {
  const [tasks, setTasks] = useState([]);

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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [newTask, setNewTask] = useState(null);

  /* status */
  const [selectedOptionStatus, setSelectedOptionStatus] = useState("");
  const optionsStatus = ["Completed", "In progress", "Pending"];

  const handleOptionChangeStatus = (event) => {
    setSelectedOptionStatus(event.target.value);
  };

  /* deadline */
  const [deadline, setDeadline] = useState("");
  const currentDate = new Date();
  const isValidDate = /^\d{4}-\d{2}-\d{2}$/;
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  /* created at */
  const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(
    2,
    "0"
  )}-${String(currentDate.getDate()).padStart(2, "0")}`;

  const handleCreateTask = () => {
    /* conditions for deadline */
    if (!isValidDate.test(deadline)) {
      alert("Please enter a valid date in the format yyyy-mm-dd.");
      return;
    }

    const [year, month, day] = deadline.split("-").map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();

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
        setNewTask(createdTask);

        setTitle("");
        setDescription("");
        setDeadline("");
        setSelectedOptionStatus("");
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

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const handleEditTask = (task) => {
    setEditedTask({ ...task });
    setIsEditing(true);
    console.log(task.id);
  };

  const [updatedAt, setUpdatedAt] = useState(null);

  const handleSaveEditedTask = async () => {
    if (editedTask) {
      const editedTaskId = editedTask.id;

      try {
        const response = await axios.put(
          `https://64e48df4c555638029136b4f.mockapi.io/tasks/${editedTaskId}`,
          editedTask
        );
        setUpdatedAt(response.data.updatedAt);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  useEffect(() => {
    handleSaveEditedTask();
  }, [editedTask]);

  const handleDeleteTask = async () => {
    if (editedTask || newTask) {
      try {
        await axios.delete(
          `https://64e48df4c555638029136b4f.mockapi.io/tasks/${editedTask.id}`
        );
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleCancelEditedTask = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <StyledContainer>
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
              placeholder="(yyyy-mm-dd)"
              onChange={(e) => setDeadline(e.target.value)}
            />
          </label>
          <br />
          <label>Status:</label>
          <select
            value={selectedOptionStatus}
            onChange={handleOptionChangeStatus}
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
        <StyledGrid>
          {isEditing ? (
            <StyledForm>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                ></input>
              </label>
              <label>
                Description:
                <input
                  type="text"
                  name="description"
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
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
                  value={editedTask.created}
                  readOnly
                ></input>
              </label>
              <label>
                Deadline:
                <input
                  type="text"
                  name="deadline"
                  value={editedTask.deadline}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, deadline: e.target.value })
                  }
                ></input>
              </label>
              <label>
                Status
                <input
                  type="text"
                  name="status"
                  value={editedTask.status}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, status: e.target.value })
                  }
                ></input>
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
      </StyledContainer>
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

const StyledContainer = styled.section`
  display: flex;
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
