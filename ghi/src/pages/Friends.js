import MyFriends from "../components/friends/myFriends";
import PendingRequests from "../components/friends/pendingFriendRequests";
function Friends(){
    return (
        <div className="flex">
        <div className="w-1/8">
            <MyFriends />
        </div>
        <div className="w-1/2">
            <PendingRequests />
        </div>
        </div>
    );

}

export default Friends;

