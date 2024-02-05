import React from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';

// Define the theme
type Theme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
  breakpoints: string[];
};

const theme: Theme = {
  colors: {
    primary: '#333',
    secondary: '#999',
    background: '#f5f5f5',
  },
  breakpoints: ['40em', '52em', '64em'],
};

// Styled components
const HeaderWrapper = styled(Flex)<{theme: Theme}>`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  padding: 16px;
  width: 100%;
`;

const NavLink = styled(Link)<{theme: Theme}>`
  margin-right: 16px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.background};

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }

  &.active {
    font-weight: bold;
  }
`;

const Header: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
        <HeaderWrapper theme={theme}>
          <NavLink theme={theme} to="/">
            Dashboard
          </NavLink>
          <NavLink theme={theme} to="/my-songs">
            My Songs
          </NavLink>
        </HeaderWrapper>
    </ThemeProvider>
  );
};

export default Header;