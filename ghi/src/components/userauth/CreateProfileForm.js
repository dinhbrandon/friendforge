import React, { useState, useEffect } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

function CreateProfileForm() {
    const { token } = useToken();
    const [about_me, setAboutMe] = useState("");
    const [profile_photo, setProfilePhoto] = useState("");
    const [location, setLocation] = useState(null);
    const [locations, setLocations] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLocations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchLocations = async () => {
        const url = `${process.env.REACT_APP_API_HOST}/locations`;
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            setLocations(data);
        }
    };

    // handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let formattedLocation = "";
        if (location) {
            formattedLocation = `${location.name}, ${location.country}`;
            if (location.region) {
                formattedLocation = `${location.name}, ${location.region}, ${location.country}`;
            }
        }
        const profileData = {
            about_me,
            profile_photo,
            location: formattedLocation,
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
            setLocation(null);
            navigate("/");
        }
    };

    return (
        <>
                <div className="hero gradient-bg ">
                <div className="hero-overlay bg-opacity-30"></div>
                <div className="hero-content text-center text-neutral-content w-3/4">
                    <div className="w-full">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="form-control mb-5">
                                <TextField
                                    id="about"
                                    name="about"
                                    required
                                    minLength="50"
                                    maxLength="5000"
                                    multiline
                                    rows={4}
                                    label="Your bio"
                                    placeholder="About me..."
                                    value={about_me}
                                    onChange={(e) => setAboutMe(e.target.value)}
                                    variant="filled"
                                />
                            </div>

                            <div className="form-control mb-5">
                                <TextField
                                    type="text"
                                    label="Profile Photo URL"
                                    placeholder="URL"
                                    value={profile_photo}
                                    onChange={(e) =>
                                        setProfilePhoto(e.target.value)
                                    }
                                    variant="filled"
                                />
                            </div>

                            <div className="form-control">
                                <Autocomplete
    id="location-autocomplete"
    freeSolo
    options={locations}
    getOptionLabel={(option) => {
        let label = `${option.name}, ${option.country}`;
        if (option.region) {
            label = `${option.name}, ${option.region}, ${option.country}`;
        }
        return label;
    }}
    value={location}
    onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
    }}
    onChange={(event, newValue) => {
        setLocation(newValue);
        setOpen(false);  // Close dropdown menu after selection
    }}
    open={inputValue.length > 0 && open}
    onOpen={() => {
        setOpen(true);
    }}
    onClose={() => {
        setOpen(false);
    }}
    disableClearable
    renderInput={(params) => (
        <TextField 
            {...params} 
            className="your-tailwind-classes" 
            InputProps={{
                ...params.InputProps,
                className: "more-tailwind-classes",
            }} 
            label="Nearest Region" 
            variant="filled"
            required  // Here is the required prop
        />
    )}
/>

                            </div>

                            <div>
                                <button className="btn btn-primary my-10">
                                    FINISH
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateProfileForm;
