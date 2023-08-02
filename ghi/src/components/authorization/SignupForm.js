import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";

function SignupForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [date_of_birth, setDOB] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const { register } = useToken();
    const validateEmail = (email) => {
        // Email Regex
        let re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return re.test(String(email).toLowerCase());
    }
const validatePhoneNumber = (phone_number) => {
    // Remove all non-numeric characters
    let cleaned = ('' + phone_number).replace(/\D/g, '');
    // If the cleaned number starts with '1' and has 11 digits, remove the leading '1'
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
        cleaned = cleaned.substring(1);
    }
    // Phone Number Regex
    let re = /^\d{10}$/;
    return re.test(cleaned);
}


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError("Invalid email format");
            return;
        }
        if (!validatePhoneNumber(phone_number)) {
            setPhoneError("Invalid phone number format");
            return;
        }

        let cleanedPhoneNumber = ('' + phone_number).replace(/\D/g, '');
        if (cleanedPhoneNumber.length === 11 && cleanedPhoneNumber.startsWith('1')) {
        cleanedPhoneNumber = cleanedPhoneNumber.substring(1);
        }
        const accountData = {
            email: email.toLowerCase(),
            username: username.toLowerCase(),
            password: password,
            date_of_birth: date_of_birth,
            first_name: first_name.charAt(0).toUpperCase() + first_name.slice(1),
            last_name: last_name.charAt(0).toUpperCase() + last_name.slice(1),
            phone_number: cleanedPhoneNumber,
            account_type_id: 1,
        };
        register(accountData, `${process.env.REACT_APP_API_HOST}/users`);
        e.target.reset();
        navigate('/login');
    };

    return (
        <>
            <div className="hero min-h-lg gradient-bg ">
                <div className="hero-overlay bg-opacity-30"></div>
                <div className="hero-content text-neutral-content">
                    <div>
                        <form
                            className="signup-form max-w-lg"
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <div className="flex">
                                <input
                                className="input input-primary w-full  max-w-lg my-1 mr-1"
                                type="text"
                                placeholder="First Name"
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                            />
                            <input
                                className="input input-primary w-full  max-w-lg my-1"
                                type="text"
                                placeholder="Last Name"
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                            />
                            </div>
                        
                            <input
                                className="input input-primary w-full  max-w-lg my-1"
                                type="text"
                                placeholder="User Name"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                            <span className="text-red-600">{emailError}</span>
                            <input
                                className="input input-primary w-full  max-w-lg my-1"
                                type="email"
                                placeholder="Email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <input
                                className="input input-primary w-full  max-w-lg my-1"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <span className="text-red-600">{phoneError}</span>
                            <input
                                className="input input-primary w-full  max-w-lg my-1 mb-5"
                                type="tel"
                                placeholder="Phone Number"
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                }}
                            />
                            <label htmlFor="dob" className="ml-2 text-sm text-bold w-full">Date of Birth</label>
                            <input
                                id="dob"
                                className="input input-primary w-full  max-w-lg"
                                type="date"
                                onChange={(e) => {
                                    setDOB(e.target.value);
                                }}
                            />

                            <button
                                className="mt-2 btn btn-accent"
                                type="submit"
                                value="register"
                            >
                                Join now!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignupForm;
