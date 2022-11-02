import { useReducer } from "react";
import { initState, reducer } from "./reducer";

const useStore = () => {
    const [state, dispatch] = useReducer(reducer, initState);
    return [state, dispatch]
}

export {useStore}