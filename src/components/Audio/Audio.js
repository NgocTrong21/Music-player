import React from "react";
import { useContext, useRef, useEffect } from "react";
import { StoreContext, actions } from "../../store";

function Audio() {
  const [state, dispatch] = useContext(StoreContext);
  const audioRef = useRef();
  const songLength = state.dataSongs.length;
  const songs = state.dataSongs;
  const currentSong = state.currentSong;
  
  //next song
  const nextSong = () => {
    let newId;

    if (state.isRandom) {
      do {
        newId = 1 + Math.floor(Math.random() * songLength);
      } while (state.heardSongs.includes(newId));
    } else {
      newId = currentSong.id + 1;
      if (newId > songLength) {
        newId = 1;
      }
    }
    dispatch(actions.setCurrentSong(songs[newId - 1]));
    dispatch(actions.saveHeardSongs(newId));
    dispatch(actions.setPlaying(true));
  };

  //handle repeat
  const handleRepeat = () => {
    if (state.isRepeat) {
      audioRef.current.play();
    } else {
      nextSong();
    }
  };

  useEffect(() => {
    audioRef.current.addEventListener("ended", handleRepeat);
    return () => {
      audioRef.current.removeEventListener("ended", handleRepeat);
    };
  }, [currentSong, state.isRepeat]);

  useEffect(() => {
    if (state.playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [state.playing, state.currentSong]);

  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", () => {
      dispatch(
        actions.setCurrentTime(Math.floor(audioRef.current.currentTime))
      );
    });
    audioRef.current.addEventListener("loadedmetadata", () => {
      dispatch(actions.setDuration(audioRef.current.duration));
    });
  }, []);
  useEffect(() => {
    audioRef.current.currentTime = state.currentTime;
  }, [`${state.isOnInput}`]);
  return <audio ref={audioRef} src={state.currentSong.path}></audio>;
}

export default Audio;
