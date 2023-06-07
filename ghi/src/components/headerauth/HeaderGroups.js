import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useProfile from "../useProfile";

function HeaderGroups() {
    const { token } = useToken();
    const { profile } = useProfile(token);
    const [groups, setGroups] = useState([]);
    const id = profile.id;

    async function loadGroups() {
        const response = await fetch(
            `${process.env.REACT_APP_API_HOST}/profile/${id}/groups`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            setGroups(data);
        }
    }

    useEffect(() => {
        if (token && id) {
            loadGroups();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, id]);

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-btn">
                My Groups
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52 z-[1]"
            >
                {groups.map((group) => {
                    return (
                        <li key={group.group_id}>
                            <a href={`/group/${group.group_id}`}>
                                {group.name || "A Group"}
                            </a>
                        </li>
                    );
                })}

                <li>
                    <a href="/mygroups">View All</a>
                </li>
            </ul>
        </div>
    );
}

export default HeaderGroups;
