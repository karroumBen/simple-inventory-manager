import { useState, useEffect } from 'react';
import OpenAIService from '../services/OpenAIService';
import '../css/Chatbot.css';

function Chatbot() {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  async function submitHandler(e) {
    e.preventDefault();
    let newMessages = [];
    // add user input to messages
    newMessages.push(
      {
        type: 'incoming',
        message: userInput
      }
    );      
    
    // get response from openAI
    const res = await OpenAIService.getAnswer(userInput);
    if (res) {
      const message = res.choices[0].message;
      newMessages.push(
        {
          type: 'outgoing',
          message: message.content,
        }
      ); 
    } else {
      newMessages.push(
        {
          type: 'outgoing',
          message: 'Oop! Something wrong happens.'
        }
      );      
    }
    setMessages([...messages, ...newMessages]);

    // clear input
    setUserInput('');
  }

  useEffect(() => {
    setMessages([...messages,
    {
      type: 'outgoing',
      message: "Hi there 👋How can I help you today?"
    }
    ]);
  }, [])
  
  const sendMessage = (e) => {
    submitHandler(e);
  }
  const changeInput = (e) => setUserInput(e.target.value);

  return (
    <div className='chatbot'>
      <form onSubmit={submitHandler}>
        <header>
          <h2>Chatbot</h2>
        </header>

        <ul className="chatbox">
          {messages.map((obj, index) => (
            <li key={index} className={`chat ${obj.type}`}><p>{obj.message}</p></li>
          ))}
        </ul>
        <div className='chat-input'>
          <input value={userInput} type='text' name="userInput" placeholder="Enter a message..."
            onChange={changeInput} />
            <button className='btn small' onClick={sendMessage}>Send</button>
        </div>
      </form>
    </div>
  )
}

export default Chatbot;
