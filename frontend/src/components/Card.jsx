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
  const [createdAt, setCreatedAt] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [newTask, setNewTask] = useState(null);

  const handleCreateTask = () => {
    const taskData = {
      title: title,
      description: description,
      created: createdAt,
      deadline: deadline,
      status: status,
    };

    axios
      .post("https://64e48df4c555638029136b4f.mockapi.io/tasks", taskData)
      .then((response) => {
        const createdTask = response.data;
        setTasks([...tasks, createdTask]);
        setNewTask(createdTask);
      })
      .catch((error) => {
        console.error("Error creating task:", error);
      });
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(null);

  const handleEditTask = (task) => {
    setEditedTask({ ...task });
    setIsEditing(true);
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
            Created At:
            <input
              type="text"
              value={createdAt}
              onChange={(e) => setCreatedAt(e.target.value)}
            />
          </label>
          <br />
          <label>
            Deadline:
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </label>
          <br />
          <label>
            Status:
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={handleCreateTask}>
            Create Task
          </button>
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
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, created: e.target.value })
                  }
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
              <button onClick={handleCancelEditedTask}>Cancel</button>
            </StyledForm>
          ) : (
            tasks.map((task) => (
              <StyledCard key={task.id}>
                <h2>{task.title}</h2>
                <p>{task.description}</p>
                <p>Created at: {task.created}</p>
                <p>Deadline: {task.deadline}</p>
                <p>Status: {task.status}</p>
                <button onClick={() => handleEditTask(task)}>Edit Task</button>
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
  height: 20vh;
  margin-top: 16px;

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

  button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    padding: 10px 20px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
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
