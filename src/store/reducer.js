import DataSongs from "../data/songs.json";
import { SET_CURRENT_ID, SET_CURRENT_SONG, SET_RANDOM, SAVE_HEARD_SONGS, SET_DURATION, SET_CURRENT_TIME, SET_PLAYING , SET_ON_INPUT, SET_REPEAT} from "./constants";

const songs = DataSongs.songs;
const initState = {
    dataSongs: songs,
    currentSong: songs[0],
    currentId: 1,
    isRandom: false,
    heardSongs: [1],
    duration: 1,
    currentTime: 0,
    playing: false,
    isOnInput: false,
    isRepeat: false
}

const reducer = (state, action) => {
    switch(action.type){
        case SET_CURRENT_SONG: 
            return {
                ...state,
                currentSong: action.payload
            } 
        case SET_CURRENT_ID:
            return {
                ...state,
                currentId: action.payload
            }
        case SET_RANDOM:
            return {
                ...state,
                isRandom: action.payload
            }
        case SAVE_HEARD_SONGS: {
            let newHeardSongs = [...state.heardSongs, action.payload]
            if(newHeardSongs.length >= state.dataSongs.length){
                newHeardSongs = []
            }
            return {
                ...state,
                heardSongs: newHeardSongs
            }
        }
        case SET_DURATION:
            return {
                ...state,
                duration: action.payload
            }

        case SET_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.payload
            } 
        case SET_PLAYING:
            return {
                ...state,
                playing: action.payload
            }
        case SET_ON_INPUT:
            return {
                ...state,
                isOnInput: action.payload
            }       
        case SET_REPEAT:
            return {
                ...state,
                isRepeat: action.payload
            }
        default:
            throw new Error('invalid!')
    }
}

export {initState, reducer}