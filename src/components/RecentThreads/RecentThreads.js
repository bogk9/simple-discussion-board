import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import List from '@mui/material/List'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import { CardHeader } from '@mui/material';

import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';

import React, { useState, useEffect } from "react";
import { cloneNode } from '@babel/types';

import {dummies} from './dummies';

import {ThreadItem, ThreadTitle, ThreadCategory, ThreadContent, ThreadAuthor, PostItem, PostTitle, PostContent, PostAuthor} from '../styling';

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useSelector } from 'react-redux';



export const RecentThreads = () => {

    const [threads, setThreads] = useState();
    const [refresh, setRefresh] = useState(false); //negate to refresh
    const {forceUpdate} = useSelector(state => state.forceUpdate);
    const [isLoading, setIsLoading] = useState(true);

    const getDummyThreads = () => {
      const arr = [...Array(10).keys()]
      let dummy = {
        "userInfo": 
          [{"user_id": 0, "username": "dummyUsername", "avatar": "" }],
        "_id": "123",
        "title": "sample title",
        "date": "13:39:11, 2022-05-05",
        "text": "Hey! It seems that data cannot be fetched from backend API. ",
        "category": "category"
      }
      const dummies = [];
      Array(10).fill().map(() => dummies.push(dummy));
      //dummies.push(dummy);dummies.push(dummy);dummies.push(dummy);
      return dummies;
    }

    useEffect(() => {
      const fetchThreads = async () =>{
        let loadedThreads = await fetch(`http://localhost:3000/api/get/recentThreads`)
        .then(response => response.json())
        .catch(error => {
          //window.alert(error);
          return dummies;
        });

        setThreads(loadedThreads);
        console.log(loadedThreads);
        setIsLoading(false);
      }
      fetchThreads();
    }
    ,[forceUpdate])




    if(isLoading) return (
    
    <Typography> loading...</Typography>
    
    )

    return(
      <>
      <Grid container spacing={0}>
        <Grid item xs={12} align="center" >
          <List sx={{ width: '100%', bgcolor: 'background.paper', padding: 0 }}>
            {threads.map((thread) => { 
              return(
                  <ThreadItem sx={{flexDirection: "row", flexWrap: "wrap"}} fullWidth>
                      
                    <ListItemAvatar>
                      <Avatar alt={thread.userInfo[0] ? thread.userInfo[0].username : ''} src={thread.userInfo[0].avatar} />
                    </ListItemAvatar>
                    <ThreadTitle sx={{marginLeft: -0.5, marginRight: 1}} component={Link} to={`/thread/${thread._id}`}>{thread.title}</ThreadTitle> 
                    <ThreadTitle sx={{marginLeft: -0.5, marginRight: 1}} component={Link} to={`/thread/${thread._id}`}>{thread.category}</ThreadTitle>                               
                              
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <ThreadContent display="inline" sx={{fontWeight: "800 !important"}}>
                            {thread.userInfo[0] ? thread.userInfo[0].username+":" : 'unknown user'}
                          </ThreadContent>
                          <ThreadContent display="inline"> 
                          {" " + thread.text}
                          </ThreadContent>
                        </React.Fragment>
                      }
                    />
                    <Box sx={{width: "100%", marginBottom: "-12px"}}><ThreadContent sx={{fontSize: 9, float: "right"}}>{thread.date}</ThreadContent></Box>
                  </ThreadItem>
              )
            })
          }
         
        </List>
      </Grid>
      
    </Grid>
    </>
    )
}