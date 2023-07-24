import React, { useRef, useState, useEffect } from 'react';
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useNavigate } from 'react-router-dom';
import useOutsideClick from '../hooks/useOutsideClick';

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, token } = useToken();
    const navigate = useNavigate();
    const ref = useRef();

    useOutsideClick(ref, () => {
        setError("");
    });

    useEffect(() => {
        if (token) {
            navigate("/");
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const lowerCaseEmail = email.toLowerCase();
        await login(lowerCaseEmail, password);
        if (!token) {
            setError("Invalid login credentials");
        }
    };

    return (
        <>
            <form
                ref={ref}
                className="form-control w-full"
                onSubmit={handleSubmit}
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
                {error && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-red-600">{error}</span>
                    </div>
                )}
                <button
                    className="btn btn-secondary my-2"
                    type="submit"
                    value="login"
                >
                    Log In
                </button>

                <p>
                    Don't have an account?{" "}
                    <a href="/friendforge/signup">Join now!</a>{" "}
                </p>
            </form>
        </>
    );
}

export default LoginForm;
