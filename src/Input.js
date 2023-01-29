import {Component} from "react";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

class Input extends Component {
  state = {
    newMessageText: ""
  }

  editMessageText(e) {
    this.setState({newMessageText: e.target.value});
  }

  submitMessage(e) {
    e.preventDefault();
    this.setState({newMessageText: ""});
    this.props.onSendMessage(this.state.newMessageText);
  }

  render() {
    return (
      <div className="Input">
        <form onSubmit={e => this.submitMessage(e)}>
          <input
            onChange={e => this.editMessageText(e)}
            value={this.state.newMessageText}
            type="text"
            placeholder="Napiši svoju poruku ili pritisni enter"
            autoFocus={true}
          />
          <button>Pošalji <FontAwesomeIcon icon={faPaperPlane} /></button>
        </form>
      </div>
    );
  }
}

export default Input;