import React, { useState, useEffect } from "react";
import Message from "./Message";
// import EmojiPicker from "./EmojiPicker";
import useProfile from "../useProfile";
import "./chatbox.css";

function GroupChat({ groupId, token }) {
    const { profile } = useProfile(token);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    async function loadMessages() {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/messages/${groupId}`,
            {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            setMessages(data);
        }
    }

    useEffect(() => {
        if (groupId) {
            loadMessages();
        }
        const interval = setInterval(() => {
            loadMessages();
        }, 10000);

        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [groupId, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams({
            profile_id: profile.id,
            group_id: groupId,
            content: message,
        });
        const url = `${
            process.env.REACT_APP_API_HOST
        }/messages?${queryParams.toString()}`;
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ content: message }),
        };

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                setMessage("");
                loadMessages();
            } else {
                const errorResponse = await response.json();
                console.error(
                    "Failed to create message:",
                    response.status,
                    response.statusText,
                    errorResponse.detail
                );
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center p-100 w-4/5 h-full">
            <div
                className="flex flex-col justify-center items-center p-100 chat-fix"
                id="chatbox"
            >
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        message={message}
                        token={token}
                        profile={profile}
                    />
                ))}
            </div>
            <div className="join w-4/5 my-1 w-4/5">
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="join w-4/5 my-1 w-full"
                >
                    <textarea
                        className="input join-item input input-bordered w-5/6"
                        placeholder="message..."
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit" className="btn btn-secondary join-item w-1/6">
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}

export default GroupChat;
