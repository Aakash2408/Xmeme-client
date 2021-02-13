import PostMemeForm from './components/inputform.js'
import React,{useContext, createContext, useReducer} from 'react'
import {initialState , reducer} from './reducer/reducer'
import './styles.css'
export const UserContext = createContext()
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    
    // <div className="App">
      <UserContext.Provider value={{state, dispatch}}>
      <PostMemeForm />
      {/* <ListMemes /> */}
    </UserContext.Provider>
    // </div>
  );
}

export default App;
