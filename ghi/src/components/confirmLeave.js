import React from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useProfile from "./useProfile";

function ConfirmLeave({ group, onCancel, onConfirm }) {
    const { token } = useToken();
    const { profile, updateProfile } = useProfile(token);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await leaveGroup(group.id);
    };

    const leaveGroup = async (group_id) => {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/groups/${group_id}/members/${profile.id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.ok) {
            updateProfile();
            onConfirm(group_id);
        }
    };

    return (
        <dialog open className="modal-box bg-primary">
            <button className="btn btn-sm btn-circle btn-white absolute right-2 top-2" onClick={onCancel}>
                ✕
            </button>
            <p className="text-white">Are you sure you want to leave "{group.name}"?</p>
            <form onSubmit={handleSubmit}>
                <button className="btn btn-sm btn-ghost text-white" type="submit">Yes</button>
                <button className="btn btn-sm btn-ghost text-white" type="button" onClick={onCancel}>No</button>
            </form>
        </dialog>
    );
}

export default ConfirmLeave;
