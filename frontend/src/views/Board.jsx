import React from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Form from "../components/Form";
import styled from "styled-components";

function Board() {
  return (
    <div>
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
