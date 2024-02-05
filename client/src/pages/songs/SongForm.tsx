import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from '@emotion/styled';
import { ThemeProvider  } from '@emotion/react';
import { Box } from 'rebass/styled-components';
import {CREATE_SONG, SongType, UPDATE_SONG } from "../../features/types/songTypes";

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

interface SongFormProps {
  song: SongType | null;
  onSubmit: () => void;
  onCancel: () => void;
}
const SongForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SongFormTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 18px;
`;

const SongFormLabel = styled.label`
  margin-bottom: 5px;
`;

const SongFormInput = styled.input`
  margin-bottom: 10px;
  margin-left: 8px;
  padding: 5px;
`;

const SongFormButtonWrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;
`;

const CancelFormButton = styled.button<{theme: Theme}>`
  background-color: #fff;
  color: #000;
  border: solid 1px;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
`;
const SongFormButton = styled.button<{theme: Theme}>`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
`;

const SongFormModal: React.FC<SongFormProps> = ({ song, onSubmit, onCancel }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(song?.title || '');
  const [artist, setArtist] = useState(song?.artist || '');
  const [album, setAlbum] = useState(song?.album || '');
  const [genre, setGenre] = useState(song?.genre || '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if(song) {
      // edit the song
      dispatch({type: UPDATE_SONG, payload: {
        ...song,
        title,
        artist,
        album,
        genre,
      }})
    } else {
      // create new
      dispatch({type: CREATE_SONG, payload: {
          title,
          artist,
          album,
          genre,
        } 
      });
    }
    setTitle('');
    setArtist('');
    setAlbum('');
    setGenre('');

    onSubmit();
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch(name) {
      case 'title':
        setTitle(value);
        break;
      case 'artist':
        setArtist(value);
        break
      case 'album':
        setAlbum(value);
        break
      case 'genre':
        setGenre(value);
        break
      default:
        console.log('We have a situation');
    }
  }

  return (
    <ThemeProvider theme={theme as Theme}>
      <SongForm onSubmit={handleSubmit}>
        <SongFormTitle>{song ? 'Update Song' : 'Create Song'}</SongFormTitle>
        <SongFormLabel>
          Title:
          <SongFormInput 
            type="text"
            name="title"
            value={title}
            onChange={handleInputChange}
            placeholder="Title"
          />
        </SongFormLabel>
        <SongFormLabel>
          Artist:
          <SongFormInput 
            type="text"
            name="artist"
            value={artist}
            onChange={handleInputChange}
            placeholder="Artist"
          />
        </SongFormLabel>
        <SongFormLabel>
          Album:
          <SongFormInput 
            type="text"
            name="album"
            value={album}
            onChange={handleInputChange}
            placeholder="Album"
          />
        </SongFormLabel>
        <SongFormLabel>
          Genre:
          <SongFormInput 
            type="text"
            name="genre"
            value={genre}
            onChange={handleInputChange}
            placeholder="Genre"
          />
        </SongFormLabel>
        
        <SongFormButtonWrapper>
          <SongFormButton theme={theme} type="submit">{song ? 'Update Song' : 'Create Song'}</SongFormButton>
          <CancelFormButton theme={theme} type="button" onClick={onCancel}>Cancel</CancelFormButton>       
        </SongFormButtonWrapper>
      </SongForm>
    </ThemeProvider>
    
  )
}

export default SongFormModal;