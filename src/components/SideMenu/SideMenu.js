import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'

import Typography from '@mui/material/Typography'

import React, { useState, useEffect } from "react";

import {
  BrowserRouter,
  useParams,
  Routes,
  Route,
  Link
} from "react-router-dom";


export const SideMenu = () => {


    useEffect(() => {
      console.log("test");
    })
    

    const ThreadItem = styled(ListItem)({
 
        '& ': {
          borderColor: 'black',
          backgroundColor: '#2F2F2F',
          borderWidth: 2,
          borderRadius: 20,
          padding: 15,
          borderWidth: '10px',
          textAlign: "left",
        },
        
      });

      const ThreadTitle = styled(Button)({
        '& ': {
          color: "white",
          fontWeight: 900,
          paddingTop: 0,
          paddingBottom: 0,
          borderRadius: 15,
          minWidth: 0,
          backgroundColor: "#ffdd00",
          color: "#000000"
        },
        
      
      });

      const ThreadContent = styled(Typography)({
        '& ': {
          color: "white",
          fontWeight: 500,
          fontSize: 20
        },
        
      
      });

      const PostItem = styled(ListItem)({
        '& ': {
            borderColor: 'black',
            backgroundColor: '#2F2F2F',
            borderWidth: 2,
            borderRadius: 20,
            padding: 15,

            borderWidth: '10px',
            textAlign: "left",
          },
        
      
      });

    const PostTitle = styled(Button)({
        '& ': {
            color: "white",
            fontWeight: 900,
            paddingTop: 0,
            paddingBottom: 0,
            borderRadius: 15,
            minWidth: 0,
            backgroundColor: "#ffdd00",
            color: "#000000"
          },
      
      });

      const PostContent = styled(Typography)({
        '& ': {
          color: "white",
          fontWeight: 500,
        },
        
      
      });


    return(
      <div id="thread">
      <Box sx={{height: "100%"}}  display={{ xs: "none", sm: "none", md: "flex", lg: "flex"}}>
      <Grid sx={{height: "100%"}} container spacing={2}>

        <Grid sx={{display: "flex"}} item xs={0} sm={12} md={12} lg={12}>
                <ThreadItem id="ukraine" sx={{flexDirection: "column", display: "flex"}}>
                  <Box sx={{width: "100%"}}>
                    <Box sx={{backgroundColor: "#0057b7", height: 10}}/>
                    <Box sx={{backgroundColor: "#ffd700", height: 10}}/>
                  </Box>
                    <ThreadContent id="ukrainetitle">
                      Wspieraj ukrainę!
                    </ThreadContent>
                    <ThreadContent id="ukrainetext">
                      Lista aktualnie prowadzonych zbiórek dostępna na stronie supportforukraine.pl, na Twitterze: @supportforukraine oraz w lokalnych punktach szlachetnej paczki. Dziękujemy!
                    </ThreadContent>

                </ThreadItem>
        </Grid>

        <Grid sx={{display: "flex"}} item xs={12}> 
                <ThreadItem>
                    <ListItemText
                        secondary={
                            <React.Fragment>
                                <ThreadContent>
                                   The second side
                                </ThreadContent>
                                <ThreadContent>
                                   element will
                                </ThreadContent>
                                <ThreadContent>
                                   appear here
                                </ThreadContent>

                            </React.Fragment>
                        }
                    />
                </ThreadItem>
        </Grid>
        
        <Grid sx={{display: "flex"}} item xs={12}>
                <ThreadItem>
                    <ListItemText
                        secondary={
                            <React.Fragment>
                                <ThreadContent>
                                   The second side
                                </ThreadContent>
                                <ThreadContent>
                                   element will
                                </ThreadContent>
                                <ThreadContent>
                                   appear here
                                </ThreadContent>

                            </React.Fragment>
                        }
                    />
                </ThreadItem>
        </Grid>
    </Grid>
    </Box>
    </div>
    )
}