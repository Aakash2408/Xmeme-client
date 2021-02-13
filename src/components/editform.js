import {useFormik} from 'formik'
import React, {useEffect, useState, useContext} from 'react'
import M from 'materialize-css'
import {UserContext} from '../App'
const URL = process.env.NODE_ENV=='production' ? require('../urls').production : require('../urls').lcoal
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
  
  const ModalForm = (props) => {
    const{state, dispatch} = useContext(UserContext)
    // console.log(props)
    const formik = useFormik({
      initialValues: {
        name: props.data.name,
        caption: props.data.caption,
        url: props.data.url,
      },
      validate,
      onSubmit: values => {
        // console.log(props)
        // console.log(JSON.stringify(values))
        const requestOptions = {
          method: 'put',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({name: formik.values.name, caption:formik.values.caption, url:formik.values.url})
      };
      // console.log(requestOptions)
      fetch(`${URL}/memes/${props.data.id}`, requestOptions)
      .then(response => response.json())
      .then((data)=>{
        // console.log(data)
        if(data.message=='Updated Successfully'){
          M.toast({html: data.message, classes:"green darken-1"})
          fetch(`${URL}/memes`)
          .then(response=>response.json())
          .then((data)=>{
            dispatch({type:'SET', payload:data})
          })
        }else{
          M.toast({html: data.message, classes:"red darken-1"})
        }
      })
      
      },
    });
    
    return (
        <div className="">
        <h1>Xmeme - CWoD</h1>
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
    
          <label htmlFor="caption">Caption &nbsp; <span style={{color:"red"}}>*</span></label>
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
          <button className="btn" onClick={props.update} type="submit">Submit</button>
          <hr></hr>
        </form>
        </div>
    );
  };

  export default ModalForm;