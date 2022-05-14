import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import List from '@mui/material/List'
import styled from '@emotion/styled';
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar';

import React, { useState, useEffect } from "react";
import { ThreadTitle, ThreadItem } from '../styling';

import {
  BrowserRouter,
  useParams,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { authHeader } from '../../services/auth-header';


export const Profile = () => {

    const [profile, setProfile] = useState();
    const [recentThreads, setRecentThreads] = useState();
    const {username} = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        //will get profile
      const fetchProfile = async () =>{
        let loadedProfile = await fetch("/api/get/userProfile/" + username.toString(), {method: 'GET', headers: authHeader()})
        .then(response => response.json())
        .catch(error => {
          window.alert(error);
          return;
        });
     
        setProfile(loadedProfile);
        setIsLoading(false);
      }


      fetchProfile();
    }
    ,[])

    if(isLoading) return (<Typography> loading...</Typography>)

    return(
      <div id="thread">
      <Grid container spacing={2}>
        <Grid item xs={12}> 
            <List>
                <ThreadItem>
                  <Box>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={profile.avatar} sx={{width: "220px", height: "220px", margin: 2, marginRight: 4}} />
                    </ListItemAvatar>
                  </Box>
                  <Box>
                    <ThreadTitle sx={{fontSize: 30}} component={Link} to={`/user/${profile.user_id}`}>{profile.username}</ThreadTitle>
                       <Typography sx={{fontSize: 25, fontWeight: 700, color: "white"}}> joined in: {profile.join_date}</Typography>
                       <Typography sx={{fontSize: 25, fontWeight: 700, color: "white"}}> total posts: 2</Typography>
                       <Typography sx={{fontSize: 25, fontWeight: 700, color: "white"}}> total threads: 1</Typography>       
                  </Box>
                    
                </ThreadItem>

                <ThreadItem>
                  <Box>
                       <Typography sx={{fontSize: 25, fontWeight: 700, color: "white"}}> recent post 1</Typography>      
                  </Box>
                    
                </ThreadItem>

                <ThreadItem>
                  <Box>
                       <Typography sx={{fontSize: 25, fontWeight: 700, color: "white"}}> recent post 2</Typography>      
                  </Box>
                    
                </ThreadItem>

                <ThreadItem>
                  <Box>
                       <Typography sx={{fontSize: 25, fontWeight: 700, color: "white"}}> recent post 3</Typography>      
                  </Box>
                    
                </ThreadItem>

                
            </List>
        </Grid>
    </Grid>
    </div>
    )
}