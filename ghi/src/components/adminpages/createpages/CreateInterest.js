import React, { useState } from "react";

function CreateInterest() {
    const [name, setName] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            name,
        };

        const url = `${process.env.REACT_APP_API_HOST}/interests`;
        const newInterest = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, newInterest);
        if (response.ok) {
            setName("");
        }
    }

    const handleName = (event) => {
        setName(event.target.value);
    };

    return (
        <>
            <div className="admin.create">
                <div className="card-header">
                    <div className="log">Create new Interest</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleName}
                            placeholder="name"
                            name="name"
                            required
                            className="input input-primary"
                        />
                    </div>

                    <div className="form-group">
                        <button>Create New</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateInterest;
