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
import ReactTagInput from '@pathofdev/react-tag-input';
import "@pathofdev/react-tag-input/build/index.css"
import { ThreadItem } from '../styling';
import { ValidationTextField } from '../styling';
import { ValidationTextFieldMultiline } from '../styling';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';

import { useDispatch, useSelector } from 'react-redux';
import { toggleLoginPrompt } from '../../actions/prompt';
import { toggleThreadPrompt } from '../../actions/prompt';
import { forceUpdate } from '../../actions/forceUpdate';




import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { authHeader } from '../../services/auth-header';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});






export const ThreadCreator = () => {

    const [formAuthor, setFormAuthor] = useState();
    const [formTopic, setFormTopic] = useState();
    const [formContent, setFormContent] = useState();
    const [formTags, setFormTags] = useState(["misc"]);
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.auth);
    const {openThreadCreator} = useSelector(state => state.prompt);

    let navigate = useNavigate();

    const onAuthorChange = (e) => {
      setFormAuthor(e.target.value);
    }
    const onTopicChange = (e) => {
      setFormTopic(e.target.value);
    }
    const onContentChange = (e) => {
      setFormContent(e.target.value);
    }
    const handleClose = () => {
      dispatch(toggleThreadPrompt(false));
    };
  

    const onSubmit = async (e) => {
      e.preventDefault();
 
      // date and user_id are provided server-side
      const newPerson = {
        title: formTopic,
        date: "",
        text: formContent,
        user_id: "",
        category: formTags[0]
      };
    
      axios.post(`/api/add/thread`, newPerson, {headers: authHeader()})
      setFormAuthor("");setFormContent("");setFormTopic("");
      dispatch(toggleThreadPrompt(false));
      dispatch(forceUpdate());
      navigate("/");
    }
    

    return(

      <Dialog
      open={openThreadCreator}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 0

      }}>
        <ThreadItem>
        
          <Grid container  justifyContent="center" alignItems="center" spacing={2}>
        

          <Grid item xs={10} align="center">
              <ValidationTextField fullWidth id="outlined-basic" label="topic" placeholder="topic" variant="outlined" onChange={onTopicChange} value={formTopic} InputLabelProps={{
      style: { color: 'white'}, 
   }}/>
          </Grid>

          <Grid item xs={2} align="center">
            <ReactTagInput 
              tags={formTags} 
              onChange={(newTags) => setFormTags(newTags)}
              maxTags={1} 
              editable={true}  
              readOnly={false} 
              removeOnBackspace={true} 
            />
          </Grid>


          <Grid item xs={12} align="center">
            <ValidationTextFieldMultiline  InputProps={{style: {borderRadius: 20, borderColor: 'white', color: "white"}}} multiline InputLabelProps={{style: {color: "white", borderColor: "white!important"}}}  fullWidth id="outlined-basic"   label="say something..."  rows={4} variant="outlined" onChange={onContentChange} value={formContent} />
          </Grid>

          <Grid item xs={12} align="center">
          <Button sx={{borderRadius: 20, color: "white", borderColor: "white"}} type="submit" fullWidth onClick={onSubmit} variant="outlined">
            Submit thread
          </Button>
          </Grid>

      </Grid>
      </ThreadItem>
      </Box>

      </Dialog>

    )
}