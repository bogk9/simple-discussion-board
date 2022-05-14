import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl'
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Input from '@mui/material/Input';
import Form from '@mui/material/FormControl'
import { authHeader } from '../../services/auth-header';
import axios from 'axios';
import { ValidationTextField } from '../styling';
import { ValidationTextFieldMultiline } from '../styling';

import { useDispatch, useSelector } from 'react-redux';
import { forceUpdate } from '../../actions/forceUpdate';

import React, { useState, useProps} from "react";
import { useNavigate} from "react-router-dom";
import {
  BrowserRouter,
  useParams,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { getThemeProps } from '@mui/system';




export const PostCreator = (props) => {

    //const [form, setForm] = useState({author: "", topic: "", content: ""});

    const [formAuthor, setFormAuthor] = useState();
    const [formContent, setFormContent] = useState();
    const dispatch = useDispatch();


    let navigate = useNavigate();

    const onAuthorChange = (e) => {
      setFormAuthor(e.target.value);
    }
 
    const onContentChange = (e) => {
      setFormContent(e.target.value);
    }

    const onSubmit = async (e) => {
      e.preventDefault();
 
      // When a post request is sent to the create url, we'll add a new record to the database.
      const newPost = {
        date: "2016",
        text: formContent,
        user_id: parseInt(formAuthor),
        thread_id: props.thread_id
      };
    
      /*
      await fetch("http://localhost:5006/record/addPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      })
      .catch(error => {
        window.alert(error);
        return;
      });
      */


      axios.post('/api/add/post', newPost, {headers: authHeader()})
      console.log("posted: " );
      console.log(newPost);
      setFormAuthor("");setFormContent("");
      dispatch(forceUpdate());

      //add error catch
      // .catch(error => {
        //window.alert(error);
        //return;
     // });
    
      console.log("sent");
      setFormAuthor("");setFormContent("");
    }
    
    return(
          <>
       

          <Grid item mt={2} xs={12} align="center">
            <ValidationTextFieldMultiline InputProps={{style: {borderRadius: 20, borderColor: 'white', color: "white"}}} InputLabelProps={{style: {color: "white", borderColor: "white!important"}}} mt={2} fullWidth id="outlined-basic" multiline   label="What you have to say"  rows={4} variant="outlined" onChange={onContentChange} value={formContent} />
          </Grid>

          <Grid item mt={2} xs={12} align="center">
          <Button sx={{borderRadius: 20, borderColor: "white"}} fullWidth type="submit" mt={2} onClick={onSubmit} variant="outlined">
            Submit
          </Button>
          </Grid>
          </>

    )
}