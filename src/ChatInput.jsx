import React, { useState, useEffect } from "react";
import "./ChatInput.css";

import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (channelId) {
      const unsubscribe = db
        .collection("rooms")
        .doc(channelId)
        .collection("message")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

      return () => {
        unsubscribe();
      };
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId && input.trim() !== "") {
      db.collection("rooms")
        .doc(channelId)
        .collection("message")
        .add({
          message: input,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          user: user.displayName,
          userImage: user.photoURL,
        })
        .then(() => {
          setInput("");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };
  const deleteMessage = (messageId) => {
    db.collection("rooms")
      .doc(channelId)
      .collection("message")
      .doc(messageId)
      .delete()
      .catch((error) => {
        console.log(error.message);
      });
  };

  const editMessage = (messageId, newMessage) => {
    db.collection("rooms")
      .doc(channelId)
      .collection("message")
      .doc(messageId)
      .update({
        message: newMessage,
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const EditableMessage = ({ messageId, currentMessage }) => {
    const [editedMessage, setEditedMessage] = useState(currentMessage);
    const [editMode, setEditMode] = useState(false);

    const handleSave = () => {
      if (editedMessage.trim() !== "") {
        editMessage(messageId, editedMessage);
      }
      setEditMode(false);
    };
    return (
      <div>
        {editMode ? (
          <div>
            <input
              type="text"
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <div className="message_text">{currentMessage}</div>

            <button
              className="button_edt_del"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="chatInput">
      {messages.map((message, index) => (
        <div key={index}>
          {/* {message} */}
          <div className="message_user">
            <img
              className="message_userImage"
              src={message.userImage}
              alt="User"
            />
            {message.user}{" "}
            {message.timestamp &&
              new Date(message.timestamp.toDate()).toUTCString()}
          </div>{" "}
          {/* <br /> */}
          {user.displayName === message.user ? (
            <EditableMessage
              messageId={message.id}
              currentMessage={message.message}
            />
          ) : (
            <div className="message_text">{message.message}</div>
          )}
          {user.displayName === message.user && (
            <button
              className="button_edt_del"
              onClick={() => deleteMessage(message.id)}
            >
              Delete
            </button>
          )}
        </div>
      ))}
      <div className="message_input">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName?.toLowerCase()}`}
          />
          <button type="submit" onClick={sendMessage}>
            send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInput;
