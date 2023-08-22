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

  return (
    <div>
      {tasks.map((task) => (
        <StyledCard key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Created at: {task.created}</p>
          <p>Deadline: {task.deadline}</p>
          <p>Status: {task.status}</p>
        </StyledCard>
      ))}
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

export default Card;
