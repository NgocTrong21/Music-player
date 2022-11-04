import React, { useEffect } from "react"
import clsx from 'clsx'
import {useContext, useRef} from 'react'
import {StoreContext, actions} from '../../store'
import style from './SongPlaylist.module.css'


function SongPlaylist() {
    const [state, dispatch] = useContext(StoreContext);
    const songs = state.dataSongs;
    const currentSong = state.currentSong;
    const activeSongRef = useRef();
    const songRef = useRef();
    const scrollActiveSong = (activeSong) => {
            setTimeout(() => {
                activeSong.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                })
            }, 300)
    }
    useEffect(() => {
        scrollActiveSong(activeSongRef.current);
    }, [currentSong])
    return (
        <div 
            className={style.songsPlaylist}
        >
            {songs.map((song, index) => (
                <div 
                    className={clsx(style.song, 
                        song.id === currentSong.id ? style.active : '')
                    } 
                    ref={song.id === currentSong.id ? activeSongRef : songRef}
                    key={index}
                    onClick = {() => {
                        dispatch(actions.setCurrentSong(song))
                        dispatch(actions.setCurrentID(song.id))
                        dispatch(actions.setPlaying(true));
                    }}
                >
                    <div className='body'>
                        <h3 className='title'>{song.name}</h3>
                        <p className='author'>{song.singer}</p>
                    </div>
                    <div className={style.option}>
                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SongPlaylist

