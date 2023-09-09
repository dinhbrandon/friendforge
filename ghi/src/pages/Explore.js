import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Explore () {
    const [selectedAccordion, setSelectedAccordion] = useState(null);
    const [locations, setLocations] = useState([])
    // eslint-disable-next-line no-unused-vars
    const [inputValue, setInputValue] = useState('');
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [open, setOpen] = useState(false);
    const [focuses, setFocus] = useState([]);
    const [groups, setGroups] = useState([]);
    const { token } = useToken();

    async function loadFocuses() {
    const response = await fetch(
        `${process.env.REACT_APP_API_HOST}/group_focus`
    );
    if (response.ok) {
        const data = await response.json();
        console.log(data)
        setFocus(data);
    }
  }

    useEffect(() => {
        loadFocuses();
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

    useEffect(() => {
        fetchLocations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = async (event) => {
    event.preventDefault();

    if (!selectedLocation) {
        alert("Please select a location");
        return;
    }
    
    const url = `${process.env.REACT_APP_API_HOST}/groups/${selectedLocation.name}`;
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.ok) {
        const data = await response.json();
        let groupedByFocus = {};
data.forEach(group => {
    // Check if the focuses array contains an object with the same name as group.focus
    const focusExists = focuses.some(focus => focus.name === group.focus);

    if(focusExists){
        if(!groupedByFocus[group.focus]){
            groupedByFocus[group.focus] = [];
        }
        groupedByFocus[group.focus].push(group);
    }
});
    setGroups(groupedByFocus)

    }
    };

    return(
        <div className="flex flex-col items-center">
            <p className="text-xl mb-4">Explore communities in...</p>
            <div className="input w-96 mb-10">
                <form onSubmit={handleSearch}>
                    <Autocomplete
                        id="location-autocomplete"
                        options={locations}
                        // disablePortal
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
                    }}
                        onChange={(event, newValue) => {
                            setSelectedLocation(newValue)
                            setOpen(false);  // Close dropdown menu after selection
                        }}
                        open={open}
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
                                        root: 'bg-white primary w-full',
                                    }
                                }} 
                                variant="standard" 
                            />
                        )}
                    />
                    <button className="bg-primary" type="submit">Search</button>
                </form>
            </div>
            <div className="artboard phone-1 mt-4">
                {focuses.map((focus, index) => (
                    groups[focus.name] && (
                        <div className="collapse collapse-plus">
                            <input type="radio" 
                                name="my-accordion-3"
                                checked={selectedAccordion === index}
                                onChange={() => setSelectedAccordion(index)}
                            /> 
                            <div className="collapse-title text-xl font-medium">
                                {focus.name}
                            </div>
                            
                            <div className="collapse-content">
                                <p>Existing groups:</p>
                                {groups[focus.name]?.map((group) => (
                                    <li>{group.name} [ {group.number_of_members}/5 members]</li>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}


export default Explore;