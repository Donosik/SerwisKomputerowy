import React, { useState } from 'react';
import '../Css/Chatbox.css';
import '../Css/EditUser.css';
import { NavMenu } from "../Components/NavMenu";

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

    const tableData = [
        { id: 1, data1: 'Data1', data2: 'Data2', data3: 'Data3' },
        { id: 2, data1: 'Data4', data2: 'Data5', data3: 'Data6' },
    ];

    const handleRowButtonClick = (rowId) => {
        console.log('Button pressed for ID: ', rowId);
    }

    return (
        <>
            <NavMenu />
            <div className="chatbox-container">
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Header1</th>
                                <th>Header2</th>
                                <th>Header3</th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.data1}</td>
                                    <td>{row.data2}</td>
                                    <td>{row.data3}</td>
                                    <td>
                                        <button class="button-class" onClick={() => handleRowButtonClick(row.id)}>Przycisk</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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
        </div>
            </>
    );
}

export default Chatbox;
