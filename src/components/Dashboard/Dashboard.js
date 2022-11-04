// import React from 'react'
import clsx from 'clsx'
import { useContext, useEffect, useRef} from 'react';
import style from'./Dashboard.module.css'
import {StoreContext, actions} from '../../store'

function Dashboard() {
    const [state, dispatch] = useContext(StoreContext); 
    const songs = state.dataSongs;
    const currentSong = state.currentSong;
    const songLength = state.dataSongs.length;
    const cdThumb = useRef();
    const cdThumbRote = useRef();
    //next song
    const nextSong = () => {
      let newId;
      if(state.isRandom){
        do {
          newId = 1 + Math.floor(Math.random() * songLength)
        }
        while(state.heardSongs.includes(newId))
      }
      else {
        newId = currentSong.id + 1;
        if(newId > songLength){ 
          newId = 1  
        }
      }
      dispatch(actions.setCurrentSong(songs[newId - 1]))
      dispatch(actions.saveHeardSongs(newId))
      dispatch(actions.setPlaying(true))
    } 
    
    //prev song
    const prevSong = () => {
      let newId;
      if(state.isRandom){
        do {
          newId = 1 + Math.floor(Math.random() * songLength)
        }
        while(state.heardSongs.includes(newId))
      }
      else {
        newId = currentSong.id - 1;
        if(newId < 1){   
          newId = songLength
        }
      }
      dispatch(actions.setCurrentSong(songs[newId - 1]))
      dispatch(actions.saveHeardSongs(newId))
      dispatch(actions.setPlaying(true))
    } 
    
    //animate cd
    useEffect(() => {
      cdThumbRote.current = cdThumb.current.animate([
        {
            transform: 'rotate(360deg)'
        }
      ],
      {
          duration: 10000,
          iterations: Infinity
      })
    }, [])

    useEffect(() => {
      if(state.playing){
        cdThumbRote.current.play();
      }
      else {
        cdThumbRote.current.pause();
      }
    }, [state.playing])
    
    
    //format time
    const timeFormat = (time) => {
        let minute;
        let second;
        if(Math.floor(time / 60) < 10){
            minute = `0${Math.floor(time / 60)}`;
        }
        else{
            minute = Math.floor(time / 60);
        }
        if(Math.floor(time - minute * 60 < 10)){
            second = `0${Math.floor(time - minute * 60)}`;
        }
        else{
            second = `${Math.floor(time - minute * 60)}`;
        }
        return (minute + ':' + second);
    }
    return (
        <div className={style.dashboard}>
            <div className={style.title}>
              <h4>Now playing song</h4>
              <h4 className={style.songName}>{currentSong.name}</h4>
            </div>
            <div className={style.cd}>
              <div 
                ref={cdThumb}
                className={style.cdThumb}
                style = {{backgroundImage: `url(${currentSong.image})`}}
              ></div>
            </div>
            <div className={style.time}>
              <div className={style.currentTime}>{timeFormat(state.currentTime)}</div>
              <div className={style.durationTime}>{timeFormat(state.duration)}</div>
            </div>
            <div className={style.progress}>
              <input 
                type="range" 
                step="1"  
                min="0" 
                max="100"
                value={Math.floor((state.currentTime / state.duration) * 100)}
                onInput = {(e) => {
                  dispatch(actions.setCurrentTime(Math.floor((e.target.value / 100) * state.duration)))
                  dispatch(actions.setOnInput(!state.isOnInput))
                }}
              />
            </div>

            <div className={style.control}>
              <div className={style.btnControl}>
                <div 
                  className={clsx(style.btn, style.btnPrev)}
                  onClick = {() => {
                    prevSong();        
                  }}
                >
                  <i className="fas fa-step-backward"></i>

                </div>
                <div 
                  className={clsx(style.btn, style.btnPlay, {
                    [style.playing]: state.playing
                  })}
                  onClick = {() => {
                    dispatch(actions.setPlaying(!state.playing))
                  }}
                >
                  <i className= {`fas fa-pause  ${style.iconPause}`}></i>
                  <i className={`fas fa-play  ${style.iconPlay}`}></i>

                </div>
                <div 
                  className={clsx(style.btn, style.btnNext)}
                  onClick = {() => {
                    nextSong();
                  }}
                >
                  <i className="fas fa-step-forward"></i>
                </div>
              </div>
              <div className={style.btnBonus}>
                <div 
                  className={clsx(style.btn, style.btnRandom, {
                    [style.btnActive]: state.isRandom
                  })}
                  onClick = {() => {
                    dispatch(actions.setRandom(!state.isRandom))
                  }}
                >
                  <i className="fas fa-random"></i>
                </div>
                <div 
                  className={clsx(style.btn, style.btnRepeat, {
                    [style.btnActive]: state.isRepeat
                  })}
                  onClick = {() => {
                    dispatch(actions.setRepeat(!state.isRepeat))
                  }}
                >
                  <i className="fas fa-redo"></i>
                </div>
              </div>
            </div>
        </div>
    )
}
export default Dashboard