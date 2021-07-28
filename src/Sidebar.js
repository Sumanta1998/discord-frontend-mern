import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";
import IconButton from "@material-ui/core/IconButton";

import axios from "./axios";
import Pusher from "pusher-js";

// For Mongo
const pusher = new Pusher("a031d64b72930255bdbd", {
  cluster: "ap2"
});

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);
  console.log(channels);

  const getChannels = () => {
    axios.get("get/channelList").then((res) => {
      setChannels(res.data);
    });
  };

  useEffect(() => {
    getChannels();
    const channel = pusher.subscribe("channels");
    channel.bind("newChannel", function (data) {
      getChannels();
    });
  }, []);

  const handleAddChannel = (e) => {
    e.preventDefault();

    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      axios.post("/new/channel", {
        channelName: channelName
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h4>Channels</h4>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="siderbar__header">
            <IconButton className="iconBtn">
              <ExpandMoreIcon />
            </IconButton>
            <h4>Text Channels</h4>
          </div>

          <IconButton className="iconBtn">
            <AddIcon
              onClick={handleAddChannel}
              className="sidebar__addChannel"
            />
          </IconButton>
        </div>
        <div className="sidebar__channelslist">
          {channels.map((channel) => (
            <SidebarChannel
              key={channel.id}
              id={channel.id}
              channelName={channel.name}
            />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h5>Voice Connected</h5>
          <h6>Stream</h6>
        </div>
        <div className="sidebar__voiceIcons">
          <IconButton className="iconBtn">
            <InfoOutlinedIcon />
          </IconButton>
          <IconButton className="iconBtn">
            <CallIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar src={user.photo} />
        <div className="sidebar__profileInfo">
          <h5>{user.displayName}</h5>
          {/* <h6>{user.uid.substring(0, 6)}</h6> */}
        </div>
        <div className="sidebar__profileIcons">
          <IconButton className="iconBtn">
            <MicIcon />
          </IconButton>
          <IconButton className="iconBtn">
            <HeadsetIcon />
          </IconButton>
          <IconButton className="iconBtn">
            <ExitToAppIcon onClick={() => auth.signOut()} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
