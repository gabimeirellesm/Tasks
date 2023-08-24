import React from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Form from "../components/Form";
import styled from "styled-components";
import Filter from "../components/Filter";

function Board() {
  return (
    <div>
      <Filter />
      <StyledContainer>
        <Form />
        <Card />
      </StyledContainer>
      <Footer />
    </div>
  );
}

const StyledContainer = styled.div`
  display: flex;
`;
export default Board;
