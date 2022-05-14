import React, { useState, useContext } from 'react';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Thread } from './components/Thread/Thread';
import { RecentThreads } from './components/RecentThreads/RecentThreads';
import { ThreadCreator } from './components/ThreadCreator/ThreadCreator';
import { LoginPrompt } from './components/LoginPrompt/LoginPrompt';
import {SideMenu} from './components/SideMenu/SideMenu';
import {Profile} from './components/Profile/Profile';

import AppBar from './components/Appbar';
import Footer from './components/Footer';

import './App.css';

function App() {

  return(
    <BrowserRouter>
    <div className="App">
      <Box sx={{marginTop: 1, paddingLeft: 2, paddingRight: 2 }}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} align="center">
            <AppBar />
          </Grid>
        </Grid>
      </Box>
      <Box mt={2} sx={{paddingLeft: 2, paddingRight: 2}}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} sm={12} md={10} lg={10}>
            <Routes>
              <Route path="/" element={<RecentThreads/>}/>
              <Route path="/thread/:id" element={<Thread/>}/>
              <Route path="/profile/:username" element={<Profile/>}/>
              <Route path="/tos" element={<></>}/>
            </Routes>
          </Grid>
          <Grid item xs={0} sm={0} md={2} lg={2}>
            <Box sx={{height: "100%", display: "flex" }}>
            <SideMenu/>
            </Box>
          </Grid>
        </Grid>
          <Grid item xs={12} align="center">
            <Footer/>
          </Grid>
      </Box>
    <LoginPrompt/>
    <ThreadCreator/>
    </div>
    </BrowserRouter>
  );
}

export default App;
