import React, { useState } from 'react';
import '../Css/Chatbox.css';
import {NavMenu} from "../Components/NavMenu";





function Chatbox() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            const newMessage = {
                id: messages.length + 1,
                text: inputValue,
            };

            setMessages([...messages, newMessage]);
            setInputValue('');
        }
    };

    return (
        <>
            <NavMenu />
        <div className="chatbox">
            <div className="messages">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
            </>
    );
}

export default Chatbox;
