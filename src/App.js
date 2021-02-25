import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    text: {
      recipient: '',
      textmessage: '',
    },
  };

  handleForm = () => {
    this.setState({ recipient: '', textmessage: '' });
  };

  // Create for when user presses the button on the form, the text will be passed along
  sendText = () => {
    const { text } = this.state;

    // Pass variables within the query string
    fetch(
      `http://localhost:4000/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`
    ).catch((err) => console.error(err));
  };

  render() {
    const { text } = this.state;

    const spacer = {
      margin: '8px',
    };

    const textArea = {
      borderRadius: '4px',
    };

    return (
      <div className='App'>
        <form onSubmit={this.handleForm}>
          <div style={{ marginTop: 10 }}>
            <h2> Send Text Message </h2>
            <label> Your Phone Number </label>
            <br />
            <input
              value={text.recipient}
              onChange={(e) =>
                this.setState({ text: { ...text, recipient: e.target.value } })
              }
            />
            <div style={spacer} />
            <label> Message </label>
            <br />
            <textarea
              rows={3}
              value={text.textmessage}
              style={textArea}
              onChange={(e) =>
                this.setState({
                  text: { ...text, textmessage: e.target.value },
                })
              }
            />
            <div style={spacer} />
            <button onClick={this.sendText}> Send Text </button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
