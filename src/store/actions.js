import { SET_CURRENT_SONG, SET_CURRENT_ID, SET_RANDOM, SAVE_HEARD_SONGS, SET_DURATION, SET_CURRENT_TIME, SET_PLAYING, SET_ON_INPUT, SET_REPEAT} from "./constants"

const setCurrentSong = (payload) => {
    return (
        {
            type: SET_CURRENT_SONG, 
            payload
        }
    )
}
const setCurrentID = (payload) => {
    return (
        {
            type: SET_CURRENT_ID, 
            payload
        }
    )
}
const setRandom = (payload) => {
    return (
        {
            type: SET_RANDOM, 
            payload
        }
    )
}
const saveHeardSongs = (payload) => {
    return (
        {
            type: SAVE_HEARD_SONGS,
            payload
        }
    )
}
const setDuration = (payload) => {
    return (
        {
            type: SET_DURATION,
            payload
        }
    )
}
const setCurrentTime = (payload) => {
    return (
        {
            type: SET_CURRENT_TIME,
            payload
        }
    )
}
const setPlaying = (payload) => {
    return (
        {
            type: SET_PLAYING,
            payload
        }
    )
}
const setOnInput = (payload) => {
    return (
        {
            type: SET_ON_INPUT,
            payload
        }
    )
}
const setRepeat = (payload) => {
    return (
        {
            type: SET_REPEAT,
            payload
        }
    )
}
export {setCurrentSong, setCurrentID, setRandom, saveHeardSongs, setDuration, setCurrentTime, setPlaying, setOnInput, setRepeat}