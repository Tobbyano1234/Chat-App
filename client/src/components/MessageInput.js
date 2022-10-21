import React, { useState } from 'react';
import './MessageInput.css';
const uuidv4 = require('uuid').v4;


const NewMessage = ({ socket }) => {
  const defaultUser = {
    id: localStorage.getItem("user"),
    name: localStorage.getItem("userName")
  };
  const [value, setValue] = useState({});

  const handleChange = (e) => {

    const message = {
      id: uuidv4(),
      user: defaultUser,
      value: e.currentTarget.value,
      time: Date.now()
    };
    setValue(message)
  }

  const submitForm = (e) => {
    e.preventDefault();
    socket.emit('message', value);
    setValue({});
  };

  return (
    <form onSubmit={submitForm}>
      <input
        id="input"
        defaultValue={value.value}
        autoFocus
        placeholder="Type your message"
        onChange={handleChange}
      />
    </form>
  );
};

export default NewMessage;

