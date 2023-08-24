import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Filter = () => {
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

  const [selectedStatus, setSelectedStatus] = useState("");
  const optionsStatus = ["Completed", "In progress", "Pending"];

  const filteredTasks = tasks.filter((task) => {
    if (selectedStatus === "none") {
      return false;
    } else {
      return task.status === selectedStatus;
    }
  });

  return (
    <div>
      <FilterBar>
        <FilterLabel>Filter by task status:</FilterLabel>
        <FilterSelect
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="none">None</option>
          {optionsStatus.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </FilterSelect>
      </FilterBar>
      <FilterContainer>
        {filteredTasks.map((task) => (
          <StyledCard key={task.id}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Created at: {task.created}</p>
            <p>Deadline: {task.deadline}</p>
            <p>Status: {task.status}</p>
          </StyledCard>
        ))}
      </FilterContainer>
    </div>
  );
};

const FilterSelect = styled.select`
  font-size: 16px;
  padding: 5px;
`;

const FilterBar = styled.div`
  background-color: #f5f5f5;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterLabel = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
`;
const StyledCard = styled.li`
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

const FilterContainer = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  margin: 0;
`;
export default Filter;
