import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = { text: prompt, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setPrompt('');
    setLoading(true);

    try {
      const res = await axios.post('https://chatwithai-6665.onrender.com/generate', { prompt });
      const aiMessage = { text: res.data.response, user: false };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Error calling the server:', error);
      const errorMessage = { text: 'Error: Unable to fetch response', user: false };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div>
      <div style={{ display: 'flex', marginLeft: '15px', marginTop: '15px' }}>
        <h3 style={{textAlign : 'left',marginLeft : '20px', color : 'lightslategray'}}>ChatWithAI</h3>
        <img src='./images/mm.png' style={{width : '30px',height : '30px', paddingLeft: '5px', marginTop: '5px'}} alt=''/>
      </div>
    <div className="App">
      
      
      <div className="chat-container">
        {messages.length === 0 && (
          <center>
          <img src='./images/cc.png' alt='' style={{width: '50px', height: '50px',marginTop: '200px'}}/>
          </center>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user ? 'user' : 'ai'}`}
            dangerouslySetInnerHTML={{ __html: message.text }}
          />
        ))}
        {loading && (
          <div className="message ai">
            <ScaleLoader color={"#123abc"} loading={loading} />
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Drop your message here"
          required
        />
        {prompt.length > 0 && (
          <img src='./images/ta.png' style={{width : '45px', height : '45px',cursor: 'pointer'}}
              onClick={handleSubmit} alt=''/>
        )}
      </form>

      
    </div>
    </div>
  );
}

export default App;
