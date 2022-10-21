import React from 'react';
import './ChatPage.css';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { mainAxios } from './Axios';




const ChatPage = ({ socket }) => {

    const [contactsRead, setContactsRead] = useState([])
    const [contacts, setContacts] = useState([]);
    const [message, setMessage] = useState("");
    const [recipient, setRecipient] = useState("");
    const [value, setValue] = useState({});
    const [chats, setChats] = useState([]);





    const scrollToRecent = () => {
        const chatBox = document.getElementById("messages");
        chatBox.scrollTop = chatBox.scrollHeight
    }

    const handleSearch = (e) => {

        let query = e.target.value;
       
       
        if (query.trim() === "") {
            setContacts(contactsRead)
        } else {
            const result = contactsRead.filter((contact) => {
                if (contact.firstname.toLowerCase().indexOf(query.toLowerCase().trim()) > -1) {
                    return true
                }
            });

            setContacts(result);
        }
    }
    const loadChats = async () => {
        try {
            const res = await mainAxios.post("chats/all", {
                sender_id: localStorage.getItem("user"),
                recipient_id: recipient
            });
            setChats(res.data.chats)

            return true;

        } catch (err) {

            throw err

        }
    }


    useEffect(() => {

        handleAllContactsLoad()

        socket.on('message', loadChats);

        socket.on('response', loadChats);

        scrollToRecent()

        return () => {
            socket.off('response');
            socket.off('message');
        };
    }, [chats]);


    const insertChatMessage = async () => {
       
        const userId = localStorage.getItem("user")
        if (recipient && (recipient !== userId) && message !== "") {
            try {
                const res = await mainAxios.post("chats/create", {
                    sender_id: userId,
                    recipient_id: recipient,
                    content: message
                });

                

            } catch (err) {
                throw err
            }
        }

    }

    const handleContactsLoad = async () => {


        try {
            const res = await mainAxios.post("chats/some", {
                user_id: localStorage.getItem("user")
            });
            const recentChats = new Set();
            let prevId = null;
            res.data.chats.forEach((chat) => {

                if (chat.id !== prevId) {
                    recentChats.add(chat)
                }
                prevId = chat.id;
            })

            setContacts(Array.from(recentChats))
        } catch (err) {
            throw err
        }

    }


    const findLatest = (contactId) => {

        const sortedAsc = chats.sort(
            (objA, objB) => Number(objB.createdAt) - Number(objA.createdAt),
        );

        for (let i = sortedAsc.length - 1; i >= 0; i--) {
            if (sortedAsc[i].sender_id === contactId || sortedAsc[i].recipient_id === contactId) {
                return sortedAsc[i].content;
            }
        }
    }
    const handleAllContactsLoad = async () => {


        try {
            const users = await mainAxios.get("users/all");
           

            for (let i = 0; i < users.data.record.length; i++) {
                users.data.record[i].content = findLatest(users.data.record[i].id)
            }
            setContacts(users.data.record)
            setContactsRead(users.data.record)

        } catch (err) {
            throw err
        }

    }

    const handleChatsLoad = async (e) => {

        const recipientId = e.currentTarget.getAttribute("data-id");

        const contactTabs = document.querySelectorAll('.contact');

        contactTabs.forEach(tab => {
            tab.classList.remove("active");
        });

        e.currentTarget.classList.add("active");
        setRecipient(recipientId)


        try {
            const res = await mainAxios.post("chats/all", {
                sender_id: localStorage.getItem("user"),
                recipient_id: recipientId
            });
            setChats(res.data.chats)
            scrollToRecent()
        } catch (err) {
            throw err
        }

    }

    const handleChange = (e) => {

        setMessage(e.target.value)
        
    }


    const submitForm = (e) => {
        e.preventDefault();

        insertChatMessage()

        scrollToRecent()

        docval: document.getElementById("input").value = ""
        setMessage("")


        socket.emit('message', 'my socket message');
        loadChats()

    };



    return (
        <div id="frame">
            <div id="sidepanel">

                <div id="profile">
                    <div className="wrap">
                        <img id="profile-img" src={localStorage.getItem("userAvatar")} className="online" alt />
                        <p>{localStorage.getItem("userName")}</p>
                        <i className="fa fa-chevron-down expand-button" aria-hidden="true" />
                        <div id="status-options">
                            <ul>
                                <li id="status-online" className="active"><span className="status-circle" /> <p>Online</p></li>
                                <li id="status-away"><span className="status-circle" /> <p>Away</p></li>
                                <li id="status-busy"><span className="status-circle" /> <p>Busy</p></li>
                                <li id="status-offline"><span className="status-circle" /> <p>Offline</p></li>
                            </ul>
                        </div>
                        <div id="expanded">
                            <label htmlFor="twitter"><i className="fa fa-facebook fa-fw" aria-hidden="true" /></label>
                            <input name="twitter" type="text" defaultValue="mikeross" />
                            <label htmlFor="twitter"><i className="fa fa-twitter fa-fw" aria-hidden="true" /></label>

                            <input name="twitter" type="text" defaultValue="ross81" />
                            <label htmlFor="twitter"><i className="fa fa-instagram fa-fw" aria-hidden="true" /></label>
                            <input name="twitter" type="text" defaultValue="mike.ross" />
                        </div>
                    </div>
                </div>

                <div id="search">
                    <label htmlFor><i className="fa fa-search" aria-hidden="true" /></label>
                    <input onChange={handleSearch} type="text" placeholder="Search contacts..." />
                </div>
                <div id="contacts">
                    <ul>
                        {

                            contacts.map((contact, index) => {
                                return (
                                    contact.id !== localStorage.getItem("user") ?

                                        <li key={index} data-id={contact.id} onClick={handleChatsLoad} className="contact">
                                            <div className="wrap">
                                                <span className="contact-status online" />
                                                <img src={contact.avatar} alt />

                                                <div className="meta">
                                                    <p className="name">{contact.firstname + " " + contact.lastname}</p>
                                                    <p className="preview">{findLatest(contact.id)}</p>
                                                </div>
                                            </div>
                                        </li>

                                        : null

                                )

                            })

                        }

                    </ul>
                </div>
            </div>
            <div id="chat-content" className="content">

                <div id="messages" className="messages">

                    <ul>
                        {
                            chats.map((chat, index) => {
                                return (
                                    (chat.recipient_id === localStorage.getItem("user"))
                                        ?
                                        <li key={index} className="sent">
                                            <img src={chat.avatar} alt="avatar" />
                                            <p>{chat.content}</p>
                                        </li>
                                        :
                                        <li key={index} className="replies">
                                            <img src={chat.avatar} alt="avatar" />
                                            <p>{chat.content}</p>
                                        </li>
                                )
                            })
                        }


                    </ul>

                </div>

                <div className="message-input">
                    <div className="wrap">
                        {/* <input type="text" placeholder="Write your message..." />
                        <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true" /></button> */}

                        <form onSubmit={submitForm}>
                            <input
                                type="text"
                                id="input"
                                defaultValue={message}
                                autoFocus
                                placeholder="Write your message..."
                                onChange={handleChange}
                            />
                            <button className="submit"><i className="fa fa-paper-plane" aria-hidden="true" /></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>



    )
}


export default ChatPage






























































































