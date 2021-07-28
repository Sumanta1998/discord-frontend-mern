import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Input } from "@material-ui/core";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import AlwaysScrollToBottom from "./scrollToBottom";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import db from "./firebase";
import firebase from "firebase";
import axios from "./axios";
import Pusher from "pusher-js";

const pusher = new Pusher("a031d64b72930255bdbd", {
  cluster: "ap2"
});

const Chat = () => {
  const elementRef = useRef();
  const channelId = useSelector(selectChannelId);
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const getConversation = (channelId) => {
    if (channelId) {
      axios.get(`/get/conversation?id=${channelId}`).then((res) => {
        setMessages(res.data[0].conversation);
      });
    }
  };
  useEffect(() => {
    
   
    const channel = pusher.subscribe("conversation");
    channel.bind("newMessage", function (data) {
   
      getConversation(channelId);
    });
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();   
    axios.post(`/new/message?id = ${channelId}`, {
      message: input,
      timestamp: Date.now(),
      user: user
    });
    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            key="key"
            timestamp={message.timestamp}
            user={message.user}
            message={message.message}
          />
        ))}
        <div ref={elementRef} />
      </div>
      <div className="chat__input">
        <AddCircleIcon />
        <form>
          <Input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
            className="chat__search"
          />
          <button
            type="submit"
            disabled={!channelId}
            className="chat__inputButton"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
