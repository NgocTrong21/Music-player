import {useStore} from './hooks'
import Context from './Context'
const Provider = ({children}) => {
    const [state, dispatch] = useStore();
    return ( 
    <Context.Provider value = {[state, dispatch]}>
        {children}
    </Context.Provider>
    )
   
}
export default Provider