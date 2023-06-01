import React from 'react';
import { useParams } from 'react-router-dom';


function ChatRoom() {
  const [username, setUsername] = React.useState('');
//   const [usernameInput, setUsernameInput] = React.useState('');
  const [input, setInput] = React.useState('');
  const [socket, setSocket] = React.useState();
  const [messages, setMessages] = React.useState([]);

  const { id: roomId } = useParams();

  React.useEffect(() => {
    console.log("Test1")
    const getMessages = async () => {
      const res = await fetch(`${process.env.REACT_APP_MESSAGE_API_HOST}/api/messages/${roomId}`);
      if (res.ok) {
        const results = await res.json();
        setMessages(results || []);

      }
    }
    getMessages();
  }, [roomId]);

  React.useEffect(() => {
    // if (!username) { return; }

    if (socket) {
      socket.close()
    }

    const socketUrl = `${process.env.REACT_APP_WS_HOST}/chatroom/${roomId}`;
    const websocket = new WebSocket(socketUrl);

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.room_id === roomId) {
        setMessages(prev => [...prev, message]);
      }
    };

    setSocket(websocket);

    return () => {
      websocket.close();
    }
  }, [roomId]);

//   const handleUsernameChange = () => {
//     setUsername(usernameInput);
//     console.log(username)
//   }

//   const handleUsernameInputChange = (e) => {
//     setUsernameInput(e.target.value);
//   }

  const handleInputChange = (e) => {
    setInput(e.target.value);
  }

  const handleSendMessage = () => {
    // if (!username) { return; }

    socket.send(JSON.stringify({ username, room_id: roomId, input }));
    setInput('');
  }

  return (
    <div className="container my-4">
      <p>welcome to chat room {roomId}</p>
      {/* <label>enter your username</label><input type="text" value={usernameInput} onChange={handleUsernameInputChange} /> */}
      {/* <button onClick={handleUsernameChange}>set username</button> */}
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', width: '60%', margin: 'auto' }}>
        {messages.map(m => (
          <div key={m.id}>{m.input}</div>
        ))}
        <input type="text" value={input} onChange={handleInputChange} placeholder="new message" />
        <button onClick={handleSendMessage}>send</button>
      </div>
    </div>
  );
}

export default ChatRoom;
