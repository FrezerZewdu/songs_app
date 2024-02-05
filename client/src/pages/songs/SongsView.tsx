import React, { useEffect, useState } from 'react';
import { Box } from 'rebass/styled-components';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectSongs } from '../../features/slices/songsSlice';
import { RootState } from '../../store/store';
import { GET_SONGS, SongType } from '../../features/types/songTypes';
import SongFormModal from './SongForm';
import SongListItem from './SongItem';

// Define the theme
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
}

// Styled components
const SongListWrapper = styled(Box)<{theme: Theme}>`
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
`;

const CreateButtonWrapper = styled('div')`
  padding: 16px 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end
`;

const CreateButton = styled.button<{theme: Theme}>`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  
`;

const ModalOverlay = styled(Box)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(Box)`
  background-color: #fff;
  border-radius: 4px;
  padding: 20px;
`;

const SongsView: React.FC = () => {
  const dispatch = useDispatch();
  // const loadingStatus = useSelector((state) => state.songs.loading)

  const songs = useSelector((state: RootState) => selectSongs(state))
  useEffect(()=>{
    dispatch({type: GET_SONGS})
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editSong, setEditSong] = useState<SongType | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditSong(null);
  };
  
  const handleSongEdit = (song: SongType) => {
    setEditSong(song);
    openModal();
  }
  const handleFormSubmit = () => {
    // emited from the SongForm.tsx
    closeModal();
  };

  return (
    <ThemeProvider theme={theme as Theme}>
      <SongListWrapper theme={theme}>
        <CreateButtonWrapper>
          <CreateButton theme={theme} onClick={openModal}>New Song</CreateButton>
        </CreateButtonWrapper>
        {songs.map((song) => (
          <SongListItem key={song._id} _id={song._id} onEditSong={handleSongEdit} /> 
        ))}
      </SongListWrapper>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <SongFormModal song={editSong} onSubmit={handleFormSubmit} onCancel={closeModal} />
          </ModalContent>
        </ModalOverlay>
      )}
    </ThemeProvider>
  );
};
export default SongsView;