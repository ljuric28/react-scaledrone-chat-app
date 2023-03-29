import {Component} from "react";
import React from "react";

class Messages extends Component {
  render() {
    const {messages} = this.props;
    return (
      <ul className="message-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    const {chatMember, text} = message;
    const {currentChatMember} = this.props;
    const isMessageMine = chatMember.id === currentChatMember.id;
    const className = isMessageMine ?
      "message currentChatMember" : "message";
    return (
      <li className={className}>
      <span
        className="avatar"
        style={{backgroundColor: chatMember.clientData.color}}
      />
        <div className="message-content">
          <div className="name">
            {chatMember.clientData.name}
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}

export default Messages;