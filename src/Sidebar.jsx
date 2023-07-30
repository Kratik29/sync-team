import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

import SidebarOption from "./SidebarOption";

import AddIcon from "@mui/icons-material/Add";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [Channels, setChannels] = useState([]);
  const [{ user }] = useStateValue();
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }))
      )
    );
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <div className="sidebar_info">
          <h2>heavy coder</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </div>
      </div>
      <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
      {Channels.map((Channel) => (
        <SidebarOption title={Channel.name} id={Channel.id} />
      ))}
    </div>
  );
}

export default Sidebar;
