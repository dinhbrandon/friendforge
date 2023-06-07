import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
// import useUser from "../useUser";

function CreateProfileForm() {
    const { token } = useToken();
    const [about_me, setAboutMe] = useState("");
    const [profile_photo, setProfilePhoto] = useState("");
    const [location, setLocation] = useState("");
    const navigate = useNavigate();

    // handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const profileData = {
            about_me,
            profile_photo,
            location,
        };

        const url = `${process.env.REACT_APP_API_HOST}/profile`;
        const newProfile = {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(profileData),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(url, newProfile);
        if (response.ok) {
            setAboutMe("");
            setProfilePhoto("");
            setLocation("");
            navigate("/signup/profile/interests");
        }
    };

    return (
        <>
            <div className="hero gradient-bg ">
                <div className="hero-overlay bg-opacity-30"></div>
                <div className="hero-content text-center text-neutral-content w-3/4">
                    <div className="w-full">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text mt-10">
                                        Your bio
                                    </span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered textarea-primary textarea-lg"
                                    id="about"
                                    name="about"
                                    required
                                    minLength="50"
                                    maxLength="5000"
                                    placeholder="About me..."
                                    value={about_me}
                                    onChange={(e) => setAboutMe(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text mt-10">
                                        Profile Photo URL
                                    </span>
                                </label>
                                <input
                                    className="input input-bordered input-primary w-full"
                                    type="text"
                                    placeholder="URL"
                                    value={profile_photo}
                                    onChange={(e) =>
                                        setProfilePhoto(e.target.value)
                                    }
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text mt-10">
                                        City
                                    </span>
                                </label>
                                <input
                                    className="input input-bordered input-primary w-full"
                                    type="text"
                                    placeholder="city"
                                    value={location}
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                />
                            </div>

                            <div>
                                <button className="btn btn-primary my-10">
                                    Pick my Interests
                                </button>
                                {/* This might need to lead to interests in the future */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateProfileForm;
