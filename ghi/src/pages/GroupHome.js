import React from "react";
import { useParams } from "react-router-dom";
import GroupMembers from "../components/group/GroupMembers";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import GroupChat from "../components/group/GroupChat";

function GroupHome() {
    const { token } = useAuthContext();
    const { id } = useParams();
    return (
        <div className="flex">

            <GroupMembers token={token} groupId={id} />


            <GroupChat groupId={id} token={token} />
        </div>
    );
}

export default GroupHome;
