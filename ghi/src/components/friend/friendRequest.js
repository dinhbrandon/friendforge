import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function FriendRequestForm() {
    const [message, setMessage] = useState("");

    async function sendFriendRequest(e, receiver_id) {
      e.preventDefault();

      const url = `${process.env.REACT_APP_API_HOST}/friendship/${receiver_id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        console.log("Successfully sent request")
      } else{
          console.log("Could not accept friend request");
      }

    return (
        <>
            <form
                className="form-control w-full"
                onSubmit={(e) => sendFriendRequest(e, member.id)}
            >
                <input
                    name="message"
                    type="text"
                    className="input input-bordered w-full my-2"
                    placeholder="Message"
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    className="btn btn-secondary my-2"
                    type="submit"
                    value="send"
                >
                    Send
                </button>
            </form>
        </>
    );
}

export default FriendRequestForm;
