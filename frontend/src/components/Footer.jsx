import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <StyledFooter>
      <FooterLink
        href="https://www.webhs.pt/certificados-ssl/?gclid=Cj0KCQjw_5unBhCMARIsACZyzS3Q7HKjP_llXEvV2Xt2bl5ezDuowYSgPXS_Iw7iKrSHQqVmY8p8bIsaApctEALw_wcB"
        target="_blank"
      >
        Project for Webhs
      </FooterLink>
      <FooterLink
        href="https://www.linkedin.com/in/gabriela-meirelles-martins/"
        target="_blank"
      >
        Created by Gabriela Meirelles
      </FooterLink>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
`;

const FooterLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
  font-weight: bold;
  margin: 10px;

  &:hover {
    text-decoration: underline;
  }
`;
export default Footer;
