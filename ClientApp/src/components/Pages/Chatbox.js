import React, { useState, useEffect } from 'react';
import '../Css/Chatbox.css';
import '../Css/EditUser.css';
import { NavMenu } from "../Components/NavMenu";
import axios from 'axios';

const RepairTable = ({ onRowButtonClick }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/repair')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log('Error retrieving repair data: ', error);
            });
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
                                        <button onClick={() => onRowButtonClick(item.id)}>Otwórz czat</button> 
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
            const currentDate = new Date();
            const newMessage = {
              //  id: messages.length + 1,
                content: inputValue,
                date: currentDate,
            };

            let msgId
            axios.post('/message', newMessage)
                .then(response => {
                    const createdMessage = response.data;
                    setMessages([...messages, newMessage]);
                    setInputValue('');

                    msgId=createdMessage
                })
                .catch(error => {
                    console.log('Error sending message: ', error);
                });

        }
    };



    const handleRowButtonClick = (RepairId) => {
        axios.get(`/repair/${RepairId}/messages`)
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.log('Error retrieving messages:', error);
            });
    };

    return (
        <>
            <RepairTable onRowButtonClick={handleRowButtonClick} />
            <div className="chatbox">
                <div className="messages">
                    {messages.map((message, index) => (
                        <div key={index} className="message">
                            {message.userId + ": " + message.content}
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
