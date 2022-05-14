import React, { useState, useEffect } from "react";
import {BrowserRouter, useParams, Routes, Route, Link, useNavigate} from "react-router-dom";
import { PostCreator } from '../PostCreator/PostCreator';
import { authHeader } from '../../services/auth-header';
import { toggleLoginPrompt } from "../../actions/prompt";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import List from '@mui/material/List'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';
import {ThreadItem, ThreadTitle, ThreadCategory, ThreadContent, ThreadAuthor, PostItem, PostTitle, PostContent, PostAuthor} from '../styling';


export const Thread = (props) => {

    const [thread, setThread] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [refresh, setRefresh] = useState(true);
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {openLoginPrompt} = useSelector(state => state.prompt);
    const {currentUser} = useSelector(state => state.auth);
    const {forceUpdate} = useSelector(state => state.forceUpdate);


    async function fetchData() {
      const headers = authHeader();
      let response = await axios("/api/get/thread?id=" + id.toString(), {headers});
      let threads = await response.data;
      setThread(threads);
      setIsLoading(false);
      console.log("fetched!");
    }

    useEffect(() => {
      fetchData();
    }
    ,[forceUpdate, currentUser]);

    useEffect(() => {
        if(typeof currentUser === "undefined") return; //prevents pop-up when currentUser is not yet fetched
        if(!currentUser) {
            dispatch(toggleLoginPrompt(true));
        }
    }, [currentUser])

   
    if(isLoading) return (<Typography><center> loading...</center></Typography>)

    return(
      <div id="thread">

      <Grid container spacing={2}>

        
        <Grid item xs={12}> 
            <List sx={{paddingTop: 0}}>
                <ThreadItem sx={{flexDirection: "row", flexWrap: "wrap"}}>
                    <ListItemAvatar>
                        <Avatar sx={{width: "45px", height: "45px"}} alt="Remy Sharp" src={thread[0].threadAuthors[0].avatar} />
                    </ListItemAvatar>
                        <ThreadTitle sx={{marginRight: 0.5}} component={Link} to={`/profile/${thread[0].threadAuthors[0].username}`}>{thread[0].title}</ThreadTitle>
                        <ThreadCategory component={Link} to={`/profile/${thread[0].threadAuthors[0].username}`}>{thread[0].category}</ThreadCategory>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                        <ThreadAuthor display="inline">
                        {thread[0].threadAuthors[0].username + ": "} 
                        </ThreadAuthor>
                          <ThreadContent display="inline">
                             {thread[0].text}
                          </ThreadContent>
                        </React.Fragment>
                      }
                    />

<Box sx={{width: "100%", marginBottom: "-12px"}}><ThreadContent sx={{fontSize: 9, float: "right"}}>21.02.2020, 17:30</ThreadContent></Box>
                </ThreadItem>
            </List>
        </Grid>

        <Grid item xs={12}>
            <List sx={{marginTop: -3.8}}>
                {thread[0].posts.map((post) => {
                    return(
                        <PostItem>
                            <ListItemAvatar>
                                <Avatar sx={{width: "50px", height: "50px"}} alt={post.postAuthor ? post.postAuthor.username : ""} src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                secondary={
                                    <React.Fragment>
                                    <PostAuthor>
                                         {post.postAuthor ? post.postAuthor.username : "unknown user"} says:
                                    </PostAuthor>
                                    <PostContent>
                                          {" " + post.text}
                                    </PostContent>
                                    </React.Fragment>
                                }
                            />
                        </PostItem>
                    )
                })
                }
                <ThreadItem>
                   
                    <ListItemText
                        primary={<PostContent>Answer here: </PostContent>}
                        secondary={
                            <React.Fragment>
                                <ThreadContent>
                                    <PostCreator thread_id={id} refresh={refresh} setRefresh={setRefresh}/>
                                </ThreadContent>
                            </React.Fragment>
                        }
                    />
                </ThreadItem>
        </List>
        </Grid>
    </Grid>
    </div>
    )
}