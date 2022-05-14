import styled from '@emotion/styled';
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const ThreadItem = styled(ListItem)({
 
    '& ': {
      borderColor: 'black',
      backgroundColor: '#2F2F2F',
      borderWidth: 2,
      borderRadius: 20,
      padding: 15,
      marginBottom: 16,
      borderWidth: '10px',
      textAlign: "left",
    },
    
  });

  export const ThreadTitle = styled(Button)({
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

  export const ThreadCategory = styled(Button)({
    '& ': {
      color: "white",
      fontWeight: 900,
      paddingTop: 0,
      paddingBottom: 0,
      marginRight: 5,
      borderRadius: 15,
      minWidth: 0,
      backgroundColor: "#01BEFE",
      color: "#000000"
    },
    
  
  });

  export const ThreadContent = styled(Typography)({
    '& ': {
      color: "white",
      fontWeight: 500,
    },
  });

  export const ThreadAuthor = styled(Typography)({
    '& ': {
      color: "white",
      fontWeight: 800,
    },
  });

  export const PostItem = styled(ListItem)({
    '& ': {
        borderColor: 'black',
        backgroundColor: '#2F2F2F',
        borderWidth: 2,
        borderRadius: 20,
        padding: 15,
        marginBottom: 16,
        borderWidth: '10px',
        textAlign: "left",
      },
    
  
  });

export const PostTitle = styled(Button)({
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

export const PostContent = styled(Typography)({
    '& ': {
      color: "white",
      fontWeight: 500,
    },
    
  
  });

export const PostAuthor = styled(Typography)({
    '& ': {
      color: "white",
      fontWeight: 800,
    },
    
  
  });


export const LoginBox = styled(Box)({
  '& ': {
    borderColor: 'black',
    backgroundColor: '#2F2F2F',
    borderWidth: 2,
    borderRadius: "10%",
    padding: 25,
    marginTop: 0,
    marginBottom: 16,
    borderWidth: '10px',
    textAlign: "left",
  },
  
});

  export const ValidationTextField = styled(TextField)({
    '&': {
      marginTop: 3,
      marginBottom: 3,
      borderColor: 'white',
      color: 'white',
    },
    '& input':{
      color: 'white'
    },
    '& input:valid + fieldset': {
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: 20,
      color: 'white'
    },
    '& input:valid:hover + fieldset': {
      borderColor: 'white',
      borderRightWidth: 25,
      padding: '4px!important', 
      borderRadius: 20,
      color: "white"
    },
    '& input:valid:focus + fieldset': {
      borderColor: 'white',
      borderRightWidth: 25,
      paddingLeft: '4px', 
      borderRadius: 20,
      color: "white"
    },
    '& input:invalid + fieldset': {
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: 20,
      color: "white"
    },
  });

  export const ValidationTextFieldMultiline = styled(TextField)({
    '&': {
      marginTop: 3,
      marginBottom: 3,
      borderColor: 'white',
      color: 'white',
    },
    '& fieldset': {
      marginTop: 3,
      marginBottom: 3,
      borderColor: 'white',
      color: 'white',
    },
    '& input':{
      color: 'white',
      borderRadius: 20,
      borderColor: "white"
    },
    '& input:valid + fieldset': {
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: 20,
      color: 'white'
    },
    '& input:valid:hover + fieldset': {
      borderColor: 'white',
      borderRightWidth: 15,
      padding: '8px!important', 
      borderRadius: 20,
      color: "white"
    },
    '& input:valid:focus + fieldset': {
      borderColor: 'white',
      borderRightWidth: 15,
      paddingLeft: '5px', 
      borderRadius: 20,
      color: "white"
    },
    '& input:invalid + fieldset': {
      borderColor: 'white!important',
      borderWidth: 2,
      borderRadius: 20,
      color: "white"
    },
  });

  export const SubmitButton = styled(Button)({
    '& ': {
      borderColor: 'white',
      backgroundColor: "white",
      height: "30px",
      borderRadius: 0,
      textAlign: "left",
      marginTop: 3
    },
    
  });