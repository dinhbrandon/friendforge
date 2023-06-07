import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";

function SelectInterests() {
    const { token } = useToken();
    const [interest, setInterest] = useState([]);

    async function loadInterest() {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/interests`
        );
        if (response.ok) {
            const data = await response.json();
            setInterest(data);
        }
    }

    useEffect(() => {
        loadInterest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get all checked interests
        const checkedInterests = interest.filter(
            (type) => document.getElementById(`interest-${type.id}`).checked
        );

        // Send individual POST requests for each checked interest
        checkedInterests.forEach(async (checkedInterest) => {
            const interest_id = checkedInterest.id;
            const interestData = {
                interest_id: interest_id,
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
                // Handle success
            } else {
                // Handle error
            }
        });
    };

    return (
        <form>
            <div>
                <h1 className="text-4xl my-5 text-primary">Interests</h1>
            </div>

            <div className="grid grid-cols-4 gap-5px grid-flow-row justify-center text-primary">
                {interest.map((type) => (
                    <div className="flex justify-center" key={type.id}>
                        <label className="justify-center label">
                            <span className="label-text mx-5 text-primary">
                                {type.name}
                            </span>
                            <input
                                type="checkbox"
                                id={`interest-${type.id}`}
                                className="checkbox checkbox-secondary"
                            />
                        </label>
                    </div>
                ))}
            </div>

            <div>
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </form>
    );
}

export default SelectInterests;
