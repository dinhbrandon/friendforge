import useToken from "@galvanize-inc/jwtdown-for-react";
import React, { useState, useEffect } from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";


const EditProfile = (profile) => {
    const { token } = useToken();
    const [profileAboutMe, setProfileAboutMe] = useState("")
    const [profilePhoto, setProfilePhoto] = useState("")
    const [profileLocation, setProfileLocation] = useState(undefined);
    const [locations, setLocations] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);


    useEffect(() => {
        const fetchProfileAndLocations = async () => {
            if(profile.profile.about_me) setProfileAboutMe(profile.profile.about_me);
            if(profile.profile.profile_photo) setProfilePhoto(profile.profile.profile_photo);

            const locationsData = await fetchLocations()

            if (profile.profile.location){
                const matchingLocation = locationsData.find(loc => `${loc.name}, ${loc.region ? `${loc.region}, ` : ""}${loc.country}` === profile.profile.location)
                if (matchingLocation){
                    setProfileLocation(matchingLocation)
                }
            }
        };

        fetchProfileAndLocations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profile]);


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
        return data;
    }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    if (!profileLocation || !profileLocation.name) {
        alert("Please select a location from the dropdown.")
        return
    }


        const profileData = {
            about_me: profileAboutMe,
            profile_photo: profilePhoto,
            location: `${profileLocation.name}, ${profileLocation.region ? `${profileLocation.region}, ` : null}${profileLocation.country}`,
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
                className='input input-md bg-white primary w-full mb-2'
                type='text'
                placeholder="About me..."
                value={profileAboutMe}
                onChange={(e) => setProfileAboutMe(e.target.value)}
                />

                <input 
                className='input input-md bg-white primary w-full mb-2'
                type='text'
                placeholder="Photo url..."
                value={profilePhoto}
                onChange={(e) => setProfilePhoto(e.target.value)}
                />

                <div className="form-control">

                    {profileLocation !== undefined && (
                        <Autocomplete
                            id="location-autocomplete"
                            options={locations}
                            value={profileLocation}
                            disablePortal
                            getOptionLabel={(option) => {
                                if (!option) {
                                    return '';
                                }
                                let label = `${option.name}, ${option.country}`;
                                if (option.region) {
                                    label = `${option.name}, ${option.region}, ${option.country}`;
                                }
                                return label;
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                            const foundLocation = locations.find(loc => `${loc.name}, ${loc.region ? `${loc.region}, ` : ""}${loc.country}` === newInputValue);
                            if (foundLocation) {
                                setProfileLocation(foundLocation);
                            }
                        }}
                            onChange={(event, newValue) => {
                                setProfileLocation(newValue);
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
                                    className="" 
                                    InputProps={{
                                        ...params.InputProps,
                                        classes: {
                                            root: 'input input-md bg-white primary w-full my-1',
                                        }
                                    }} 
                                    variant="standard" 
                                />
                            )}
                        />
                    )}

                </div>


                <p className="mt-6 text-white text-center">Current Profile Photo</p>
                <img className="mt-2 mb-2 mx-auto block avatar rounded-full" src={profile.profile.profile_photo} alt=''/>

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
