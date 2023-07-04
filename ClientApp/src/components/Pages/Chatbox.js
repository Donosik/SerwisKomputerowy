import React, { useState, useEffect } from 'react';
import '../Css/Chatbox.css';
import '../Css/EditUser.css';
import { NavMenu } from "../Components/NavMenu";
import axios from 'axios';

const RepairTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/repair')
            .then(response => {
                setData(response.data);
            })
    }, []);

    return (
        <>
            <NavMenu />
            <p className='services-title'> WIADOMOŚCI </p>
            <div className="chatbox-container">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>ID Naprawy</th>
                                <th>Imie</th>
                                <th>Nazwisko</th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.client.firstName}</td>
                                    <td>{item.client.lastName}</td>
                                    <td>
                                       
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
    }

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

    const handleRowButtonClick = (rowId) => {
        console.log('Button pressed for ID: ', rowId);
    }

    return (
        <>
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
