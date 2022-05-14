import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { LoginBox } from "../styling";
import { SubmitButton } from "../styling"
import {ValidationTextField} from "../styling"
import { useDispatch, useSelector } from "react-redux";
import  {login}  from "../../actions/auth";
import { toggleLoginPrompt } from "../../actions/prompt";

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
export const LoginPrompt = () => {
  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();

  const { currentUser } = useSelector(state => state.auth);
  const { openLoginPrompt } = useSelector(state => state.prompt);
  const dispatch = useDispatch();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const handleClickOpen = () => {
    dispatch(toggleLoginPrompt(true));
  };
  const handleClose = () => {
    dispatch(toggleLoginPrompt(false));
  };


  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch( login(username, password) ).then(
        () => {
          dispatch(toggleLoginPrompt(false));
          setUsername("");setPassword("");setLoading(false);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };
  return (
      <Dialog
        open={openLoginPrompt}
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
        <LoginBox>
        <div id="loginprompt">
         
          <Form onSubmit={handleLogin} ref={form}>
              <ValidationTextField
                type="text"
                className="form-control"
                name="username"
                placeholder="uname"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            <div className="form-group">
              <ValidationTextField
                type="password"
                className="form-control"
                name="password"
                placeholder="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <SubmitButton fullWidth className="btn btn-primary btn-block" type="submit" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </SubmitButton>
            </div>
            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
        </div>
        </LoginBox>
        </Dialog>
  );
};
