import React, { useState } from 'react';
import PropTypes from 'prop-types';

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


export const LoginPrompt = (props) => {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    async function loginUser(credentials) {
        return fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
          .then(data => data.json())
       }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        props.setToken(token);
      }

    return(
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>



    )
}
LoginPrompt.propTypes = {
  setToken: PropTypes.func.isRequired
}