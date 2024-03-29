import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';

import './Messages.css';

const Messages = (props) => {
  const { messages, name } = props;
  return (
    <ScrollToBottom>
      {messages.map((message, i) => {
        return (
          <div key={i}>
            <Message message={message} name={name} />
          </div>
        );
      })}
    </ScrollToBottom>
  );
};

export default Messages;
