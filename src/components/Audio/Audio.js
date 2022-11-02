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

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("ended", () => {
      if (!state.isRepeat) {
        debugger;
        nextSong();
      }
    });
    return audio.removeEventListener("ended", () => {
      nextSong();
    });
  }, [currentSong || state.isRepeat]);

  useEffect(() => {
    const audio = audioRef.current;
    if (state.playing) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [state.playing, state.currentSong]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", () => {
      dispatch(actions.setCurrentTime(Math.floor(audio.currentTime)));
    });
    audio.addEventListener("loadedmetadata", () => {
      dispatch(actions.setDuration(audio.duration));
    });
  }, []);
  useEffect(() => {
    audioRef.current.currentTime = state.currentTime;
  }, [state.isOnInput]);
  return <audio ref={audioRef} src={state.currentSong.path}></audio>;
}

export default Audio;
