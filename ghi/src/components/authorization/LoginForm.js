import React, { useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from "react-router-dom";

// this will log in a user and set the token in local storage
function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useToken();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        e.target.reset();
        navigate("/mygroups");
    };

    return (
        <>
            <form
                className="form-control w-full"
                onSubmit={(e) => handleSubmit(e)}
            >
                <input
                    name="email"
                    type="text"
                    className="input input-bordered w-full my-2"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    className="input input-bordered w-full my-2"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="btn btn-secondary my-2"
                    type="submit"
                    value="login"
                >
                    Log In
                </button>

                <p>
                    Dont have an account?{" "}
                    <a href="/friendforge/signup">Join now!</a>{" "}
                </p>
            </form>
        </>
    );
}

export default LoginForm;
