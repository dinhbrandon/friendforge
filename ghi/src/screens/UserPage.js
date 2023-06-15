import React from 'react'
import useToken from "@galvanize-inc/jwtdown-for-react";
import useProfile from '../components/useProfile';
import useUser from '../components/useUser';
import './style/userpage.css';

const UserPage = () => {
    const { token } = useToken();
    const { profile } = useProfile(token);
    const { user } = useUser(token);

    return (
        <>
            <div>
                <section class="text-gray-600 body-font">
                    <div class="container mx-auto flex py-24 md:flex-row flex-col items-center">
                        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                            <div className="top-header">
                                <h1>{user.first_name} {user.last_name}</h1>
                            </div>
                            <img src={profile.profile_photo} alt="user"/>
                        </div>
                        <div>
                            <div class="bottom-body flex flex-col md:flex-col items-center md:text-left text-center">
                                <div class="md:w-1/2 flex flex-col items-center">
                                    <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white-900">About Me</h1>
                                    <p class="mb-8 leading-relaxed">{profile.about_me}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="bottom-body flex flex-col md:flex-col items-center md:text-left text-center">
                            <div class="md:w-1/8 flex flex-col items-center">
                                <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white-900">Interests</h1>
                                <p class="mb-8 leading-relaxed">
                                <ul class="grid grid-cols-2 gap-x-20">
                                    {profile.interests?.map((interest, index) => (
                                    <li key={index}>{interest}</li>
                                    ))}
                                </ul>
                                </p>
                            </div>
                            <div class="md:w-1/2 flex flex-col items-center">
                                <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white-900">Location</h1>
                                <p class="mb-8 leading-relaxed">{profile.location}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
};

export default UserPage
