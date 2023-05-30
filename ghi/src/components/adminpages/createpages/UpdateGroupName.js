import React, { useEffect, useState } from "react";

function UpdateGroupName() {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [groups, setGroups] = useState([]);

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
        name,
        id,
        };

        const url = `http://localhost:8000/groups/${id}`;
        const NewName = {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        };

        const response = await fetch(url, NewName);
        if (response.ok) {
        setName("");
        }
    }

    const fetchData = async () => {
        const url = "http://localhost:8000/groups";
        const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();
        setGroups(data.groups);
        }
    };

    const handleGroupId = (event) => {
        setId(event.target.value);
    };

    const handleNewName = (event) => {
        setName(event.target.value);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <div className="admin.create">
            <div className="card-header">
            <div className="log">Update Group</div>
            </div>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                id="name"
                value={name}
                onChange={handleNewName}
                placeholder="name"
                name="name"
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="id">Group ID</label>
                <select
                value={id}
                onChange={handleGroupId}
                placeholder="id"
                className="form-select"
                name="id"
                >
                <option value="">Choose a Group ID</option>
                {groups?.map((group) => (
                    <option value={group.group_id} key={group.id}>
                    {group.id}
                    </option>
                ))}
                </select>
            </div>
            <div className="form-group">
                <button>Update Group</button>
            </div>
            </form>
        </div>
        </>
    );
}

export default UpdateGroupName;
