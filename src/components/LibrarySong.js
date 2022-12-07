import React from 'react';
import { playAudio } from '../utils/util';



const LibrarySong = ({
  id,
  songs,
  song,
  audioRef,
  setCurrentSong,
  setSongs,
  isPlaying,
}) => {

  //Event Handlers
  const songSelectHandler = () => {

    // const selectedSong = songs.filter(state => state.id === id);
    // console.log(selectedSong);
    setCurrentSong(song);

    const newSongs = songs.map(song => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    setSongs(newSongs);

    //Check if the song is playing
    //Insert a promise
    playAudio(isPlaying, audioRef);
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song-container ${song.active ? 'selected' : ''}`}
    >
      <img src={song.cover} alt='' />
      <div className='song-description'>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
