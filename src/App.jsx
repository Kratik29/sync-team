import React from "react";
import "./App.css";
import Chat from "./Chat";
import Login from "./Login";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <div className="sideset">
              <div className="app_body">
                <Sidebar />
              </div>
              <div className="routepath">
                <Routes>
                  <Route path="/room/:roomId" element={<Chat />} />
                  <Route path="/" element={<h1>Welcome</h1>} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
