import React, { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function ForgeGroup() {
    const { token } = useAuthContext();
    const [focuses, setFocus] = useState([]);
    const [selectedFocus, setSelectedFocus] = useState("Select Focus");
    const navigate = useNavigate();

    async function loadFocuses() {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/group_focus`
        );
        if (response.ok) {
            const data = await response.json();
            setFocus(data);
        }
    }

    async function forgeSubmit(e) {
        e.preventDefault();
        if (selectedFocus === "Select Focus"){
            return;
        }

        const url = `${
            process.env.REACT_APP_API_HOST
        }/forge?focus_id=${parseInt(selectedFocus)}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            setSelectedFocus("Select Focus");
            navigate("/mygroups");
        } else {
            console.log("Could not fetch Forge API");
        }
    }

    useEffect(() => {
        loadFocuses();
    }, []);

    return (
        <>
            <form className="join" onSubmit={(e) => forgeSubmit(e)}>
                <select
                    className="select join-item"
                    onChange={(e) => setSelectedFocus(e.target.value)}
                >
                    <option>Select Focus</option>
                    {focuses.map((focus) => (
                        <option key={focus.id} value={focus.id}>
                            {focus.name}
                        </option>
                    ))}
                </select>
                <div className="indicator">
                    <button className="btn join-item" disabled={selectedFocus === "Select Focus"}>
                        Forge
                    </button>
                </div>
            </form>
        </>
    );
}

export default ForgeGroup;
