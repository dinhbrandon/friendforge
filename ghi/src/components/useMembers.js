import { useEffect, useState } from "react";

function useMembers({ token, groupId }) {
    const [members, setMembers] = useState([]);

    async function loadMembers() {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/group/${groupId}/members`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            setMembers(data);
        }
    }

    return;
}

export default useMembers;
