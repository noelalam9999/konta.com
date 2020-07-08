import React from "react";
import styled from "@emotion/styled";
import logo from "./logo.png";
const img = styled.h1`
  font-family: "IMFell", "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 10rem;
  color: grey;
  margin: 0;
  text-align: center;
`;

const Logo = () => {
  return <img src={logo} alt=''/>;
};

export default Logo;
