import React from "react";

function GroupChat({ groupId }) {
  return (
    <div className="flex flex-col justify-center items-center p-100 w-4/5 h-full">
      <div className="chat chat-start w-4/5">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="https://dummyimage.com/400x400/ff6a00/ffffff" />
          </div>
        </div>
        <div className="chat-header">Obi-Wan Kenobi</div>
        <div className="chat-bubble ">You were the Chosen One!</div>
      </div>
      <div className="chat chat-end w-4/5">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="https://dummyimage.com/400x400/ff6a00/ffffff" />
          </div>
        </div>
        <div className="chat-header">Anakin</div>
        <div className="chat-bubble">I hate you!</div>
      </div>

      <div className="join w-4/5 my-10">
        <textarea
          className="input join-item input input-bordered w-4/5"
          placeholder="message..."
        />
        <button className="btn btn-secondary join-item w-1/5">Send</button>
      </div>
    </div>
  );
}

export default GroupChat;
