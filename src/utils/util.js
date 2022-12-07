export const playAudio = (isPlaying, audioRef) => {
  //Check if the song is playing
  //Insert a promise
  if (isPlaying) {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(audio => {
          audioRef.current.play();
        })
        .catch(err => console.log(err));
    }
  }
};
