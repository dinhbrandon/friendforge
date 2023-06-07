import React from "react";
import { useParams } from "react-router-dom";
import GroupMembers from "../components/group/GroupMembers";
import useToken from "@galvanize-inc/jwtdown-for-react";
import GroupChat from "../components/group/GroupChat";

function GroupHome() {
    const { token } = useToken();
    const { id } = useParams();
    // const [group, setGroup] = useState([]);

    // async function loadGroup() {
    //     const response = await fetch(
    //         `${process.env.REACT_APP_API_HOST}/groups/${id}`,
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         }
    //     );
    //     if (response.ok) {
    //         const data = await response.json();
    //         setGroup(data);
    //     }
    // }

    // useEffect(() => {
    //     if (token) {
    //         loadGroup();
    //     }
    // }, [token]);

    return (
        <div className="flex">
            {/* left user list */}
            <GroupMembers token={token} groupId={id} />

            {/* right group body */}
            <GroupChat groupId={id} token={token} />
        </div>
    );
}

export default GroupHome;
