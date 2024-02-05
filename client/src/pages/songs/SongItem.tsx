import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSongsById } from '../../features/slices/songsSlice';
import { RootState } from '../../store/store';
import { DELETE_SONG, SongType } from '../../features/types/songTypes';
import { Box, Flex } from 'rebass/styled-components';
import styled from '@emotion/styled';
import { ThemeProvider  } from '@emotion/react';


type Theme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
  },
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

interface SongListProps {
  _id: string;
  onEditSong: (song: SongType) => void;
}

const SongItem = styled(Flex)`
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
`;

const SongInfo = styled(Box)`
  flex: 1;
`;

const SongTitle = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const SongDetails = styled.p<{theme: Theme}>`
  margin: 0;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 14px;
`;

const EditButton = styled.button<{theme: Theme}>`
  background-color: orange;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 16px;
  margin-left: 12px; 
  cursor: pointer;
`;
const DeleteButton = styled.button<{theme: Theme}>`
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 16px;
  margin-left: 12px; 
  cursor: pointer;
`;
const SongListItem: React.FC<SongListProps> = ({ _id, onEditSong }) => {
  const song = useSelector((state: RootState) => selectSongsById(state, _id));
  const dispatch = useDispatch();
  const handleDeleteSong = (songId: string) => {
    dispatch({type: DELETE_SONG, payload: songId})
  }
  return (
    <ThemeProvider theme={theme as Theme}>
      <SongItem>
        <SongInfo>
          <SongTitle>{song.title}</SongTitle>
          <SongDetails theme={theme}>
            Artist: {song.artist} | Album: {song.album} | Genre: {song.genre}
          </SongDetails>
        </SongInfo>
        <EditButton theme={theme} onClick={() => onEditSong(song)}>Edit</EditButton>
        <DeleteButton theme={theme} onClick={() => handleDeleteSong(song._id)} >Delete</DeleteButton>
      </SongItem>
      
    </ThemeProvider>
  )
}

export default SongListItem;