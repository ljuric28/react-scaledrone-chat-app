import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import Messages from "./Messages";
import Input from "./Input";

function randomName() {
  const firstNames = [
    "Jaci","Maira","Kayleen","Anne","Charlie","Tyra","Kristyn","Miriam","Trista","Santana","Aron","Tionna","Addie","Sonya","Frank","Ayden","Kirsten","Malik","Vicente","Austen","Elliot","Trae","Diego","Alijah","Trevin","Celine","Kaitlyn","Riley","Dion","Claudio"
  ];
  const lastNames = [
    "Draper","Cramer","Sparks","Gill","Canales","Minter","Prado","Dow","Vitale","Ponce","Lambert","Borges","Potter","Norman","Schweitzer","Whitmore","Bonilla","Burdette","Monk","Barksdale","Rizzo","Freed","Headley","Bowman","Aranda","Negron","Baron","Sumner","Broughton","Bridges"
  ];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return firstName + " " + lastName;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    chatMember: {
      name: randomName(),
      color: randomColor(),
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("n2Xz5nXDTCVdDrVh", {
      data: this.state.chatMember
    });
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const chatMember = {...this.state.chatMember};
      chatMember.id = this.drone.clientId;
      this.setState({chatMember});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, chatMember) => {
      const messages = this.state.messages;
      messages.push({chatMember, text: data});
      this.setState({messages});
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1><FontAwesomeIcon icon={faPaw} /> Dog owners Chat App</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentChatMember={this.state.chatMember}
        />
        <Input
          onSendMessage={this.sendMessage}
        />
      </div>
    );
  }

  sendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message
    });
  }

}

export default App;