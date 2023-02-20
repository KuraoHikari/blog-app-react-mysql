import React from 'react';
import { ChatBar, ChatBody, ChatFooter } from '../components';

const ChatPage = ({ socket }) => {
  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatPage;
