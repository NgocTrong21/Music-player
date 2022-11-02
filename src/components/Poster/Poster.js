import { useContext, useEffect } from 'react'
import style from './Poster.module.css'
import { StoreContext } from '../../store';
export default function Poster() {
    const [state, dispatch] = useContext(StoreContext);
    
    return (
        <div 
            className={style.poster}
            style = {{backgroundImage: `url(${state.currentSong.poster})`}}
        >
        </div>
    )
}