import React, { useState, useEffect } from "react";
import useUser from "../useUser";
import useToken from "@galvanize-inc/jwtdown-for-react";


function ForgeGroup() {
  const { token } = useToken();
  const { user } = useUser(token);

  const [focuses, setFocus] = useState([]);
  const [selectedFocus, setSelectedFocus] = useState("")
  const [existingGroups, setExistingGroups] = useState([])


async function loadGroups() {
  const response = await fetch(`${process.env.REACT_APP_API_HOST}/groups`);
  if (response.ok) {
    const data = await response.json();
    console.log("Groups:", data)
    setExistingGroups(data);
  }
}


async function loadFocuses() {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/group_focus`);
    if (response.ok) {
      const data = await response.json();
      setFocus(data);
    }
    }

async function addMember(group_id) {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/group/member`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ group_id }),
    });
        if (response.ok) {
            console.log("Added to group:", group_id)
        } else {
            console.log("Failed to add member to group:", group_id)
        }
    }

  useEffect(() => {
    loadFocuses();
    loadGroups();
  }, []);

  const handleFocusChange = (event) => {
    setSelectedFocus(event.target.value);
  };

  const checkAndAddToGroup = async () => {
    console.log("Existing Groups:", existingGroups)
    let existingGroup = null;
    for (const group of existingGroups) {
      if (group.focus_id == selectedFocus && group.number_of_members < 5) {
        existingGroup = group;
        break;
      }
    }

    if (existingGroup) {
        await addMember(existingGroup.id);
        console.log("Added to existing group:", existingGroup)
    } else {
        const response = await fetch(`${process.env.REACT_APP_API_HOST}/groups`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,

            },
            body: JSON.stringify({ focus_id: selectedFocus }),
        });

        if (response.ok) {
            const newGroup = await response.json();
            console.log("Created new group:", newGroup)
            await addMember(newGroup.group_id);
            console.log("Profile added to new group:", newGroup);
            setExistingGroups([...existingGroups, newGroup]);
        } else {
            console.log("Failed to create new group.");
        }
    }

  }

    return (
    <>
    <div className="join">
        <select className="select join-item" onChange={handleFocusChange}>
            <option disabled selected>Focus</option>
            {focuses.map((focus) => (
            <option key={focus.id} value={focus.id}>
                {focus.name}
            </option>
            ))}
        </select>
        <div className="indicator">
            <button className="btn join-item" onClick={checkAndAddToGroup} disabled={!selectedFocus}>Forge</button>
        </div>
    </div>
    </>
  );
}

export default ForgeGroup;
