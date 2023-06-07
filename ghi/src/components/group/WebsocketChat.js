// import React, { useState, useEffect } from "react";
// import Message from "./Message";
// import useProfile from "../useProfile";

// function GroupChat({ groupId, token }) {
//     const [isConnected, setIsConnected] = useState(false);
//     const [messages, setMessages] = useState([]);
//     const [inputMessage, setInputMessage] = useState("");
//     const { profile } = useProfile(token);

//     const socket = new WebSocket(
//         `ws://localhost:8000/ws?group_id=${groupId}&profile_id=${profile.id}`
//     );

//     useEffect(() => {
//         if (profile.id) {
//             socket.onopen = () => {
//                 setIsConnected(true);
//             };

//             socket.onclose = () => {
//                 setIsConnected(false);
//             };

//             socket.onmessage = (event) => {
//                 const message = JSON.parse(event.data);
//                 setMessages((prevMessages) => [...prevMessages, message]);
//             };

//             return () => {
//                 socket.close();
//             };
//         }
//     }, [profile]);

//     const handleSendMessage = (e) => {
//         e.preventDefault();
//         if (inputMessage.trim() === "") {
//             return;
//         }

//         const message = {
//             profile_id: profile.id,
//             group_id: groupId,
//             content: inputMessage,
//         };

//         socket.send(JSON.stringify(message));
//         setInputMessage("");
//     };

//     return (
//         <div className="flex flex-col justify-center items-center p-100 w-4/5 h-full">
//             <div>
//                 <h1>Chat Room</h1>
//                 {isConnected ? <p>Connected</p> : <p>disconnected</p>}

//                 <div>
//                     {messages.map((message, index) => (
//                         <div key={index}>{message.content}</div>
//                     ))}
//                 </div>

//                 <form onSubmit={handleSendMessage}>
//                     <input
//                         type="text"
//                         value={inputMessage}
//                         onChange={(e) => setInputMessage(e.target.value)}
//                         className="input input-bordered w-4/5"
//                     />
//                     <button type="submit">Send</button>
//                 </form>
//             </div>
//             <div className="chat chat-start w-4/5">
//                 <div className="chat-image avatar">
//                     <div className="w-10 rounded-full">
//                         <img src="https://dummyimage.com/400x400/ff6a00/ffffff" />
//                     </div>
//                 </div>
//                 <div className="chat-header">Obi-Wan Kenobi</div>
//                 <div className="chat-bubble ">You were the Chosen One!</div>
//             </div>
//             <div className="chat chat-end w-4/5">
//                 <div className="chat-image avatar">
//                     <div className="w-10 rounded-full">
//                         <img src="https://dummyimage.com/400x400/ff6a00/ffffff" />
//                     </div>
//                 </div>
//                 <div className="chat-header">Anakin</div>
//                 <div className="chat-bubble">I hate you!</div>
//             </div>

//             <div className="join w-4/5 my-10">
//                 <textarea
//                     className="input join-item input input-bordered w-4/5"
//                     placeholder="message..."
//                 />
//                 <button className="btn btn-secondary join-item w-1/5">
//                     Send
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default GroupChat;
