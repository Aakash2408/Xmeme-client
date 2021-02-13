import React ,{useContext}from 'react'
import Modal from './edit'
import {UserContext} from '../App'
const MemesData = ({memesData})=>{
    const {state, dispatch} = useContext(UserContext)
    // console.log(state)
    let memedHtml = state.map((data)=>{
        return(
            <div key={data.id}>
            <h5>{data.name}</h5>
            <p style={{paddingLeft:"15px"}}>{data.caption}</p>
            <img className="memeImg" style={{paddingLeft:"15px"}} src={data.url}></img>
            <br></br>
            <Modal Item={data} />
        </div>
        )
    })
    // console.log(memedHtml)
    return(
        <div className="list">
            {/* {memesData} */}
            {memedHtml}
        </div>
    )
}
export default MemesData
