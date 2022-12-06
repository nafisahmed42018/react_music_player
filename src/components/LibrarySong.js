import React from 'react';

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
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(audio => {
          audioRef.current.play();
        });
      }
    }
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
