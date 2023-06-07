import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useProfile from "../useProfile.js";


function ForgeGroup() {
  const { token } = useToken();
  const { profile } = useProfile(token);
  

  const [focuses, setFocus] = useState([]);
  const [selectedFocus, setSelectedFocus] = useState("")



async function loadFocuses() {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/group_focus`);
    if (response.ok) {
      const data = await response.json();
      setFocus(data);
      // console.log(data)
    }
    }
// console.log(selectedFocus)
async function forgeSubmit(e) {
    e.preventDefault()
    console.log(parseInt(selectedFocus))
    const focusData = {
      focus_id: parseInt(selectedFocus)
    }
    // console.log(focusData)
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/forge`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(focusData),
    });
        if (response.ok) {
            setSelectedFocus()
            console.log(selectedFocus)
        } else {
            console.log("Could not post to Forge API")
        }
    }

  useEffect(() => {
    if (profile) {
      loadFocuses();
    }
  }, [profile]);

    return (
    <>
    <form className="join" onSubmit={(e) => forgeSubmit(e)}>
        <select className="select join-item" onChange={(e) => setSelectedFocus(e.target.value)}>
            <option disabled selected>Focus</option>
            {focuses.map((focus) => (
            <option key={focus.id} value={focus.id}>
                {focus.name}
            </option>
            ))}
        </select>
        <div className="indicator">
            <button className="btn join-item" disabled={!selectedFocus}>Forge</button>
        </div>
    </form>
    </>
  );
}

export default ForgeGroup;
