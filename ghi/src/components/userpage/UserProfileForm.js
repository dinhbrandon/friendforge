import useToken from "@galvanize-inc/jwtdown-for-react";
import useProfile from "../useProfile";

const UserPage = () => {
    const { token } = useToken();
    const { profile } = useProfile(token);

    return (
        <>
            <div className="top-body">
                <h1>{profile.username}</h1>
            </div>
            <div className="img-prof">
                <img src={profile.profile_photo} alt="profile" />
            </div>
            <div className="mid-body">
                <h1>{profile.about_me}</h1>
            </div>
            <div className="bottom-body">
                <h2>Interests:</h2>
                <div className="interests-container">
                    <ul>
                        {profile.interests?.map((interest, index) => (
                            <li key={index}>{interest}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};
export default UserPage;
