import useToken from "@galvanize-inc/jwtdown-for-react";
import useProfile from "../useProfile";

function RequestFriend() {
    const { token } = useToken();
    const { profile } = useProfile(token);

    
}