import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useProfile from "./useProfile";

function InterestDropdown() {
    const { token } = useToken();
    const { profile, updateProfile } = useProfile(token)
    const [interests, setInterests] = useState([]);
    const [selectedInterest, setSelectedInterest] = useState("Select Interests");

    async function loadInterest() {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/interests`
        );
        if (response.ok) {
            const data = await response.json();

            // Exclude interests that are already in the profile
            const profileInterestNames = profile.interests ? profile.interests.map(interest => interest.name) : [];
            const filteredData = data.filter(type => !profileInterestNames.includes(type.name))

            setInterests(filteredData);
        }
    }

    useEffect(() => {
        loadInterest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile.interests]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedInterest !== "Select") {
            const interestData = {
                interest_id: selectedInterest,
            };

            const response = await fetch(
                `${process.env.REACT_APP_API_HOST}/profile/interests`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(interestData),
                }
            );

            if (response.ok) {
                // Update the profile now that a new interest has been added.
                updateProfile();
            }
        }
    };

    const deleteInterest = async (junction_id) => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/profile/interests/${junction_id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            }
        );

        if (response.ok) {
            updateProfile();
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="modal-box">
                <select 
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" 
                    onChange={(e) => setSelectedInterest(e.target.value)}
                >
                    <option className="">Select Interests</option>
                    {interests.map((interest) => (
                        <option key={interest.id} value={interest.id}>
                            {interest.name}
                        </option>
                    ))}
                </select>

                <div className="flex justify-center space-x-4 mt-4">  
                    <button type="submit" className="bg-primary text-white font-bold py-2 px-4 rounded">
                        Add Interest
                    </button>
                    <button 
                        className="bg-primary text-white font-bold py-2 px-4 rounded" 
                        onClick={() => {
                            window.my_modal_3.close();
                            window.location.reload();
                        }}>
                        Done
                    </button>
                </div>
                <ul className="grid grid-cols-3 mt-4">
                    {profile.interests?.map((interest, index) => (
                        <li key={index} className="flex badge badge-outline py-1 px-2 text-white mt-2">
                            {interest.name}
                            <button 
                                onClick={() => deleteInterest(interest.user_profile_interest_id)}
                                className="badge badge-sm">
                                x
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </form>
    );
}

export default InterestDropdown;
