import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

function SignupForm() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [date_of_birth, setDOB] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const { register } = useToken();
    const { login } = useToken();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const accountData = {
            email: email,
            username: username,
            password: password,
            date_of_birth: date_of_birth,
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            account_type_id: 1,
        };
        register(accountData, `${process.env.REACT_APP_API_HOST}/users`);
        login(email, password);
        e.target.reset();
        navigate("/friendforge/signup/profile");
    };

    return (
        <>
            <div className="hero min-h-lg gradient-bg ">
                <div className="hero-overlay bg-opacity-30"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="">
                        <form
                            className="signup-form max-w-lg"
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <input
                                className="input input-bordered input-primary w-full  max-w-lg my-5"
                                type="text"
                                placeholder="First Name"
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                }}
                            />
                            <input
                                className="input input-bordered input-primary w-full  max-w-lg my-5"
                                type="text"
                                placeholder="Last Name"
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                            />
                            <input
                                className="input input-bordered input-primary w-full  max-w-lg my-5"
                                type="text"
                                placeholder="User Name"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                            <input
                                className="input input-bordered input-primary w-full  max-w-lg my-5"
                                type="tel"
                                placeholder="Phone Number"
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                }}
                            />
                            <input
                                className="input input-bordered input-primary w-full  max-w-lg my-5"
                                type="email"
                                placeholder="Email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <input
                                className="input input-bordered input-primary w-full  max-w-lg my-5"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <input
                                className="input input-bordered input-primary w-full  max-w-lg my-5"
                                type="date"
                                placeholder="Birthdate"
                                onChange={(e) => {
                                    setDOB(e.target.value);
                                }}
                            />

                            <button
                                className="btn btn-primary"
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
