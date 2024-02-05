import React, { useEffect } from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { ThemeProvider  } from '@emotion/react';
import styled from '@emotion/styled';
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { GET_STATS } from '../../features/types/statsTypes';

type colors = {
  primary: string;
  secondary: string;
  background: string;
}
// Define the theme
interface Theme {
  colors: colors;
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
const StatBox = styled(Box)<{theme: Theme}>`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.background};
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const StatLabel = styled(Box)`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const StatValue = styled(Box)`
  font-size: 36px;
`;

const Dashboard: React.FC = () => {
  // Simulated song statistics data
  const dispatch = useDispatch();
  const stats = useSelector((state: RootState) => state.stats)
  
  useEffect(()=> {
    dispatch({type: GET_STATS})
  }, [dispatch]);
  
  return (
    <ThemeProvider theme={theme as Theme}>
      <Flex flexDirection="row" alignItems="center" justifyContent="space-around" padding="28px">
        <StatBox theme={theme}>
          <StatLabel>Total Songs</StatLabel>
          <StatValue>{stats.totalSongs}</StatValue>
        </StatBox>
        <StatBox theme={theme}>
          <StatLabel>Total Artists</StatLabel>
          <StatValue>{stats.totalArtists}</StatValue>
        </StatBox>
        <StatBox theme={theme}>
          <StatLabel>Total Albums</StatLabel>
          <StatValue>{stats.totalAlbums}</StatValue>
        </StatBox>
        <StatBox theme={theme}>
          <StatLabel>Total Genres</StatLabel>
          <StatValue>{stats.totalGenres}</StatValue>
        </StatBox>
      </Flex>
      <Flex flexDirection="row" alignItems="center" justifyContent="space-around" >
        <StatBox theme={theme}>
          <StatLabel>Songs by Genre</StatLabel>
          {stats.songsByGenre.map((item) => (
            <Flex key={item._id} justifyContent="space-between">
              <Box>{item._id}</Box>
              <Box>{item.count}</Box>
            </Flex>
          ))}
        </StatBox>
        <StatBox theme={theme}>
          <StatLabel>Songs by Artist</StatLabel>
          {stats.songsByArtist.map((item) => (
            <Flex key={item._id} justifyContent="space-between">
              <Box>{item._id}</Box>
              <Box>{item.count}</Box>
            </Flex>
          ))}
        </StatBox>
        <StatBox theme={theme}>
          <StatLabel>Songs by Album</StatLabel>
          {stats.songsByAlbum.map((item) => (
            <Flex key={item._id} justifyContent="space-between">
              <Box>{item._id}</Box>
              <Box>{item.count}</Box>
            </Flex>
          ))}
        </StatBox>
      </Flex>
    </ThemeProvider>
  );
};

export default Dashboard;