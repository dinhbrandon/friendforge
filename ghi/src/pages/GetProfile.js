import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useUserContext } from "../hooks/UserProvider";
import './style/userpage.css';
import InterestDropdown from "../components/getprofile/interestDropdown";
import EditProfile from "../components/getprofile/editProfile";

const GetProfile = () => {
    const { token } = useAuthContext();
    const { profile: signedInProfile } = useUserContext();
    const { username } = useParams();
    const [profile, setProfile] = useState('')

    async function loadProfile() {
    const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/profile/user/${username}`,
        {
            credentials: "include",
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    if (response.ok) {
        const data = await response.json();
        setProfile(data);
    }
    }
    useEffect(() => {
        loadProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isOwnProfile = signedInProfile.username === username;

    return (
        <div className="flex justify-center items-center text-gray-100 body-font py-12 px-4 sm:px-6 lg:px-8">
            <div className="card w-96 glass hover:scale-100">
                <div className="text-center">
                    <img className="mx-auto h-24 w-24 rounded-full" src={profile.profile_photo} alt="User Profile" />
                    <h2 className="mt-6 text-2xl font-semibold text-white-900">{profile.first_name} {profile.last_name}</h2>
                </div>
                <div className="mt-5 text-sm text-white-700 flex">
                    <h3 className="text-lg font-medium">About Me</h3>
                    {isOwnProfile && (
                        <div>
                        <button onClick={() => window.my_modal_2.showModal()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <dialog id="my_modal_2" className="modal-box bg-base">
                            <button className="btn btn-sm btn-circle btn-white absolute right-2 top-2" onClick={() => window.my_modal_2.close()}>
                                ✕
                            </button>
                            <EditProfile profile={signedInProfile} refreshProfile={loadProfile} />
                        </dialog>
                        </div>
                    )}
                </div>
                <p className="mt-2 text-sm">{profile.about_me}</p>
                <div className="mt-5 text-sm text-white-700">
                    <h3 className="text-lg font-medium">Location</h3>
                    <p className="mt-2">{profile.location}</p>
                </div>
                <div className="mt-5 text-sm text-white-700 flex items-center">
                    <h3 className="text-lg font-medium">Interests</h3>
                    {isOwnProfile && (
                    <div>
                        <button onClick={() => window.my_modal_3.showModal()}> 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                        <dialog id="my_modal_3" className="modal-box bg-base">

                                <button className="btn btn-sm btn-circle btn-white absolute right-2 top-2" onClick={() => window.my_modal_3.close()}>
                                    ✕
                                </button>
                                <InterestDropdown />
                        </dialog>
                    </div>       
                    )}
                
                </div>

                    <ul className="grid grid-cols-4">
                        {profile.interests?.map((interest, index) => (
                        <li key={index} className="py-1 px-2 text-sm text-white-800">{interest.name}</li>
                        ))}
                    </ul>

            </div>
        </div>
    )
};

export default GetProfile;
