// import React, { useState } from "react";

// function SendMessage({ groupId, token, profile }) {
//     const [message, setMessage] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const queryParams = new URLSearchParams({
//             profile_id: profile.id,
//             group_id: groupId,
//             content: message,
//         });
//         const url = `${
//             process.env.REACT_APP_API_HOST
//         }/messages?${queryParams.toString()}`;
//         const requestOptions = {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({ content: message }),
//         };

//         try {
//             const response = await fetch(url, requestOptions);
//             if (response.ok) {
//                 setMessage("");
//             } else {
//                 const errorResponse = await response.json();
//                 console.error(
//                     "Failed to create message:",
//                     response.status,
//                     response.statusText,
//                     errorResponse.detail
//                 );
//             }
//         } catch (error) {
//             console.error("Network error:", error);
//         }
//     };

//     return (
//         <div className="join w-4/5 my-10 w-4/5">
//             <form onSubmit={(e) => handleSubmit(e)}>
//                 <textarea
//                     className="input join-item input input-bordered w-4/5"
//                     placeholder="message..."
//                     id="message"
//                     name="message"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <button className="btn btn-secondary join-item w-1/5">
//                     Send
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default SendMessage;
