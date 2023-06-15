import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function ForgeGroup() {
    const { token } = useToken();
    const [focuses, setFocus] = useState([]);
    const [selectedFocus, setSelectedFocus] = useState("");
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
        console.log(parseInt(selectedFocus));

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
            setSelectedFocus("");
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
                    <option disabled>Focus</option>
                    {focuses.map((focus) => (
                        <option key={focus.id} value={focus.id}>
                            {focus.name}
                        </option>
                    ))}
                </select>
                <div className="indicator">
                    <button className="btn join-item">
                        Forge
                    </button>
                </div>
            </form>
        </>
    );
}

export default ForgeGroup;
