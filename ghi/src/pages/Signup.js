import React, { useState } from "react";
import signupperson from "./images/signupperson.png";
import SignupForm from "../components/userauth/SignupForm";

function Signup() {
    const [isEighteenOrOlder, setIsEighteenOrOlder] = useState(null);

    return (
        <>
            <div className="hero bg-base-100">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src={signupperson}
                        className="max-w-sm"
                        alt="person cartoon"
                    />
                    <div>
                        <h1 className="text-5xl font-bold">
                            Join Friend Forge!
                        </h1>
                        {isEighteenOrOlder === null && (
                            <div>
                                <h2 className="mt-5 text-1xl font-bold">Are you 18 years or older?</h2>
                                <div className="flex-auto w-32">
                                    <button className="btn btn-sm btn-ghost" onClick={() => setIsEighteenOrOlder(true)}>Yes</button>
                                    <button className="btn btn-sm btn-ghost" onClick={() => setIsEighteenOrOlder(false)}>No</button>
                                </div>
                            </div>
                        )}
                        {isEighteenOrOlder === false && <p className="mt-5 text-1xl font-bold">You must be 18 or older to sign up.</p>}
                    </div>
                </div>
            </div>
            {isEighteenOrOlder === true && <SignupForm />}
        </>
    );
}

export default Signup;
