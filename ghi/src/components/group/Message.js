import React, { useState, useEffect } from "react";

function Message({ message, token, profile }) {
    const [sender, setSender] = useState([]);
    const [senderAccount, setSenderAccount] = useState([]);

    const getSender = async () => {
        const res = await fetch(
            `${process.env.REACT_APP_API_HOST}/profile/${message.profile_id}`,
            {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (res.ok) {
            const data = await res.json();
            setSender(data);
        }
    };

    const getSenderAccount = async () => {
        const res = await fetch(
            `${process.env.REACT_APP_API_HOST}/users/${sender.user_account_id}`,
            {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (res.ok) {
            const data = await res.json();
            setSenderAccount(data);
        }
    };

    useEffect(() => {
        getSender();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (sender.user_account_id !== undefined) {
            getSenderAccount();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sender]);

    if (profile.id === message.profile_id) {
        return (
            <div className="chat chat-end w-4/5">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src={sender.profile_photo} alt="user" />
                    </div>
                </div>
                <div className="chat-header">
                    {senderAccount.first_name} {senderAccount.last_name}
                </div>
                <div className="chat-bubble">{message.content}</div>
            </div>
        );
    }

    if (profile.id !== message.profile_id) {
        return (
            <div className="chat chat-start w-4/5">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src={sender.profile_photo} alt="user" />
                    </div>
                </div>
                <div className="chat-header">
                    {senderAccount.first_name} {senderAccount.last_name}
                </div>
                <div className="chat-bubble ">{message.content}</div>
            </div>
        );
    }
}

export default Message;
