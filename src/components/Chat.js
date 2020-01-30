import React, { useState } from "react";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useHistory,useLocation } from "react-router-dom";

import ScrollToBottom from "react-scroll-to-bottom";

import io from "socket.io-client";


const socket = io("https://server-chat-service.herokuapp.com/");


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

function Chat() {
  let location = useLocation();


  const classes = useStyles();
  const [message, setMessage] = useState({
    data: []
  });

  const [txtMessage, setTxtMessage] = useState({
    message: ""
  });

  const getValue = e => {
    
    const name = e.target.name;
    const value = e.target.value;
    setTxtMessage({
      ...txtMessage,
      [name]: value
    });
  };

  var i = 0;
  const sendMessage = e => {
    i++
    if (e.key === "Enter") {
      console.log(i)
      console.log(e.target.value);
      // Do code here
      console.log('enter')
      var txtmessage = e.target.value;
      if (txtmessage !== "") {
        console.log(location.state.username)
        socket.emit("message", { user: location.state.username, message: txtmessage });
        //var join = message.data.concat({ user: "Test", message: txtmessage });
        /*setMessage({
          data: join
        });*/
        setTxtMessage({
          message: ""
        });
      }
    }
  };

  socket.on("sendsmessages", socket => {
    var join = message.data.concat({ user: socket.user, message: socket.message });
    setMessage({
      data: join
    });
  });

  return (
    <div className="App">
      <h1>Chat</h1>

      <div className="chat">
        <div className="chat-content">
          <ScrollToBottom className="chat-message">
            {message.data.map((data, index) => (
              <div key={index}>
                <List className={classes.root}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/4.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={data.user}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            {data.message}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              </div>
            ))}
          </ScrollToBottom>
        </div>
        <TextField
          id="outlined-full-width"
          placeholder="Message"
          fullWidth
          margin="normal"
          variant="outlined"
          name="message"
          value={txtMessage.message}
          onChange={e => getValue(e)}
          onKeyPress={e => sendMessage(e)}
        />
      </div>
    </div>
  );
}

export default Chat;
