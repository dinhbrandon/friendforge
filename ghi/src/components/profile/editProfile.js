import useToken from "@galvanize-inc/jwtdown-for-react";
import React, { useState, useEffect } from 'react';

const EditProfile = (profile) => {
    console.log("EditProfile component", profile.profile)
    const { token } = useToken();
    const [profileAboutMe, setProfileAboutMe] = useState("")
    const [profilePhoto, setProfilePhoto] = useState("")
    const [profileLocation, setProfileLocation] = useState("")

    useEffect(() => {
        if(profile.profile.about_me) setProfileAboutMe(profile.profile.about_me)
        if(profile.profile.profile_photo) setProfilePhoto(profile.profile.profile_photo)
        if(profile.profile.location) setProfileLocation(profile.profile.location)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const profileData = {
            about_me: profileAboutMe,
            profile_photo: profilePhoto,
            location: profileLocation,
        };

        const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/profile/${profile.profile.id}`,
        {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(profileData)
        }
    );
    if (response.ok){
        profile.refreshProfile()
    }
    window.my_modal_2.close();
    }

    return(
       <div>
            <form onSubmit={handleSubmit}>
                <p className='font-bold text-white mb-2'>Edit profile</p>
                <textarea 
                className='input input-md bg-white primary w-full my-1'
                type='text'
                placeholder="About me..."
                value={profileAboutMe}
                onChange={(e) => setProfileAboutMe(e.target.value)}
                />

                <input 
                className='input input-md bg-white primary w-full my-1'
                type='text'
                placeholder="Photo url..."
                value={profilePhoto}
                onChange={(e) => setProfilePhoto(e.target.value)}
                />

                <input 
                className='input input-md bg-white primary w-full my-1'
                type='text'
                placeholder="Location..."
                value={profileLocation}
                onChange={(e) => setProfileLocation(e.target.value)}
                />

                <p className="mt-2 text-white text-center">Current Profile Photo</p>
                <img className="mt-2 mb-2 mx-auto block avatar rounded-full" src={profile.profile.profile_photo}/>

                <button
                className="bg-primary text-white font-bold py-2 px-4 rounded"
                type="submit"
                >
                Save
                </button>
            </form>
       </div>
    )
};

export default EditProfile;
