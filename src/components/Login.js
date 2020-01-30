import React, { useState } from "react";
//import logo from './logo.svg';
import "../App.css";


import {useHistory} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

function Login() {
  //const socket = io('http://localhost:1337/');
  let history = useHistory();
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const classes = useStyles();

  function loginForm(e) {
    e.preventDefault();
    
    console.log(form.username,form.password)
    var username = form.username
    history.push(`/home`,{username})
  }

  const getValues = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    console.log(name, value);
    setForm({
      ...form,
      [name]: value
    })
    
  }

  return (
    <div className="App">
      <div>
        <h1>Enter to the Chat</h1>
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={e => loginForm(e)}
        >
          <TextField
            id="username"
            type="text"
            label="User Name"
            variant="outlined"
            name="username"
            value={form.username}
            onChange={getValues}
          />
          {/*<TextField
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            name="password"
            value={form.password}
            onChange={getValues}
          />*/}
          <br />
          <Button type="submit" variant="outlined">
            Sing Up
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
