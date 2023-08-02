import React from "react";
import { useParams } from "react-router-dom";
import GroupMembers from "../components/group/GroupMembers";
import useToken from "@galvanize-inc/jwtdown-for-react";
import GroupChat from "../components/group/GroupChat";

function GroupHome() {
    const { token } = useToken();
    const { id } = useParams();
    return (
        <div className="flex">

            <GroupMembers token={token} groupId={id} />


            <GroupChat groupId={id} token={token} />
        </div>
    );
}

export default GroupHome;
