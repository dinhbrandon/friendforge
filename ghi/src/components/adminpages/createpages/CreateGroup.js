import React, { useState } from 'react'

function CreateGroup() {
    const [focusId, setFocusId] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        const data = {};
        data.focus_id = focusId;

        const url = 'http://localhost:8000/groups'
        const NewFocusId ={
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }}

        const response = await fetch(url, NewFocusId)
        if (response.ok) {
            setFocusId('')
        }
    }

    const handleFocusId = (event) => {
        setFocusId(event.target.value)
    }

    return (
        <>
            <div className="admin.create">
                <div className="card-header">
                    <div className="log">Create new Group</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor='focusId'>Group</label>
                        <input type="number" id='focusId' value={focusId} onChange={handleFocusId} placeholder='focusId' name='focusId' required />
                    </div>
                    <div className="form-group">
                        <button>Create New</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateGroup
