import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({ songs, setSongs, setCurrentSong, audioRef, isPlaying }) => {
  return (
    <div className='library-container'>
      <h2>Library</h2>
      <div className='library-song'>
        {songs.map(song => (
          <LibrarySong
            key={song.id}
            id={song.id}
            song={song}
            songs={songs}
            setCurrentSong={setCurrentSong}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};
export default Library;
