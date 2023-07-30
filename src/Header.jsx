import React from "react";
import "./Header.css";
import { Avatar } from "@mui/material";

import { useStateValue } from "./StateProvider";
function Header() {
  const [{ user }] = useStateValue();
  return (
    <div className="header">
      <div className="header_left">
        <Avatar
          className="header_avatar"
          alt={user?.displayName}
          src={user?.photoURL}
        />
      </div>
    </div>
  );
}

export default Header;
