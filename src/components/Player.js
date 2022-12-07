import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import { playAudio } from '../utils/util';

const Player = ({
  audioRef,
  songInfo,
  setSongInfo,
  currentSong,
  isPlaying,
  setIsPlaying,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  //States
  //useEffect
  useEffect(() => {
    const newSongs = songs.map(song => {
      if (song.id === currentSong.id) {
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
  }, [currentSong]);
  //Event Handlers
  const playHandler = () => {
    // console.log(audioRef);
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const dragHandler = e => {
    // console.log(e.target.value);
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = direction => {
    let currentIndex = songs.findIndex(song => song.id === currentSong.id);
    if (direction === 'skip-forward') {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === 'skip-back') {
      if (currentIndex === 0) {
        setCurrentSong(songs[songs.length - 1]);
        playAudio(isPlaying, audioRef);
        return;
      }
      setCurrentSong(songs[currentIndex - 1]);
    }
    playAudio(isPlaying, audioRef);
  };

  //misc
  const formatTime = time => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  //styles
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  //JSX
  return (
    <div className='player-container'>
      <div className='time-control'>
        <p>{formatTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
          className='track'
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type='range'
          />
          <div style={trackAnimation} className='animate-track'></div>
        </div>
        <p>{songInfo.duration ? formatTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon
          className='skip-back'
          icon={faAngleLeft}
          size='2x'
          onClick={() => skipTrackHandler('skip-back')}
        />
        <FontAwesomeIcon
          onClick={playHandler}
          className='play-button'
          icon={isPlaying ? faPause : faPlay}
          size='2x'
        />
        <FontAwesomeIcon
          className='skip-forward'
          icon={faAngleRight}
          size='2x'
          onClick={() => skipTrackHandler('skip-forward')}
        />
      </div>
    </div>
  );
};

export default Player;
