import axios from 'axios';
import {useFormik} from 'formik'
import React, {useEffect, useState, useContext} from 'react'
import M from 'materialize-css'
import ListMemes from './memeslist'
import {UserContext} from '../App'
// const URL = process.env.NODE_ENV=='production' ? require('../urls').production : require('../urls').lcoal
const URL="http://localhost:8080"
const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = 'Required';
    } 
  
    if (!values.caption) {
      errors.caption = 'Required';
    } 

    if (!values.url) {
        errors.url = 'Required';
    } else if(!/(http(s?):\/\/)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/.test(values.url)){
        errors.url = 'It is not a proper URL'
    }
    return errors;
  };
  
  const PostMemeForm = () => {
    const {state, dispatch} = useContext(UserContext)
    const formik = useFormik({
      initialValues: {
        name: '',
        caption: '',
        url: '',
      },
      validate,
      onSubmit: values => {
        // console.log(JSON.stringify(values))
        const requestOptions = {
          method: 'post',
          headers: { 'Content-Type': 'application/json' }
      };
      // console.log(requestOptions)
      // console.log(process.env.REACT_APP_CUSTOM_ENV_VAR)
      fetch(`${URL}/memes?name=${values.name}&caption=${values.caption}&url=${values.url}`, requestOptions)
          .then(response => response.json())
          .then((data)=>{
            // console.log(data)
            if(!data.id){
              M.toast({html : data.message, classes: "red darken-1"})
            }else{
              M.toast({html : "Meme Created Successfully" , classes : "green darken-1"})
              fetch(`${URL}/memes`)
              .then(response => response.json())
              .then((data)=>{
                dispatch({type:'SET', payload: data})
              })
            }
          });
      },
    });
    const [memesData, setMeme] = useState([])
    const[isChildLoading, setChildLoading] = useState(true)
    useEffect(async ()=>{
      // console.log(URL)
      let memes = await axios.get(`${URL}/memes`)
      dispatch({type: 'SET', payload : memes.data})
      // setChildLoading(false)
    },[])
    return (
      <div>
        <div className="form">
        <h1>Xmeme-CWoD</h1>
        <form onSubmit={formik.handleSubmit}
         style={{}}
        >
          <label htmlFor="name">Meme Owner &nbsp; <span style={{color:"red"}}>*</span></label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name ? <div>{formik.errors.name}</div> : null}
    
          <label htmlFor="caption">Caption  &nbsp; <span style={{color:"red"}}>*</span></label>
          <input
            id="caption"
            name="caption"
            type="text"
            placeholder="Be creative with your capion"
            onChange={formik.handleChange}
            value={formik.values.caption}
          />
          {formik.errors.caption ? <div>{formik.errors.caption}</div> : null}
    
          <label htmlFor="url">Meme URL &nbsp; <span style={{color:"red"}}>*</span></label>
          <input
            id="url"
            name="url"
            type="text"
            placeholder="Enter URL of your meme here"
            onChange={formik.handleChange}
            value={formik.values.url}
          />
          {formik.errors.url ? <div>{formik.errors.url}</div> : null}
          {/* <br></br> */}
          <button className="waves-light btn" type="submit">Submit</button>
          <hr></hr>
        </form>
        </div>
        <ListMemes memesData={memesData}/>
      </div>
    );
  };

  export default PostMemeForm;
