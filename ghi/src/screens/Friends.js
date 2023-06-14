import MyFriends from "../components/friend/myFriends";
import PendingRequests from "../components/friend/pendingFriendRequests";
function Friends(){
    return (
        <div className="flex">
        <div className="w-1/2">
            <MyFriends />
        </div>
        <div className="w-1/2">
            <PendingRequests />
        </div>
        </div>
    );

}

export default Friends;

